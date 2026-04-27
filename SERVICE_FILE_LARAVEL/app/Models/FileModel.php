<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class FileModel extends Model
{
    protected $table = 'data_file';

    protected static $max_kapasitas_kb = [
        "lokal" => 100000,
        "cloud" => 100000,
        "url"   => 0
    ];

    /*
    |--------------------------------------------------------------------------
    | GET DATA
    |--------------------------------------------------------------------------
    */
    public static function getData($request)
    {
        $userId = "admin";
        $tipe_penyimpanan = $request->input('by_tipe_penyimpanan');

        $query = DB::table('data_file');

        if ($userId) {
            $query->where('user_admin', $userId);
        }

        if ($tipe_penyimpanan) {
            $query->where('tipe_penyimpanan', $tipe_penyimpanan);
        }

        return $query->orderBy('waktu', 'desc')->get();
    }

    /*
    |--------------------------------------------------------------------------
    | TERPAKAI
    |--------------------------------------------------------------------------
    */
    public static function getTerpakai($tipe_penyimpanan, $userId)
    {
        return (int) DB::table('data_file')
        ->where([
            'tipe_penyimpanan' => $tipe_penyimpanan,
            'user_admin'       => $userId
        ])
        ->sum('size_file_kb');
    }

    /*
    |--------------------------------------------------------------------------
    | VALIDASI FILE DASAR
    |--------------------------------------------------------------------------
    */
    public static function validasiFile($file)
    {
        if (!$file) {
            return ['status' => false, 'msg' => 'File tidak ditemukan'];
        }

        $allowed = ['jpg','jpeg','png','pdf','doc','docx','xls','xlsx','zip','sql'];
        $ext = strtolower($file->getClientOriginalExtension());

        if (!in_array($ext, $allowed)) {
            return ['status' => false, 'msg' => 'Tipe file tidak diizinkan'];
        }

        return ['status' => true];
    }

    /*
    |--------------------------------------------------------------------------
    | VALIDASI KAPASITAS
    |--------------------------------------------------------------------------
    */
    public static function validasiKapasitas($request)
    {
        $file = $request->file('upload_file');
        $tipe_penyimpanan = $request->input('tipe_penyimpanan');
        $userId = "admin";

        $max = self::$max_kapasitas_kb[$tipe_penyimpanan] ?? 0;
        $size_kb = round($file->getSize() / 1024);

        $terpakai = self::getTerpakai($tipe_penyimpanan, $userId);
        $sisa = $max - $terpakai;

        if ($size_kb <= $sisa) {
            return ['status' => true];
        }


        return [
            'status' => false,
            'msg'    => "Penyimpanan kamu tidak cukup untuk menyimpan file ini!!"
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | LOCAL UPLOAD
    |--------------------------------------------------------------------------
    */
    public static function tambah_file_lokal($request)
    {
        $file = $request->file('upload_file');
        $userId = "admin";

        $validasi = self::validasiFile($file);
        if (!$validasi['status']) return $validasi;

        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();

        // folder per user
        $folder = 'uploads/' . $userId;
        $size_kb = round($file->getSize() / 1024);
        $path = $file->storeAs($folder, $fileName, 'public');
        // URL untuk disimpan di db
        $source_file = url('storage/' . $path);

        DB::table('data_file')->insert([
            'user_admin'        => $userId,
            'tipe_penyimpanan'  => 'lokal',
            'nama_file'         => $fileName,
            'source_file'       => $source_file,   // simpan path, bukan URL
            'size_file_kb'      => $size_kb,
            'status'            => 'active',
            'waktu'             => now(),
        ]);

        return [
            'status' => true,
            'msg'    => 'File lokal berhasil disimpan',
            'source_file' => $source_file,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | CLOUD UPLOAD
    |--------------------------------------------------------------------------
    */
    public static function tambah_file_cloud($request)
    {
        $file = $request->file('upload_file');
        $userId = "admin";

        $validasi = self::validasiFile($file);
        if (!$validasi['status']) return $validasi;

        $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();

        $upload = self::uploadFileCloud($file, $userId);

        $response = [];
        if ($upload['status']) {

            $size_kb = round($file->getSize() / 1024);

            DB::table('data_file')->insert([
                'user_admin'        => $userId,
                'tipe_penyimpanan'  => 'cloud',
                'nama_file'         => $fileName,
                'source_file'       => $upload['url'],
                'size_file_kb'      => $size_kb,
                'status'            => 'active',
                'waktu'             => now(),
            ]);

            $response = [
                'status' => true,
                'msg' => "Berhasil Melakukan Upload",
                'response_server' => $upload,
            ];

        }else{
            $response = [
                'status' => false,
                'msg' => "Gagal Melakukan Upload, Status Server : " . $upload['msg'],
                'response_server' => $upload,
            ];
        }


        return $response;
    }



    private static function uploadFileCloud($file, $userId)
    {   
        try {
            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path =  '/uploads/' . $fileName;

            $result = Storage::disk('s3_cloud')->put(
                $path,
                file_get_contents($file->getRealPath()),
                [
                    'visibility' => 'public'
                ]
            );

            if (!$result) {
                return [
                    'status' => false,
                    'msg' => 'S3 reject write (permission / policy issue)',
                    'path' => $path
                ];
            }

            return [
                'status' => true,
                'msg' => 'Upload sukses',
                'url' => Storage::disk('s3_cloud')->url($path)
            ];

        } catch (\Throwable $e) {
            return [
                'status' => false,
                'msg' => $e->getMessage(),
                'line' => $e->getLine(),
                'class' => get_class($e)
            ];
        }
    }

    /*
    |--------------------------------------------------------------------------
    | URL SAVE
    |--------------------------------------------------------------------------
    */
    public static function tambah_file_url($request)
    {
        $url = $request->input('url');
        $userId = "admin";

        if (!$url) {
            return [
                'status' => false,
                'msg'    => 'URL tidak boleh kosong'
            ];
        }

        $headers = @get_headers($url, 1);
        $size_kb = 0;

        if ($headers && isset($headers['Content-Length'])) {
            $size_kb = round($headers['Content-Length'] / 1024);
        }

        DB::table('data_file')->insert([
            'user_admin'        => $userId,
            'tipe_penyimpanan'  => 'url',
            'nama_file'         => basename($url),
            'source_file'       => $url,
            'size_file_kb'      => $size_kb,
            'status'            => 'active',
            'waktu'             => now(),
        ]);

        return [
            'status' => true,
            'msg'    => 'File URL berhasil disimpan',
            'url'    => $url
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | KAPASITAS
    |--------------------------------------------------------------------------
    */
    public static function getDataKapasitas($request)
    {
        $userId = "admin";

        return [
            "lokal" => [
                "max"      => self::$max_kapasitas_kb['lokal'],
                "terpakai" => self::getTerpakai('lokal', $userId),
            ],
            "cloud" => [
                "max"      => self::$max_kapasitas_kb['cloud'],
                "terpakai" => self::getTerpakai('cloud', $userId),
            ],
            "url" => [
                "max"  => "UNLIMITED",
                "sisa" => "UNLIMITED",
            ],
        ];
    }
}