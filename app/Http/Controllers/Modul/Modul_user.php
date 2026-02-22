<?php

namespace App\Http\Controllers\Modul;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Base_model;

class Modul_user extends Controller{

    public function __construct(){

    }

    //+++++++ Method dibawah akan ditampilkan dengan asynchronous SPA pada javascript melalui index +++++++++++
    //https://url_app/user/dashboard 
    public function dashboard(){  
        $data = [];
        return view( 'Modul_user/dashboard', $data );
    }
    //https://url_app/user/profile 
    public function profile(){
        $data = [];
        return view( 'Modul_user/profile', $data);
    }
    //https://url_app/user/project 
    public function project(){
        $data = [];
        return view( 'Modul_user/project', $data);
    }
    //https://url_app/user/tambah_project 
    public function tambah_project(){
        $data = [];
        return view( 'Modul_user/tambah_project', $data);
    }
    //https://url_app/user/FSM/monitoring 
    public function monitoring(){  
        $data = []; 
        return view( 'Modul_user/monitoring', $data );
    }
}