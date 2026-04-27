<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FileModel;

class File_controller extends Controller
{
    public function get_data(Request $request)
    {
        return response()->json(
            FileModel::getData( $request ),
            200
        );
    }

    public function post_tambah_file(Request $request)
    {

        $tipe = $request->input('tipe_penyimpanan');
        if ($tipe == "lokal" || $tipe == "cloud") {

            $validasi = FileModel::validasiKapasitas($request);
            if (!$validasi['status']) {
                return response()->json($validasi, 200);
            }

            $result = ($tipe == "lokal")
                ? FileModel::tambah_file_lokal( $request )
                : FileModel::tambah_file_cloud( $request );

        } else {
            $result = FileModel::tambah_file_url( $request );
        }

        return response()->json($result, 200);
    }

    public function get_data_kapasitas( Request $request )
    {
        return response()->json(
            FileModel::getDataKapasitas( $request ),
            200
        );
    }

    public function testing(Request $request)
    {
        return response()->json([
            "POST"  => $request->post(),
            "FILES" => $request->allFiles(),
        ], 200);
    }
}