<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Menu;
use Illuminate\Http\Request;
use App\Models\Base_model;


class Index extends Controller{

    //Method View Untuk Masuk Modul Aplikasi 
    //https://url_app/admin/ 
    public function index(){
        // $data_sidebar = Menu::SET_SIDEBAR_MENU();
        $data_modal_menu = Menu::SET_MODAL_MENU();

        // // dd($data_sidebar);

        $data = [];
        // $data['data_sidebar'] = $data_sidebar;
        $data['data_modal_menu'] = $data_modal_menu;
        return view('Index/index', $data);
    }
}


