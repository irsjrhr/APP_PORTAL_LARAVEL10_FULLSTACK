<?php 
class File extends CI_Controller {

	private $max_kapasitas_kb;
	public function __construct() {
		parent::__construct();

		//Melakukan load model terkait controller
		$this->load->model('File_model');

		$this->max_kapasitas_kb = [
			"lokal" => 100000, // 100 rb kb atau 100 mb
			"cloud" => 100000,  // 100 rb kb atau 100 mb
			"url" => 0
		];

		//Melakukan route untuk API
		header('Content-Type: application/json');
	}
	public function index(){
		//Ini hanya sebagai prasyarat controller
	}


	public function get_data() {

		$where_clause = [];

		//Filter berdasarkan data user login. Ini filter Wajib! 
		if ( $this->Base_service->user_login != "TIDAK_ADA_USER_LOGIN" ) {
			$user_login = $this->Base_service->user_login;
			$where_clause['user_admin'] = $user_login;
		}
		//Filter berdasarkan parameter 
		if ( isset($_GET['by_tipe_penyimpanan']) ) {
			//Filter berdasarkan tipe penyimpanan
			$by_tipe_penyimpanan = $this->input->get('by_tipe_penyimpanan', TRUE);
			$where_clause['tipe_penyimpanan'] = $by_tipe_penyimpanan;
		}
		$data = $this->File_model->get_many($where_clause);
		//Penyetaraan result ketika tidak ada nilaia untuk di eksekusi di FE
		if ( empty($data) ) {
			$data = null;
		}

		$this->Base_model->send_response($data, 200);
	}	



	//  Method Terkait Pengembilan Pemakaian Data Cloud Storage User Berdasarkan Tipe Penyimpanannya 
	public function get_terpakai( $tipe_penyimpanan ){
		$this->db->select('SUM(size_file_kb) as total');
		$this->db->from('data_file');
		$this->db->where([
			'tipe_penyimpanan' => $tipe_penyimpanan,
			'user_admin'       => $this->Base_service->user_login
		]);
		$row_data  = $this->db->get()->row_array();
		$response = !empty($row_data['total']) ? (int) $row_data['total'] : 0;

		return $response;
	}

	//  Method Terkait Validasi Pemakaian Data Cloud Storage User Berdasarkan Tipe Penyimpanannya dan Ini akan digunakan saat ingin menambahkan data 
	private function validasi_kapasitas( $tipe_penyimpanan ){
		$FILE_INPUT = $_FILES['upload_file'];//SUDAH STANDARISASI SESUAI DENGAN FE 
		$max_kapasitas_kb = $this->max_kapasitas_kb;
		$max_kapasitas_nilai = $max_kapasitas_kb[$tipe_penyimpanan];
		$size = $FILE_INPUT['size']; //Byte
		$size_kb = $this->Base_model->byteToKb( $size );

		//Ambil yang terpakai
		$terpakai =  $this->get_terpakai( $tipe_penyimpanan );
		$sisa = $max_kapasitas_nilai - $terpakai;

		if ( $size_kb <= $sisa ) {
			$response['status'] = true;
		}else{
			$response['status'] = false;
			$response['msg'] = "Penyimpanan kamu tidak cukup untuk menyimpan file ini!!";
		}

		return $response;
	}

	// endpoint : url_service/file/post_tambah_file
	// Menambah data baru
	public function post_tambah_file() {
		$tipe_penyimpanan = $this->input->post('tipe_penyimpanan');
		//Url dan Lokal Memiliki skema yang hampir sama dan ada di Model. Tapi kalo cloud itu kita pake method di interface agar mudah konfig ke library S3 nya 

		if ( $tipe_penyimpanan == "lokal" || $tipe_penyimpanan == "cloud" ) {
			//Karena ini menyanglut file input, maka lakukan validasi dulu
			$validasi_kapasitas = $this->validasi_kapasitas( $tipe_penyimpanan );
			// $this->Base_model->send_response($validasi_kapasitas, 200);

			// return;
			if ( $validasi_kapasitas['status'] == true ) {
				if ( $tipe_penyimpanan == "lokal" ) {
					$result = $this->File_model->tambah_file_lokal();
				}else if ( $tipe_penyimpanan == "cloud" ) {
					$result = $this->tambah_file_cloud();
				}
			}else{
				$result = $validasi_kapasitas;
			}
		}else{
			$result = $this->File_model->tambah_file_url();
		}


		$this->Base_model->send_response($result, 200);
	}
	private function tambah_file_cloud(){
		$this->load->library('S3_client');

		$upload_file_cloud = $this->upload_file_cloud();
		if ( $upload_file_cloud['status'] == true  ) {
			//Jika berhasil mengupload file ke server cloud, maka tambahkan ke db
			$source = $upload_file_cloud['url'];//URL PUBLIK SERVER 
			$response = $this->File_model->tambah_file( $source );
		}else{
			$response = $upload_file_cloud;
		}

		return $response;
	}
	//Melakukan upload ke cloud dengan protokol s3 Amazon ke server biznet
	public function upload_file_cloud(){
		//Melakukan load library protokol s3

		$key_name_files = "upload_file";
		if (!isset($_FILES[$key_name_files])) {
			echo "Tidak ada file yang diupload!";
			return;
		}

		$filePath = $_FILES[$key_name_files]['tmp_name'];
		$fileName = $_FILES[$key_name_files]['name'];

		$this->load->library('S3_client');
		$upload_cloud_s3 = $this->s3_client->upload($filePath, 'uploads/' . $fileName);
		if ($upload_cloud_s3['status']) {
			$response['status'] = true;
			$response['msg'] = "Berhasil mengupload file ke cloud!!";
			$response['url'] = $upload_cloud_s3['url'];
		} else {
			$response['status'] = false;
			$response['msg'] = "Gagal upload ke cloud: " . $upload_cloud_s3['msg'];
		}

		return $response;
	}
	public function get_data_kapasitas()
	{


		$max_kapasitas_kb = $this->max_kapasitas_kb;

		$terpakai_lokal = $this->get_terpakai( 'lokal' );
		$terpakai_cloud = $this->get_terpakai( 'cloud' );
    	// Susun data output
		$data = [
			"lokal" => [
				"max"      => $max_kapasitas_kb['lokal'],
				"terpakai" => $terpakai_lokal,
			],
			"cloud" => [
				"max"      => $max_kapasitas_kb['cloud'],
				"terpakai" => $terpakai_cloud,
			],
			"url" => [
				"max"  => "UNLIMITED",
				"sisa" => "UNLIMITED",
			],
		];

    	// Kirim response
		$this->Base_model->send_response($data, 200);
	}

	public function testing(){

		$data = [
			"POST" => $_POST,
			"FILES" => $_FILES,
		];
		$this->Base_model->send_response($data, 200);
	}

}
