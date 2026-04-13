<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Index; //---> Folder Layer Controller Aplikasi SPA Admin
use App\Http\Controllers\Modul; //---> Folder Layer Controller Aplikasi SPA Admin




//=== route entry controller SPA Modul Aplikasi ( Except handling view index )  =======
$SPA_ROUTE_PREFIX_KEYWORD = env('SPA_ROUTE_PREFIX_KEYWORD');
$ROUTE_NOT_INDEX = [ $SPA_ROUTE_PREFIX_KEYWORD, "api", 'auth']; //Route bisa dikunjungi tanpa diarahkan ke route index spa 
$ROUTE_NOT_INDEX = implode("|", $ROUTE_NOT_INDEX);
Route::get('/{any}', function () {
    return app(Index::class)->index();
})->where('any', '^(?!'.$ROUTE_NOT_INDEX.').*$');
/*
artinya:
user akan selalu diarahkan ke view index() pada class controller Index untuk route apa saja kecuali yang ada didalam $ROUTE_NOT_INDEX
❌ jangan tangkap /SPA_VIEW/*
❌ jangan tangkap /api/*
✅ tangkap sisanya (/dashboard, /account, dll)
*/
//=== End Of route entry controller SPA Modul Aplikasi   =======


//============================ SPA VIEW ROUTE ===========================
// https://localhost/spa/{endpoint_fitur}
Route::prefix( $SPA_ROUTE_PREFIX_KEYWORD )->group(function(){

    //==== Route Modul Dashboard ( Di menu dianggap sebagai menu fitur )
    //Source Controller Modul : App\Http\Controllers\Modul_dashboard
    //Source View : resource\view\Modul_dashboard
    Route::controller(Modul\Modul_dashboard::class)->group(function () {
    //==== Route Fitur ====
        Route::get('/dashboard', 'dashboard');
    });

    //==== Route Modul Profile
    //Source Controller Modul : App\Http\Controllers\Modul_profile
    //Source View : resource\view\Modul_profile
    Route::controller(Modul\Modul_profile::class)->group(function () {
    //==== Route Fitur ====
        Route::get('/profile', 'index');
    });

    //==== Route Modul Log
    //Source Controller Modul : App\Http\Controllers\Modul_log
    //Source View : resource\view\Modul_log
    Route::controller(Modul\Modul_log::class)->group(function () {
    //==== Route Fitur ====
        Route::get('/log', 'index');
        Route::get('/log/log_frontend', 'log_frontend');
    });

    //==== Route Modul Account
    //Source Controller Modul : App\Http\Controllers\Modul_account
    //Source View : resource\view\Modul_account
    Route::controller(Modul\Modul_account::class)->group(function () {
    //==== Route Fitur ====
        Route::get('/account/level', 'level');
        Route::get('/account/account', 'account');
    });

    //==== Route Modul FSM
    //Source Controller Modul : App\Http\Controllers\Modul_FSM
    //Source View : resource\view\Modul_FSM
    Route::controller(Modul\Modul_FSM::class)->group(function () {
    //==== Route Fitur ====
        Route::get('/fsm/teknisi', 'teknisi');
        Route::get('/fsm/produk', 'produk');
        Route::get('/fsm/project', 'project');
        Route::get('/fsm/laporan', 'laporan');
        Route::get('/fsm/monitoring', 'monitoring');

    });
    //==== Route Modul Transaksi  
    //Source Controller Modul : App\Http\Controllers\Modul\Modul_transaksi
    //Source View : resource\views\Modul_transaksi
    Route::controller(Modul\Modul_transaksi::class)->group(function () {
    //==== Route Fitur ====
        Route::get('/transaksi/transaksi_kategori', 'kategori');
        Route::get('/transaksi/transaksi_pemasukan', 'pemasukan');
        Route::get('/transaksi/transaksi_pengeluaran', 'pengeluaran');
        Route::get('/transaksi/transaksi_pembayaran', 'pembayaran');
    });



    //==== Route Modul Teknisi  
    //Source Controller Modul : App\Http\Controllers\Modul\Modul_teknisi
    //Source View : resource\views\Modul_teknisi
    Route::controller(Modul\Modul_teknisi::class)->group(function () {
    //==== Route Fitur ====
        Route::get('/teknisi/dashboard', 'dashboard');
        Route::get('/teknisi/project', 'project');
        Route::get('/teknisi/monitoring', 'monitoring');
    });


//==== Route Modul User  
    //Source Controller Modul : App\Http\Controllers\Modul\Modul_user
    //Source View : resource\views\Modul_user
    Route::controller(Modul\Modul_user::class)->group(function () {
    //==== Route Fitur ====
        Route::get('/user/dashboard', 'dashboard');
        Route::get('/user/profile', 'profile');
        Route::get('/user/project', 'project');
        Route::get('/user/tambah_project', 'tambah_project');
        Route::get('/user/monitoring', 'monitoring');
    });






});











