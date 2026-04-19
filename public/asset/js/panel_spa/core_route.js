//++++++++++++++++++++++++ BASE ROUTING SCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*INGAT!! INI HARUS TERHUBUNG DENGAN BEBERAPA SUMBER SEBAGAI NILAI KONFIGNYA, SEPERTI :
- File Script config.js ( PENTING ) untuk nilai konstanta konfigurasi
- File Script core.js dan api.js untuk fungsi dan nilai core aplikasi
- File blade resource/Index/index.blade.php dan env untuk mengambil nilai env dan mengirimkan ke JS melalui variabel window.env 
*/


$(document).ready(function(e) {

	//Membuka halaman pertama dari menu yang paling awal yaitu dashboard 
	var link_menu_first = $('.sidebar').find('.link_menu').first();
	var data_page = link_menu_first.attr('data-page');
	load_page( "/log/log_frontend" );

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
		load_page( data_page ); //Inni ada di core_route.js

	});
}); 

function CLEANUP_SPA_EVENT_NAMESPACE( route ) {
	console.warn(`EVENT NAME SPACE ${SPA_EVENT_NAMESPACE} URL ROUTE!
		${ route } DIHAPUS!!!
		`);
	$(document).off(SPA_EVENT_NAMESPACE);
	$('body ').off(SPA_EVENT_NAMESPACE);
}

// const BASE_URL_PAGE = "http://127.0.0.1:8000/"; ---> INI ADA DI api.js
function ROUTE_INIT( route, load_spa = false ) {
	this.route = route; //Ini route asli dari UI Menu Tapi Bukan Bentuk Route Page SPA, hanya menjadi id pengenal dari suatu route 
	this.route_spa = BASE_URL_PAGE + SPA_ROUTE_PREFIX_KEYWORD + route; //Route SPA untuk melakuka load spa 
	this.callback_route = false; //Fungsi callback
	//Membuat route spa 
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
		var route_obj = new ROUTE_INIT( route, load_spa );
		// Buat perilaku page ketika di triger dari method callback yang di daftarkan berdasarkan routenya
		route_obj.callback_route = function() {
			callback( route_obj );
		};

		//++++++++ Sign Object Route Yang Sudah Di Buil +++++++
		this.QUE_ROUTE.push( route_obj );
	},

	//MEMANGGIL ROUTE BERDASARKAN TRIGER ROUTE AARGUMENNYA 
	load : function( url_route_target = BASE_URL_PAGE + "path/path2/" ) {

		console.group("++++++ LOG LOAD METHOD +++++++++");

		// Mencari object roue berdasarkan argumen route yang dilempr dengan route di que que object route 
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

		//Pengkondisian apakah route target sudah tedaftar atau tidak.
		if ( ROUTE_INIT_EXIST != false ) {
			//Jika Route Yang Di Triger Ada, Maka Jalankan Perilaku dari callbacknya
			console.warn('ROUTE TARGET DITEMUKAN DENGAN MENJALANKAN CALLBACK URL ROUTE ' + url_route_target);

			console.warn( ROUTE_INIT_EXIST );
			//Handling Type Callback
			if (typeof ROUTE_INIT_EXIST.callback_route === 'function') {
				///Panggil method perilaku Routenya
				ROUTE_INIT_EXIST.callback_route();
			}else{
				console.error('ROUTE URL ROUTE ' + url_route_target +  "TIDAK MEMILIKI CALLBACK FUNCTION");
			}

		}else{
			var msg_error = 'TIDAK DITEMUKAN ATAU BELUM DIDAFTARKAN ROUTENYA DI core_route.js DENGAN URL ROUTE ' + url_route_target;
			Swal.fire(msg_error);
			console.error( msg_error );
		}

		console.groupEnd("++++++ END  OF LOG LOAD METHOD +++++++++");

	}
};
//++++++++++++++++++++++++ END OF BASE ROUTING SCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//+++++++++++  BASE SPA ASYNCHRONOUS SCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

		//Jika page tidak dapat di load atau error 	
		if ( statusText === "error") {
			console.log( xhr );
			var msg = `${ xhr.status } <br> ${xhr.statusText}`
			animasi_loadPage('show', animasi_loadPageEl, msg);
			return false; //Menghentikan laju fungsi
		}
		
		//Membersihkan event SPA Khusus Fitur yang memiliki namespace .eventSPA
		CLEANUP_SPA_EVENT_NAMESPACE();

		//Ini letaknya ada di file.js untuk menambahkan elemen untuk melakukan select file
		//Mengecek dan menambahkan tombol untuk memanggil modal select file apabila ada elemen form yang memiliki class .form_file_upload 
		el_form_file_upload();  
		animasi_loadPage("hide", animasi_loadPageEl);

		//Menambahan element animasi load page pada table
		create_animasiLoadPageEl();

		// //++++++++++ Memberikan tanda efek ke .link_menu yang punya nilai data-page seperti target_page
		// var link_menu = $('.sidebar .link_menu');
		// var link_menu_target = link_menu.filter(`.link_menu[data-page="${target_page}"]`);
		// //+++++ Tandai elemen link menu yang aktif 
		// link_menu.removeClass('active');
		// link_menu_target.addClass('active');

		//Memanggil callback
		callback( responseText, statusText, xhr );



	});



	console.groupEnd('++++ END OF LOAD_PAGE_SPA with route ${ LOAD_PAGE_URL  } +++++');

}

//Helper Function For Route to Load SPA
function load_page( url_route = "path/path2/" ) {

	//++++++ Memanggil callback route berdasarkan url routenya 
	ROUTE.load( url_route );

	//++++++++++ Memberikan tanda efek ke .link_menu yang punya nilai data-page seperti target_page
	var link_menu = $('.sidebar .link_menu');
	var link_menu_target = link_menu.filter(`.link_menu[data-page="${url_route}"]`);

	//Tandai elemen link menu yang aktif 
	link_menu.removeClass('active');
	link_menu_target.addClass('active');

	//++++ Membuka parent .link_modul jika link menu yang aktif terbuka berdasarkan yang di load punya parent link_modul
	var link_menu_activePage = $('.sidebar .link_menu').filter(`[data-page="${url_route}"]`); 
	var link_modul_activePage = link_menu_activePage.closest('.link_modul');
	var row_modul_header_target = link_modul_activePage.children('.row_modul_header'); //row_modul_header pertama milik si modul saja
	load_link_modul( row_modul_header_target );
}


/*
|--------------------------------------------------------------------------
| Load Link Modul
|--------------------------------------------------------------------------
|
| Mengatur perilaku open / close modul sidebar.
|
| Rules:
| - Membuka modul ketika header diklik
| - Menutup modul lain yang tidak memenuhi kriteria
| - Modul yang memiliki menu aktif tidak boleh ditutup
| - Behaviour berbeda untuk modul utama dan sub modul
|
*/
function load_link_modul( row_modul_header_target ) {

	var link_modul_target = row_modul_header_target.closest( '.link_modul.row_modul' ); //Ini sama seperti cara kerja parents cuman hanya akan memilih parent sselector yang paling awal ditemui aja bukan seluruhnya

	if ( link_modul_target.is('.active') == false ) {
		open_link_modul(link_modul_target);
	}else{
		close_link_modul(link_modul_target);
	}

	//Pertahankan link modul yang punya menu aktif agar selalu terbuka baik modul ataupun dsub modul
	var link_menu_active = $('.link_menu').filter('.active');
	var link_modul_hasMenuActive = link_menu_active.parents('.link_modul'); //akan seleksi link modul jiks sub modul targetnya juga 
	open_link_modul( link_modul_hasMenuActive );


	//Handing Apabila link modul target itu sub modul atau 

	if ( link_modul_target.is('.sub_modul') ) {
		//Jika link modul target itu adalah sub modul
		console.warn('Modul Target adalah sub modul');
		var link_modul_rootSub = link_modul_target.parents('.link_modul'); 
		var link_modul_sub = link_modul_rootSub.find('.sub_modul')
		.not( link_modul_target )
		.not( link_modul_hasMenuActive );
		close_link_modul(link_modul_sub);
	}else{
		//Jika link modul target itu bukan sub modul 
		console.warn('Modul Target bukan sub modul');
		var link_modul_rootNotTargetActive = $('.link_modul').not('.sub_modul').not( link_modul_target ).not( link_modul_hasMenuActive );
		close_link_modul(link_modul_rootNotTargetActive);
	}

}
function open_link_modul(link_modul_target){

	link_modul_target.addClass('active');

	var i_element = link_modul_target
	.children('.row_modul_header')
	.find('.icon_indicator i');

	i_element.removeClass('fa-chevron-right')
	.addClass('fa-chevron-down');

}
function close_link_modul(link_modul_target){

	link_modul_target.removeClass('active');

	var i_element = link_modul_target
	.children('.row_modul_header')
	.find('.icon_indicator i');

	i_element.removeClass('fa-chevron-down')
	.addClass('fa-chevron-right');

}

function form_tambah_data( form_obj_this, callback = false ) {

	trace();

	//Handling callback 
	if (  typeof callback !=  "function"  ) {
		callback = function() {
			return 1;
		};
	}

	var form = $(form_obj_this);
	var form_data = form.serialize();
	var url_endpoint = form.attr('action');
	post_tambah_data( url_endpoint, form_data, function( response ) {
		console.log(response);
		var msg = response.msg;
		Swal.fire( msg );
		//Refresh data di table load 
		callback( response );
	});

}




//+++++++++++ END OF BASE SPA ASYNCHRONOUS SCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++






//+++++++++++++++++++++ IMPLEMENTASI - PENDAFTARAN TRIGER CALLBACK ROUTE SCRIPT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


/*
// === CONTOH MENDAFTARKAN ROUTE SPA CALLBACK BASIC 
ROUTE.add( '{URL_PATH_TERDAFTAR_DI_CONTROLLER}/path', function( RouteObj ) {
	alert('EVENT TRIGER CALLBACK');
});

// === CONTOH MENDAFTARKAN ROUTE SPA CALLBACK DENGAN LOAD SPA 
ROUTE.add( '{URL_PATH_TERDAFTAR_DI_CONTROLLER}/path', function( RouteObj ) {
	LOAD_PAGE_SPA( route );
});

// === CONTOH MENDAFTARKAN ROUTE SPA CALLBACK DENGAN LOAD SPA BER CALLBACK 
ROUTE.add( '{URL_PATH_TERDAFTAR_DI_CONTROLLER}/path', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr  ){
		alert('EVENT CALLBACK SETELAH LOAD SPA');
	});
});
*/


//----- ADMIN CONTROLLER ROUTE CALLBACK ----


//==================== MODUL DASHBOARD ===================
//https://url_app_fe/dashboard
ROUTE.add( '/dashboard/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa );
});

//==================== MODUL PROFILE ===================
//https://url_app_fe/profile
ROUTE.add( '/profile/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa );
});

//==================== MODUL LOG ===================
//https://url_app_fe/profile
ROUTE.add( '/log/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa );
});
ROUTE.add( '/log/log_frontend', function( RouteObj ) {

	LOAD_PAGE_SPA( RouteObj.route_spa, function() {

		// Generate Value Format Time UI Input
		render_inputTime("select[name='startTime']");
		render_inputTime("select[name='endTime']");
		render_InputUIByDataLogAll();

		//Form Filtering Submit
		$('#form_filterLog').on('submit'+SPA_EVENT_NAMESPACE, function(e) {
			e.preventDefault();
			load_data_table();
		});
		$('#btn_delete_allData').on('click'+SPA_EVENT_NAMESPACE, function  () {
			deleteAllDataLog();
			render_InputUIByDataLogAll();
			load_data_table();
		});
		$('#btn_generate_dummy').on('click'+SPA_EVENT_NAMESPACE, function () {
			generateDummyLogs();
			render_InputUIByDataLogAll();
			load_data_table();
		});


	});

	function load_data_table( option_filter = true ){

		//++++++ Render and Load Data Table Based Filter
		//Get Data Log With Filter
		var data_log = get_dataLogByFilter( function() {
			//Update Filter State By "time"  
			var input_startTime = $('[name=startTime]');
			var input_endTime = $('[name=endTime]');
			update_filterStateByFilterType( 'time', {
				start : input_startTime.val(),
				end : input_endTime.val()
			});

			//Update Filter State By "logFile"  
			var input_logFile = $('[name=logFile]');
			update_filterStateByFilterType( 'logFile', {
				value : input_logFile.val()
			});

			//Update Filter State By "logType"
			var input_logType = $('[name=logType]');  
			update_filterStateByFilterType( 'logType', {
				value : input_logType.val()
			});
		});
		render_tableLog( data_log );
	}
	function render_tableLog( data_log = [] ) {

		var table_logData = $('#table_logData');
		var tbody = table_logData.find('tbody');


		tbody.html("");

		//Menambahkan kolom table berdasarkan row data dan membentuk LOG_TYPE_LIST
		for (var i = 0; i < data_log.length; i++) {
			var row_data = data_log[i];
			var tr = `
			<tr>
			<td>${i + 1}</td>
			<td>${ formatToDBTime(row_data.time) }</td>
			<td>${row_data.type}</td>
			<td>${row_data.message}</td>
			<td>${row_data.context}</td>
			<td>${row_data.file}</td>
			<td>${row_data.line}</td>
			<td>${row_data.url}</td>
			</tr>
			`;
			tbody.append( tr )	
		}

		//Render update counting data log 
		var banyak_data = data_log.length;
		var banyak_data_el = $('.box_dashboard .banyak_data');

		if ( banyak_data_el.length > 0 ) {
			banyak_data_el.text( banyak_data )
		}
	}
	function render_inputTime(selector) {

		for (var h = 0; h < 24; h++) {

			// 00 menit
			var hour = String(h).padStart(2, "0");
			var min1 = "00";
			var min2 = "30";

			$(selector).append(
				`<option value="${hour}:${min1}">${hour}:${min1}</option>`
				);

			$(selector).append(
				`<option value="${hour}:${min2}">${hour}:${min2}</option>`
				);
		}
	}
	function render_InputUIByDataLogAll(){
		var data_log = get_dataLogAll();
		var LIST_LOGTYPE = [];
		var LIST_LOGFILE = [];
		for (var i = 0; i < data_log.length; i++) {
			var row_log = data_log[i];
			//Mendapatkan list log file
			if ( LIST_LOGFILE.includes( row_log.file ) == false ) {
				LIST_LOGFILE.push( row_log.file );
			}
			//Mendapatkan list log type
			if ( LIST_LOGTYPE.includes( row_log.type ) == false ) {
				LIST_LOGTYPE.push( row_log.type );
			}
		} 

		//++++ Render List Input +++++++++++
		render_inputUILogFile( LIST_LOGFILE );
		render_inputUILogType( LIST_LOGTYPE );
	}
	function render_inputUILogFile( LIST_LOGFILE ) {
		var input_logFile = $('[name=logFile]');
		input_logFile.find('option').not('.all').remove();
		for (var i = 0; i < LIST_LOGFILE.length; i++) {
			var logFile = LIST_LOGFILE[i];
			var optionLogFile = `
			<option> ${ logFile } </option>
			`;
			input_logFile.append( optionLogFile );
		}
	}
	function render_inputUILogType( LIST_LOGTYPE ) {
		var input_logFile = $('[name=logType]');
		input_logFile.find('option').not('.all').remove();
		for (var i = 0; i < LIST_LOGTYPE.length; i++) {
			var logFile = LIST_LOGTYPE[i];
			var optionLogFile = `
			<option> ${ logFile } </option>
			`;
			input_logFile.append( optionLogFile );
		}
	}
	function formatToDBTime(dateString) {
		var date = new Date(dateString);

		var yyyy = date.getFullYear();
		var mm = String(date.getMonth() + 1).padStart(2, "0");
		var dd = String(date.getDate()).padStart(2, "0");

		var hh = String(date.getHours()).padStart(2, "0");
		var min = String(date.getMinutes()).padStart(2, "0");
		var ss = String(date.getSeconds()).padStart(2, "0");

		return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
	}



});

//==================== MODUL ACCOUNT ===================
//https://url_app_fe/account/account
ROUTE.add( '/account/account/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {

		// Method event Menambahkan data secara asynchronous
		$('body').on('submit'+SPA_EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form
			form_tambah_data( this, function( response ) {
				load_table_active();
			});
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
ROUTE.add( '/account/level/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {
		// Method event untMenambahkan data secara asynchronous
		$('body').on('submit'+SPA_EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form
			form_tambah_data( this, function( response ) {
				load_table_active();

			});

		});
	});
});




//==================== MODUL FSM ===================
//https://url_app_fe/fsm/teknisi
ROUTE.add( '/fsm/teknisi/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {
		// Method event untMenambahkan data secara asynchronous
		$('body').on('submit'+SPA_EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form
			form_tambah_data( this, function( response ) {
				load_table_active();
			});

		});
	} );

});
//https://url_app_fe/fsm/produk
ROUTE.add( '/fsm/produk/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {
		// Method event untMenambahkan data secara asynchronous
		$('body').on('submit'+SPA_EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form

			form_tambah_data( this, function( response ) {
				load_table_active();
			});

		});
	});

});
//https://url_app_fe/fsm/project
ROUTE.add( '/fsm/project/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {
		// Method event untMenambahkan data secara asynchronous
		$('body').on('submit'+SPA_EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form
			form_tambah_data( this, function( response ) {
				load_table_active();
			});

		});
	});

});
//https://url_app_fe/fsm/laporan
ROUTE.add( '/fsm/laporan/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {

	});
});
//https://url_app_fe/fsm/monitoring
ROUTE.add( '/fsm/monitoring/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {

	});
});



//==================== MODUL ADMIN ===================
//https://url_app_fe/transaksi/transaksi_kategori
ROUTE.add( '/transaksi/transaksi_kategori', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {
		// Method event untMenambahkan data secara asynchronous
		$('body').on('submit'+SPA_EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form
			form_tambah_data( this, function( response ) {
				load_table_active();
			});

		});
	});
});
//https://url_app_fe/transaksi/transaksi_pemasukan
ROUTE.add( '/transaksi/transaksi_pemasukan', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {
		// Method event untMenambahkan data secara asynchronous
		$('body').on('submit'+SPA_EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form
			form_tambah_data( this, function( response ) {
				load_table_active();
			});

		});
	});
});
//https://url_app_fe/transaksi/transaksi_pengeluaran
ROUTE.add( '/transaksi/transaksi_pengeluaran', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {
		// Method event untMenambahkan data secara asynchronous
		$('body').on('submit'+SPA_EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form
			form_tambah_data( this, function( response ) {
				load_table_active();
			});

		});
	});
});
//https://url_app_fe/transaksi/transaksi_pembayaran
ROUTE.add( '/transaksi/transaksi_pembayaran', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {
		// Method event untMenambahkan data secara asynchronous
		$('body').on('submit'+SPA_EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form
			form_tambah_data( this, function( response ) {
				load_table_active();
			});

		});
	});
});




//==================== MODUL TEKNISI ===================
//https://url_app_fe/teknisi/dashboard
ROUTE.add( '/teknisi/dashboard', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa );
});
//https://url_app_fe/teknisi/project
ROUTE.add( '/teknisi/project/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function( responseText, statusText, xhr ) {
		// Method event untMenambahkan data secara asynchronous
		$('body').on('submit'+SPA_EVENT_NAMESPACE , '#modal_tambah form', function(e) {
			e.preventDefault(); //Menghentikan laju fungsi submit pada form

			form_tambah_data( this, function( response ) {
				load_table_active();
			});
		});
	});
});
//https://url_app_fe/teknisi/monitoring
ROUTE.add( '/teknisi/monitoring/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function() {	

		$('body').on('submit'+SPA_EVENT_NAMESPACE, '#form_monitoring', function(e) {
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
ROUTE.add( '/user/dashboard/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa );
});
//https://url_app_fe/user/profile
ROUTE.add( '/user/profile/', function( RouteObj ){
	LOAD_PAGE_SPA( RouteObj.route_spa, function() {
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
ROUTE.add( '/user/project/', function(RouteObj) {
	LOAD_PAGE_SPA( RouteObj.route_spa );
});
//https://url_app_fe/user/tambah_project
ROUTE.add( '/user/tambah_project/', function( RouteObj ) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function() {
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
		$('body').on('click'+SPA_EVENT_NAMESPACE, '.btn_ambil_lokasi', function() {

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
		$('body').on('submit'+SPA_EVENT_NAMESPACE, '#form_tambah_project', function(e) {

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
				// loader_page( 'show',  loader_tambah_project, "Membuat Project Baru ......");
				form_tambah_data( this, function( response ) {
					load_page( "/user/project"); 
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
		$('body').on('click'+SPA_EVENT_NAMESPACE, '.btn_pilih_teknisi', function() {
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
		$('body').on('click'+SPA_EVENT_NAMESPACE, '.btn_back_form', function() {
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
ROUTE.add( '/user/monitoring/', function(RouteObj) {
	LOAD_PAGE_SPA( RouteObj.route_spa, function() {

		$('body').on('submit'+SPA_EVENT_NAMESPACE, '#form_monitoring', function(e) {

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







