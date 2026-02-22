<?php 
namespace App\Http\Controllers;

class Menu{

    public static $data_sidebar = [];  // Array index multidimensi yang isinya array associatif multidimensi  
    public static $data_modal_menu = []; //Array index multidimensi yang isinya array associatif
    // ++++++++++++++++++++++ METHOD TERKAIT DATA SIDEBAR MENU DI ADMIN +++++

    /*
    $data_sidebar = [   
    //Kalo Row Jenis Row Modulnya adalah MODUL
    [
    "nama_modul" => "Modul 1",
    "data_modul_menu" => [ [ "menu" => "", "icon" => "", "url" => "" ], [ "menu" => "", "icon" => "", "url" => ""] ]
    ], 
    //Kalo Row Jenis Row Modulnya adalah MENU
    [ "menu" => "", "icon" => "", "url" => "" ], [ "menu" => "", "icon" => "", "url" => ""]
    ],
    */


    public static function ADD_ROW_MODULMENU_SIDEBAR( $nama_modul, $data_menuModulParam = [ ["menu"=>"MenuContoh","icon"=>"fas fa-coffee","url"=>""] ], $icon = "fas fa-folder-open"){
        $row_sidebar = [
            "jenis_modul" => "MODUL",
            "nama_modul" => $nama_modul,
            "icon" => $icon,
            "data_modul_menu" => $data_menuModulParam //[ [], [] ]
        ];
        self::$data_sidebar[] = $row_sidebar;         
    }
    public static function ADD_ROW_MENU_SIDEBAR( $row_menu = ["menu"=>"MenuContoh","icon"=>"fas fa-coffee","url"=>""]  ){
        $row_sidebar = [
            "jenis_modul" => "MENU",
            "menu" => "",
            "icon" => "",
            "url" => "",
        ];
        // Mengisi menu, icon, dan url
        $row_sidebar = array_merge(  $row_sidebar, $row_menu );
        self::$data_sidebar[] = $row_sidebar;         
    }
    public static function SET_MODAL_MENU(){
        self::$data_modal_menu =  [
            [ "menu" => "App", "icon" => "fas fa-users", "url" => asset("app/") ],
            [ "menu" => "Logout", "icon" => "fas fa-sign-out-alt", "url" => asset("auth/logout") ],
        ];
        return self::$data_modal_menu;
    }
    public static function SET_SIDEBAR_MENU(){
        self::ADD_ROW_MENU_SIDEBAR(
            [ 
                "menu" => "Dashboard", 
                "icon" => "fas fa-th-large", 
                "url" => asset("/dashboard") 
            ],
        );
        //++++ Menambahkan modul menu account 
        self::ADD_ROW_MODULMENU_SIDEBAR( 'Modul Account', [
            [ "menu" => "Atur Level", "icon" => "fas fa-key", "url" => asset("account/level") ],
            [ "menu" => "Atur Account", "icon" => "fas fa-users", "url" => asset("account/account") ],
        ]);
        //++++ Menambahkan modul menu fsm 
        self::ADD_ROW_MODULMENU_SIDEBAR( 'Modul FSM', [
            [ "menu" => "Atur Teknisi", "icon" => "fas fa-hard-hat", "url" => asset("fsm/teknisi") ],
            [ "menu" => "Atur Produk", "icon" => "fas fa-box", "url" => asset("fsm/produk") ],
            [ "menu" => "Atur Project", "icon" => "fas fa-tasks", "url" => asset("fsm/project") ],
            [ "menu" => "Atur Laporan", "icon" => "fas fa-file-alt", "url" => asset("fsm/laporan") ],
            [ 
                "menu" => "Monitoring", 
                "icon" => "fas fa-tv", 
                "url" => asset("fsm/monitoring") 
            ],
        ]);
        //++++ Menambahkan modul menu keuangan 
        self::ADD_ROW_MODULMENU_SIDEBAR( 'Modul Transaksi', [
            [ 
                "menu" => "Atur Transaksi Kategori", 
                "icon" => "fas fa-filter", 
                "url" => asset("transaksi/transaksi_kategori") 
            ],
            [ 
                "menu" => "Atur Pemasukan", 
                "icon" => "fas fa-cash-register", 
                "url" => asset("transaksi/transaksi_pemasukan") 
            ],
            [ 
                "menu" => "Atur Pengeluaran", 
                "icon" => "fas fa-money-bill", 
                "url" => asset("transaksi/transaksi_pengeluaran") 
            ],
            [ 
                "menu" => "Atur Pembayaran", 
                "icon" => "fas fa-cash-register", 
                "url" => asset("transaksi/transaksi_pembayaran") 
            ],
        ]);
        self::ADD_ROW_MODULMENU_SIDEBAR( 'Modul Teknisi', [
            [ 
                "menu" => "Dashboard", 
                "icon" => "fas fa-tachometer-alt", 
                "url" => asset("teknisi/dashboard") 
            ],
            [ 
                "menu" => "List Project", 
                "icon" => "fas fa-clipboard-list",
                "url" => asset("teknisi/project") 
            ],
            [ 
                "menu" => "Monitoring Project",
                "icon" => "fas fa-map-marked-alt", 
                "url" => asset("teknisi/monitoring") ],
            ]);
        self::ADD_ROW_MODULMENU_SIDEBAR( 'Modul User', [
            [ 
                "menu" => "Dashboard", 
                "icon" => "fas fa-tachometer-alt", 
                "url" => asset("user/dashboard") 
            ],
            [ 
                "menu" => "List Project", "icon" => "fas fa-clipboard-list",
                "url" => asset("user/project") 
            ],
            [ 
                "menu" => "Tambah Project", 
                "icon" => "fas fa-plus-circle", 
                "url" => asset("user/tambah_project") 
            ],
            [ 
                "menu" => "Monitoring Project", 
                "icon" => "fas fa-eye", 
                "url" => asset("user/monitoring") 
            ],
        ]);

        return self::$data_sidebar;
    }

}