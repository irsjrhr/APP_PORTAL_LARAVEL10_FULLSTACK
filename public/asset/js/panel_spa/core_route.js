//++++++++++++++++++++++++ BASE ROUTING SCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//INGAT!! INI HARUS TERHUBUNG ATAU DIBARENGI DENGAN core.js dan api.js
// Kemudian route yang ada disini merupkan callback triger dari pada load page yang di panggil di menu sidebar 

var EVENT_NAMESPACE = '.eventSPA';
$(document).ready(function(e) {
	$('.sidebar .link_modul .row_modul_header').on('click', function() {
		load_link_modul( $(this) );
	});
	//Event sidebar menu untuk load page spa 
	$('.sidebar .link_menu').on('click', function() {

		trace();

		//Membuka load page dan efek menu sidebar
		var link_menu = $('.sidebar .link_menu');
		var link_menu_target = $(this);
		var data_page = link_menu_target.attr('data-page');
		load_page( data_page ); //Inni ada di route_app.js

	});
}); 

function CLEANUP_EVENT_NAMESPACE( route ) {
	console.warn(`EVENT NAME SPACE ${EVENT_NAMESPACE} URL ROUTE!
		${ route } DIHAPUS!!!
		`);
	$(document).off(EVENT_NAMESPACE);
	$('body ').off(EVENT_NAMESPACE);
}

// const BASE_URL_PAGE = "http://127.0.0.1:8000/"; ---> INI ADA DI api.js
function ROUTE_INIT( route, load_spa = false ) {
	this.route = route;
	this.callback_route = false; //Fungsi callback
}
const ROUTE = {
	QUE_ROUTE : [],   
	add : function( route = "{path}/{path2}/{path3}", callback = false, load_spa = false ) {

		//Handling Default Type Callback
		if (typeof callback !== 'function') {
			callback = function () {
				return "Callback is not sign for function callback!!!";
			};
		}

		//++++++++ Build Object Route With Callback Triger +++++++
		var page = new ROUTE_INIT( route, load_spa );
		// Buat perilaku page ketika di triger dari method callback yang di daftarkan berdasarkan routenya
		page.callback_route = function() {
			callback( route );
		};

		//++++++++ Sign Object Route Yang Sudah Di Buil +++++++
		this.QUE_ROUTE.push( page );
	},

	//MEMANGGIL ROUTE BERDASARKAN TRIGER ROUTE AARGUMENNYA 
	load : function( url_route_target = BASE_URL_PAGE + "path/path2/" ) {
		var ROUTE_INIT_EXIST = false;
		var QUE_ROUTE = this.QUE_ROUTE;
		for (var i = 0; i < QUE_ROUTE.length; i++) {
			var row_obj = QUE_ROUTE[i];
			//Kalo routenya sudah terdaftar sebagai object Page
			if ( row_obj.route == url_route_target ) {	
				ROUTE_INIT_EXIST = row_obj;
				break;
			}
		}

		if ( ROUTE_INIT_EXIST != false ) {
			//Jika Route Yang Di Triger Ada, Maka Jalankan Perilaku dari callbacknya
			console.warn('ROUTE TARGET DITEMUKAN DENGAN MENJALANKAN CALLBACK URL ROUTE ' + url_route_target);

			//Handling Type Callback
			if (typeof ROUTE_INIT_EXIST.callback_route === 'function') {
				///Panggil Routenya
				ROUTE_INIT_EXIST.callback_route();
			}else{
				console.error('ROUTE URL ROUTE ' + url_route_target +  "TIDAK MEMILIKI CALLBACK FUNCTION");
			}


		}else{
			var msg_error = 'TIDAK DITEMUKAN ATAU BELUM DIDAFTARKAN ROUTENYA DI route_app.js DENGAN URL ROUTE ' + url_route_target;
			Swal.fire(msg_error);
			console.error( msg_error );
		}
	}
};
//++++++++++++++++++++++++ END OF BASE ROUTING SCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//+++++++++++  BASE SPA ASYNCHRONOUS SCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Helper Function For Route to Load SPA
function load_page( url_route = "path/path2/" ) {

	ROUTE.load( url_route );

	// Membuka parent .link_modul jika link menu yang aktif terbuka berdasarkan yang di load punya parent link_modul
	var link_menu_activePage = $('.sidebar .link_menu').filter(`[data-page="${url_route}"]`); 
	var link_modul_activePage= link_menu_activePage.parents('.link_modul');
	if ( link_modul_activePage.length > 0 ) {
		open_link_modul( link_modul_activePage );
	}
}
//FUNGSI CORE UNTUK LOAD PAGE SPA
function LOAD_PAGE_SPA( target_page = BASE_URL_PAGE, callback = false ) {
	//SET DEBUG URL ACTIVE
	LOAD_PAGE_URL = target_page; 
	console.groupCollapsed(
		`%c+[++++ LOAD_PAGE_SPA with route ${ LOAD_PAGE_URL  } +++++]`,
		'color:white; background:#007bff; padding:2px 6px; border-radius:4px;'
		);
	trace();

	//Handling Error Callback Type
	if ( typeof callback !== 'function' ) {
		callback = function() {
			return false;
		}
	}


	//Melakukan load page secara asynchrnous yang saling terhubung dengan menu sidebarnya dengan element root utama parentnya adalah .main_container
	// Jadi page akan di load() ke dalam element parent .main_container
	//Link menu target yang dijadikan active di pilih dari link menu yang memiliki data-page seperti target_page
	// Target_page berisi nilai dari url atau alamat halaman yang akan dimuat. 
	//  pada element link_menu data-page tersebut nilainya akan diisi langsung dari view atau seperti alamatnya 

	//+++++ Lakukan load section_content untuk halaman yang dituju sesuai dengan metad data link
	//Mengilangkan konten didalam main_container yaitu juga menghilangkan section_content yang lama
	var main_container = $('.main_container');
	main_container.html();
	//Melakukan load pada halaman baru yaitu juga menambahkan section_content yang baru pada halaman tersebut
	var animasi_loadPageEl = $('.col.content').find('.animasi_loadPage'); 
	animasi_loadPage("show", animasi_loadPageEl );
	console.log( "Target page", target_page );
	main_container.load( target_page, function(responseText, statusText, xhr) {

		if ( statusText === "error") {
			console.log( xhr );
			//Jika page tidak dapat di load atau error 	
			var msg = `${ xhr.status } <br> ${xhr.statusText}`
			animasi_loadPage('show', animasi_loadPageEl, msg);
			return false; //Menghentikan laju fungsi
		}


		//Membersihkan event SPA Khusus Fitur yang memiliki namespace .eventSPA
		CLEANUP_EVENT_NAMESPACE();

		//Ini letaknya ada di file.js untuk menambahkan elemen untuk melakukan select file
		//Mengecek dan menambahkan tombol untuk memanggil modal select file apabila ada elemen form yang memiliki class .form_file_upload 
		el_form_file_upload();  
		animasi_loadPage("hide", animasi_loadPageEl);

		//Menambahan element animasi load page pada table
		create_animasiLoadPageEl();


		//++++++++++ Memberikan tanda efek ke .link_menu yang punya nilai data-page seperti target_page
		var link_menu = $('.sidebar .link_menu');
		var link_menu_target = link_menu.filter(`.link_menu[data-page="${target_page}"]`);
		//+++++ Tandai elemen link menu yang aktif 
		link_menu.removeClass('active');
		link_menu_target.addClass('active');

		//Memanggil callback
		callback( responseText, statusText, xhr );



	});



	console.groupEnd('++++ END OF LOAD_PAGE_SPA with route ${ LOAD_PAGE_URL  } +++++');

}



function load_link_modul( row_modul_header_target ) {
	var link_modul_target = row_modul_header_target.parents( '.link_modul.row_modul' );
	var row_container_menu = link_modul_target.find('.row_container_menu');
	var link_menu_activeTarget = row_container_menu.find('.link_menu.active');
	var link_modul_icon = link_menu_activeTarget.find('i');
	
	if ( link_modul_target.is('.active') == false ) {
		//Jika link modul tidak aktif dan tidak terlihat, maka aktifkan dan tampilkan

		//Menghilangkan terlebih dahulu seluruh modul yang bukan target dan yang tidak punya child mennu yang sedang aktif
		var link_modul_hasMenuActive =  $('.link_menu.active').parents('.link_modul');
		var link_modul_NotMenuActive = $('.link_modul').not( link_modul_hasMenuActive );
		close_link_modul( link_modul_NotMenuActive );

		//Munculkan link modul target dan Ubah Icon Indicator Menjadi Chevron Ke Bawah
		open_link_modul( link_modul_target );

	}else{
		//Jika link modul aktif, maka hilangkan link modul tersebut jika dia tidak punya menu active 
		if ( link_menu_activeTarget.length < 1 ) {

			close_link_modul( link_modul_target );

		}else{
			console.log('TIDAK BISA MENUTUP, KARENA ADA MENU YANG SEDANG AKTIF');
		}
	}
}
function open_link_modul(link_modul_target){
	link_modul_target.addClass('active');
	var icon_indicator = link_modul_target.find('span.icon_indicator');
	var i_element = icon_indicator.find('i');
	i_element.removeClass('fa-chevron-right');
	i_element.addClass('fa-chevron-down');
}
function close_link_modul(link_modul_target){
	link_modul_target.removeClass('active');
	var icon_indicator = link_modul_target.find('span.icon_indicator');
	var i_element = icon_indicator.find('i');
	i_element.removeClass('fa-chevron-down');
	i_element.addClass('fa-chevron-right');
}





//+++++++++++ END OF BASE SPA ASYNCHRONOUS SCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++






//+++++++++++++++++++++ IMPLEMENTASI - PENDAFTARAN TRIGER CALLBACK ROUTE SCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


/*
// === CONTOH MENDAFTARKAN ROUTE SPA CALLBACK BASIC 
ROUTE.add( '{URL_PATH_TERDAFTAR_DI_CONTROLLER}/path', function( route ) {
	alert('EVENT TRIGER CALLBACK');
});

// === CONTOH MENDAFTARKAN ROUTE SPA CALLBACK DENGAN LOAD SPA 
ROUTE.add( '{URL_PATH_TERDAFTAR_DI_CONTROLLER}/path', function( route ) {
	LOAD_PAGE_SPA( route );
});

// === CONTOH MENDAFTARKAN ROUTE SPA CALLBACK DENGAN LOAD SPA BER CALLBACK 
ROUTE.add( '{URL_PATH_TERDAFTAR_DI_CONTROLLER}/path', function( route ) {
	LOAD_PAGE_SPA( route, function( responseText, statusText, xhr  ){
		alert('EVENT CALLBACK SETELAH LOAD SPA');
	});
});
*/


//----- ADMIN CONTROLLER ROUTE CALLBACK ----
//https://url_app_fe/dashboard
ROUTE.add( BASE_URL_PAGE + 'dashboard', function( route ) {
	LOAD_PAGE_SPA( route );
});


//==================== MODUL ACCOUNT ===================
//https://url_app_fe/account/account
ROUTE.add( BASE_URL_PAGE + 'account/account', function( route ) {
	LOAD_PAGE_SPA( route, function() {

		// Method event untMenambahkan data secara asynchronous
		$('body').on('submit'+EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form

			var form = $(this);
			var form_data = form.serialize();
			var url_endpoint = URL_SERVICE_BE + "account";
			post_tambah_data( url_endpoint, form_data, function( response ) {
				console.log(response);
				var msg = response.msg;
				Swal.fire( msg );
				//Refresh data di table load 
				load_table_active();
			} );
		});
		//Membuat list select level pada halaman di modal form berdasarkan data API pada modal tambah account
		get_data( URL_SERVICE_BE + "level", {}, function( response ) {
			var select_level = $('select[name=level]');
			for (var i = 0; i < response.length; i++) {
				var row_level = response[i];
				var nama_level = row_level.nama_level;
				var option_el = `<option value='${nama_level}'>${nama_level}</option>`;
				select_level.append( option_el );
			}
		});

	});

});
//https://url_app_fe/account/level
ROUTE.add( BASE_URL_PAGE + 'account/level', function( route ) {
	LOAD_PAGE_SPA( route, function() {
		// Method event untMenambahkan data secara asynchronous
		$('body').on('submit'+EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form

			var form = $(this);
			var form_data = form.serialize();
			var url_endpoint = URL_SERVICE_BE + "level";
			post_tambah_data( url_endpoint, form_data, function( response ) {
				console.log(response);
				var msg = response.msg;
				Swal.fire( msg );
				//Refresh data di table load 
				load_table_active();
			} );
		});
	});
});




//==================== MODUL FSM ===================
//https://url_app_fe/fsm/teknisi
ROUTE.add( BASE_URL_PAGE + 'fsm/teknisi', function( route ) {
	LOAD_PAGE_SPA( route );

});
//https://url_app_fe/fsm/produk
ROUTE.add( BASE_URL_PAGE + 'fsm/produk', function( route ) {
	LOAD_PAGE_SPA( route );

});
//https://url_app_fe/fsm/project
ROUTE.add( BASE_URL_PAGE + 'fsm/project', function( route ) {
	LOAD_PAGE_SPA( route );

});
//https://url_app_fe/fsm/laporan
ROUTE.add( BASE_URL_PAGE + 'fsm/laporan', function( route ) {
	LOAD_PAGE_SPA( route );
});
//https://url_app_fe/fsm/monitoring
ROUTE.add( BASE_URL_PAGE + 'fsm/monitoring', function( route ) {
	LOAD_PAGE_SPA( route, function() {

	});
});



//==================== MODUL ADMIN ===================
//https://url_app_fe/transaksi/transaksi_kategori
ROUTE.add( BASE_URL_PAGE + 'transaksi/transaksi_kategori', function( route ) {
	LOAD_PAGE_SPA( route, function() {

	});
});
//https://url_app_fe/transaksi/transaksi_pemasukan
ROUTE.add( BASE_URL_PAGE + 'transaksi/transaksi_pemasukan', function( route ) {
	LOAD_PAGE_SPA( route, function() {

	});
});
//https://url_app_fe/transaksi/transaksi_pengeluaran
ROUTE.add( BASE_URL_PAGE + 'transaksi/transaksi_pengeluaran', function( route ) {
	LOAD_PAGE_SPA( route, function() {

	});
});
//https://url_app_fe/transaksi/transaksi_pembayaran
ROUTE.add( BASE_URL_PAGE + 'transaksi/transaksi_pembayaran', function( route ) {
	LOAD_PAGE_SPA( route, function() {

	});
});




//==================== MODUL TEKNISI ===================
//https://url_app_fe/teknisi/dashboard
ROUTE.add( BASE_URL_PAGE + 'teknisi/dashboard', function( route ) {
	LOAD_PAGE_SPA( route );
});
//https://url_app_fe/teknisi/project
ROUTE.add( BASE_URL_PAGE + 'teknisi/project', function( route ) {
	LOAD_PAGE_SPA( route );
});
//https://url_app_fe/teknisi/monitoring
ROUTE.add( BASE_URL_PAGE + 'teknisi/monitoring', function( route ) {
	LOAD_PAGE_SPA( route, function() {	

		$('body').on('submit'+EVENT_NAMESPACE, '#form_monitoring', function(e) {
			e.preventDefault();
			var input_id_project = $('input[name=monitoring_id_project]');
			var id_project = input_id_project.val();
			get_data_project(id_project, function(row_project) {
				//Taro ke aatribut data-row-project section_content untuk jadi sumber bahan lacak
				$('.section_content').attr('data-row-project', cv_obj_json( row_project ));

				//Rendering ke UI  dari row project yang diterima untuk data_project
				$("#nama_project").text(row_project.nama_project);
				$("#status_project").text(row_project.status_project);
				$("#waktu_mulai_project").text(row_project.waktu_mulai_project || "-");
				$("#waktu_selesai_project").text(row_project.waktu_selesai_project || "-");
				$("#user_teknisi").text(row_project.user_teknisi);
				$("#source_dokumen_project").attr("href", row_project.source_dokumen_project);
				$("#deskripsi_project").text(row_project.deskripsi_project);
				$("#project_lat").text(row_project.project_lat);
				$("#project_long").text(row_project.project_long);

			});
		});

	});
});


//==================== MODUL USER ===================
//https://url_app_fe/user/dashboard
ROUTE.add( BASE_URL_PAGE + 'user/dashboard', function( route ) {
	LOAD_PAGE_SPA( route );
});
//https://url_app_fe/user/profile
ROUTE.add( BASE_URL_PAGE + 'user/profile', function( route ){
	LOAD_PAGE_SPA( route, function() {
		//Menampilkan profile pada card profile 
		get_row(URL_SERVICE_BE + "account", { by_user : get_userLogin() }, function(response ) {
			// ===============================
			// PROFILE HEADER
			// ===============================
			if (response.source_file_profile) {
				$('#source_file_profile').attr('src', response.source_file_profile);
			}

			$('#nama').text(response.nama);
			$('#user').text(response.user);
			$('#level').text(response.level);

			// ===============================
			// PERSONAL INFORMATION
			// ===============================
			$('#email').text(response.email);

			if (response.alamat && response.alamat !== 'NULL') {
				$('#alamat').text(response.alamat);
			} else {
				$('#alamat').text('-');
			}

			// ===============================
			// FORM UPDATE PROFILE (MODAL)
			// ===============================
			$('input[name=nama]').val(response.nama);
			$('input[name=email]').val(response.email);
			$('textarea[name=alamat]').val(
				(response.alamat && response.alamat !== 'NULL') ? response.alamat : ''
				);
		});
	});
});
//https://url_app_fe/user/project
ROUTE.add( BASE_URL_PAGE + 'user/project', function(route) {
	LOAD_PAGE_SPA( route );
});
//https://url_app_fe/user/tambah_project
ROUTE.add( BASE_URL_PAGE + 'user/tambah_project', function( route ) {
	LOAD_PAGE_SPA( route, function() {
		//Menampilkan list produk pada option di form tambah project pada form 
		var form_tambah_project = $('#form_tambah_project'); 
		var select_option_produk = form_tambah_project.find('select[name=id_produk]');
		//Bersihan elemen option lama 
		select_option_produk.html(" ");
		if ( form_tambah_project.length > 0 ) {
			get_data( URL_SERVICE_BE + "produk", {}, function(response) {
				var form_tambah_project = $('#form_tambah_project'); 
				for (var i = 0; i < response.length; i++) {
					var row_produk = response[i];
					var el_option = `<option value='${ row_produk.id_produk }'> ${ row_produk.nama_produk } </option>`;
					select_option_produk.append(  el_option );
				}
			});
		}

		// Event monitoring maps 
		maps_update();

		//Button ambil lokasi user saat tambah project 
		$('body').on('click'+EVENT_NAMESPACE, '.btn_ambil_lokasi', function() {

			trace();


			var loader_tambah_project = $('.loader_tambah_project');
			var lat_input = $('input.lat_input');
			var long_input = $('input.long_input');
			var user_teknisi_input = $('input[name=user_teknisi]');

			loader_page( 'show',  $('.loader_update_lokasi'), "Mengambil lokasi anda");
			get_lokasi_user( function( lat, long ) {
				lat_input.val( lat );
				long_input.val( long );
				//Update juga di visualiasi mapsnya
				maps_update( '#maps_tambah_project', lat, long );

				console.log( "+====LOKASI TERUPDATE", lat + "," + long );
				loader_page( 'hide',  $('.loader_update_lokasi'), "");

			});
		});

		// Submit Form Tambah Project dan Pilih Teknisi Berdasarkan Rekomendasi Teknisi Haversine
		$('body').on('submit', '#form_tambah_project', function(e) {

			trace();


			e.preventDefault();

			var loader_tambah_project = $('.loader_tambah_project');
			var lat_input = $('input.lat_input');
			var long_input = $('input.long_input');
			var user_teknisi_input = $('input[name=user_teknisi]');
			//pengecekan agar input lat, long, dan id teknisi diisi
			var lat = lat_input.val();
			var long = long_input.val();
			var user_teknisi = user_teknisi_input.val(); // Ini akan diisi oleh event .btn_pilih_teknisi

			// End Of Debug Value
			console.log( "lat ", lat );
			console.log( "long ", long );
			console.log( "user_teknisi ", user_teknisi );
			console.log('obj',  lat_input);
			//++++ End Of Debug Value

			//Cek apakah nilai lat, long, dan user teknisi sudah teisi atau belum
			if ( lat != "none" && long != "none" && user_teknisi != "none" ) {

				//Jika semua validasi dan nilai wajib berhasil di input

				console.log('Validasi berhasil dilewati, tinggal submit form ke BE');
				//Jika semua input sudah terisi, maka submit api ke BE tambah project
				var form = $(this);

				//Ambil user_login untuk jadi user_client karena kan user yang melakukan tambah project ini di Controller User dan sudah pasti terdaftara dan rolenya user. Kemudian tambahkan isinya di form input hidden dengan name user_client
				var user_client = DATA_AUTH.user_login; 
				form.find('input[name=user_client]').val( user_client );
				var form_data = form.serialize();
				var action = form.attr('action');
				// loader_page( 'show',  loader_tambah_project, "Membuat Project Baru ......");
				post_dataForm( action, form_data, function( response ) {

					console.log(response);
					var msg = response.msg;
					Swal.fire( msg );

					//Setelah berhasil langsung arahkan ke list project user
					load_page( BASE_URL_PAGE + "user/project"); 

				});


			}else{
				//Jika ada input belum terisi atau ada lokasi atau teknisi yng masih ernilai none
				if ( lat == "none" || long == "none" ) {
					//Jika lokasinya belum di update, maka Pindah ke form input
					console.log('Terdeteksi lat dan long untuk lokasinya belum di update');
					open_form_input();
				}else if ( lat != "none" && long != "none" && user_teknisi == "none" ){
					console.log('Terdeteksi teknisinya belum dipilih');
					//Jika id teknisi belum di pilih, maka Pindah ke form rekom teknisi
					//Open form rekom teknisi bisa di buka ketika lat dan long sudah terisi dan user teknisinya memang belum dipilih
					console.log("Membuka rekom teknisi dengan lo" + lat + ", " + long  );
					open_form_rekom_teknisi( lat, long );
				}
			}


		});
		// Event Pilih Teknisi
		$('body').on('click'+EVENT_NAMESPACE, '.btn_pilih_teknisi', function() {
			trace();


			var col_teknisi = $('.col_teknisi');
			var btn_pilih_teknisi = $(this);
			var col_teknisi_target = btn_pilih_teknisi.parents('.col_teknisi');
			var data_user_teknisi = col_teknisi_target.attr('data-user-teknisi');

			//Update input id teknisi 
			$('input[name=user_teknisi]').val( data_user_teknisi );
			//Kasih Efek Untuk Teknisi
			col_teknisi.removeClass('active');
			col_teknisi_target.addClass('active');

		}); 


		//Event btn back to form input
		$('body').on('click'+EVENT_NAMESPACE, '.btn_back_form', function() {
			trace();
			//Event ini biss bekerja jika content form yang actve itu adalah yang form rekom
			if ( $('.content_form').filter('#form_rekom_teknisi').filter('.active').length > 0 ) {
				open_form_input();
			}
		});


		var open_form_input = () =>{
			trace();


			console.log('+++++++++ Membuka .content_form #form_input tambah project ++++++++ ');

			Swal.fire('Lengkapi form dan update lokasi kamu!');
			var content_form = $('.content_form');
			var form_input = content_form.filter('#form_input');
			var form_rekom_teknisi = content_form.filter('#form_rekom_teknisi');
			var header_content_form = $('.header_content_form');

			header_content_form.text('Form Project');
			content_form.removeClass('active');
			form_input.addClass('active');
		}
		var open_form_rekom_teknisi = ( lat, long ) =>{

			trace();


			//REQUEST DATA TEKNISI BERDASARKAN LOKASI LAT DAN LONG MENGGUNAKAN ALGORITMA HAVERESINE

			console.log('+++++++++ Membuka .content_form #form_rekom_teknisi tambah project ++++++++ ');
			console.log('+++++++++ Melakukan rekomendasi teknisi menggunakan algoritma Haversine ++++++++ ');

			Swal.fire('Pilih teknisi yang tersedia!');
			var content_form = $('.content_form');
			var form_input = content_form.filter('#form_input');
			var form_rekom_teknisi = content_form.filter('#form_rekom_teknisi');
			var header_content_form = $('.header_content_form');
			var loader_tambah_project = $('.loader_tambah_project');

			header_content_form.text('Rekomendasi Teknisi');
			loader_page( 'show',  loader_tambah_project, "Mencari Teknisi");
			get_data( URL_SERVICE_BE + "teknisi", {  
				rekomendasi_teknisi : "true",  
				lat : lat,  
				long : long,  
			}, function(response) {
				setTimeout(function() {
					console.log( response );
					loader_page( 'hide',  loader_tambah_project, "Mencari Teknisi");

					//Menampilkan form rekom teknisi dan menutup form_input 
					form_input.removeClass('active');
					form_rekom_teknisi.addClass('active');

					//Menampilkan card teknisi berdasarkan data json yang di terima dari BE 
					var data_rekom_teknisi = response; 
					load_card_rekomTeknisi( data_rekom_teknisi );
				}, 100);
			}); 

		};


		function load_card_rekomTeknisi( data_rekom_teknisi = []) {

			trace();


			var form_rekom_teknisi = $( '#form_rekom_teknisi' );
			var el_row_teknisi = form_rekom_teknisi.find('.row_teknisi');
			for (var i = 0; i < data_rekom_teknisi.length; i++) {
				var row_rekom_teknisi = data_rekom_teknisi[i];  
				// Simpan ke variabel biasa satu per satu
				var id_user_teknisi = row_rekom_teknisi.id_user_teknisi;
				var user = row_rekom_teknisi.user;
				var lok_lat = cv_decimal(row_rekom_teknisi.lok_lat);
				var lok_long = cv_decimal(row_rekom_teknisi.lok_long);
				var status_teknisi = row_rekom_teknisi.status_teknisi;
				var last_update_lacak = row_rekom_teknisi.last_update_lacak;
				var user_pembuat = row_rekom_teknisi.user_pembuat;
				var waktu = row_rekom_teknisi.waktu;
				var status = row_rekom_teknisi.status;
				var jarak_km = cv_decimal(row_rekom_teknisi.jarak_km);
				var nama = row_rekom_teknisi.nama;
				var source_file_profile = row_rekom_teknisi.source_file_profile;


				//Implementasi ke card teknisi
				var el_card_teknisi = `<div class="col-12 col_teknisi" data-user-teknisi="${ user }">
				<div class="teknisi_img">
				<img src="${source_file_profile}">
				</div>
				<div class="teknisi_info">
				<p> ${ nama } </p>
				<p> ${ jarak_km } km dari jarak kamu </p>
				<button type="button" class="btn btn-success btn_pilih_teknisi"> Pilih </button>
				</div>
				</div>`;

				//Tambahkan cardnya 
				el_row_teknisi.append( el_card_teknisi );
			}



		}



	});

});
//https://url_app_fe/user/monitoring
ROUTE.add( BASE_URL_PAGE + 'user/monitoring', function(route) {
	LOAD_PAGE_SPA( route, function() {

		$('body').on('submit', '#form_monitoring', function(e) {

			e.preventDefault();

			var input_id_project = $('input[name=monitoring_id_project]');
			var id_project = input_id_project.val();
			get_data_project(id_project, function(row_project) {

				//Taro ke aatribut data-row-project section_content untuk jadi sumber bahan lacak
				$('.section_content').attr('data-row-project', cv_obj_json( row_project ));

				//Rendering ke UI  dari row project yang diterima untuk data_project
				$("#nama_project").text(row_project.nama_project);
				$("#status_project").text(row_project.status_project);
				$("#waktu_mulai_project").text(row_project.waktu_mulai_project || "-");
				$("#waktu_selesai_project").text(row_project.waktu_selesai_project || "-");
				$("#user_teknisi").text(row_project.user_teknisi);
				$("#source_dokumen_project").attr("href", row_project.source_dokumen_project);
				$("#deskripsi_project").text(row_project.deskripsi_project);
				$("#project_lat").text(row_project.project_lat);
				$("#project_long").text(row_project.project_long);

				//Rendering ke UI  dari row project yang diterima untuk data_teknisi
				$('#teknisi_nama').text(row_project.teknisi_nama);
				$('#user_teknisi').text(row_project.user_teknisi);
				$('#id_user_teknisi').text(row_project.id_user_teknisi);
				$('#teknisi_long').text(row_project.teknisi_long);
				$('#teknisi_lat').text(row_project.teknisi_lat);
				$('#teknisi_status').text(row_project.teknisi_status);
				$('#teknisi_last_update_lacak').text(row_project.teknisi_last_update_lacak);
				$('#teknisi_user_pembuat').text(row_project.teknisi_user_pembuat);
				$('#teknisi_waktu').text(row_project.teknisi_waktu);
				$('#teknisi_status_data').text(row_project.teknisi_status_data);
			});

		});

	});
});



//=== Contoh Penggunaan Memanggi Langsung Routenya Dan Menjalankan Callbacck Trigernya dengan Triger routenya untuk menjalankan callback dari page yang didaftarkan
// load_page( URL_ROUTE_YANG_TERDAFTAR );







