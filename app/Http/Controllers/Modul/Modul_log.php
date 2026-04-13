<?php

namespace App\Http\Controllers\Modul;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Base_model;


//+++++++ Method dibawah akan ditampilkan dengan asynchronous SPA pada javascripts melalui index +++++++++++
class Modul_log extends Controller{

    //https://url_app/log/ 
    public function index(){  
        $data = [];
        return view( 'Modul_log/index', $data );
    }
    //https://url_app/log/log_frontend
    public function log_frontend(){  
        $data = [];
        return view( 'Modul_log/log_frontend', $data );
    }


}







