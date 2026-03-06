//Script TERHUBUNGAN DENGAN FUNGSI PADA api.js untuk melakukan request data dan admin_table.js untuk melakukan load DOM table terkait data yang di load
//Di script ini semuanya berhubungan dengan data di URL_SERVICE_BE
var LOAD_PAGE_URL;


$(document).ready(function() {
	// ======================== ADMIN EVENT TRIGER ========================================
	
	$('body').on('click', '.btn_opt', function(e) {
		trace();

		btn_opt_toggle( $(this) );
	});
	$('body').on('click', '.menu_opt .close_opt', function(e) {
		trace();


		var close_opt = $(this);
		var menu_opt = close_opt.parents('.menu_opt');
		menu_opt_hide( menu_opt );
	});
	$('body').on('click', '.btn_video', function(e) {
		trace();


		var btn = $(this);
		var data_url = btn.attr('data-url'); //Ambil data source video dari button
		var modal_video = $('#modal_video');
		var video = modal_video.find('video');
		var video_src = video.find('source');

		//Update src
		video_src.attr('src',  data_url );
		//Muat ulamg DOM Videonya dengan source terbaru
		video[0].load();

	});	
	//++++++++++ Asynchronous ++++++++++++++++
	//Event .btn_load untuk melakukan load data ke tabel yang ada di main_container pada page yang sedang aktif atau dimuat
	$('.main_container').on('click', '.btn_load', function() {
		trace();

		// Melakukan load table pada section_content yang sedang aktif berdasarkan data-fungsi 
		load_table_active();
	});
	
	//+++++++++++++++++ Method Event Terkait Account ++++++++++++
	//Event pemindahan data ke modal form update dari tabel row data yang dipilih
	var by_update_state = false;
	$('body').on('click', '.section_content[data-fungsi=account] .update_data', function() {

		//Ambil data row json di tr parentnya  
		var section_content = $('.section_content[data-fungsi=account]');
		var link_update_data = $( this );
		var tr = link_update_data.parents( 'tr' );
		var data_row_json = tr.attr('data-row');
		data_row_json = cv_json_obj( data_row_json );
		var modal_update_profile = section_content.find('#modal_update_profile');

		by_update_state =  data_row_json.user;

		//Isi input data diri
		modal_update_profile.find('[name=nama]').val(data_row_json.nama);
		modal_update_profile.find('[name=email]').val(data_row_json.email);
		modal_update_profile.find('[name=alamat]').val(data_row_json.alamat);

		//Isi id file dan source file 
		modal_update_profile.find('#nama_file').text("NONE");
		modal_update_profile.find('[name=id_file]').val(data_row_json.id_file_profile);
		modal_update_profile.find('[name=source_file]').val(data_row_json.source_file_profile);

		modal_update_profile.modal('show');
	});
	//Event update submit form profile account
	$('body').on('submit', '#modal_update_profile form', function(e) {
		e.preventDefault(); //Menghentikan laju fungsi submit pada form
		var form = $(this);
		var modal_target = form.parents('.modal');
		var data_post = form.serialize();
		var url_endpoint = URL_SERVICE_BE + "account";
		var data_param_url = `?by_user=${by_update_state}`;
		loader_page('show', null);
		post_update_data( url_endpoint, data_param_url, data_post, function( response ) {
			loader_page('hide', null);
			console.log(response);
			var msg = response.msg;
			Swal.fire( msg );
			modal_target.modal('hide');
			load_table_active();
		} );
	});
	//+++++++++++++++++ EN Of Method Event Terkait Account ++++++++++++


});


function btn_opt_toggle( obj ) {
	trace();

	var btn_opt = $( obj );
	var td = btn_opt.parents('td');
	var menu_opt = td.find('.menu_opt');
	menu_opt.show( function() {
		$('html').bind('click', function(e) {
			var target = $(e.target);
			var obj_is_menu = target.is('.menu_opt');
			if ( obj_is_menu == false ) {
				//Jika yang di klik bukan area dalam menu yang sedang di buka, maka tutup menu ini 
				menu_opt_hide( menu_opt );

			}
		});				
	});
}
function menu_opt_hide( menu_opt ) {
	trace();

	menu_opt.hide();
	$('html').unbind('click');
}


// +++++++++++ Asynchronous Method 
function animasi_loadPage( param = "show", animasi_loadPageElInput = "", text_load = "Memuat data ....", callback = false ) {
	trace();


	console.log("Animasi load page", param);
	var animasi_loadPageEl = $(animasi_loadPageElInput);
	//Melakukan perubahan pada text load animasi 
	var text_loadEl = animasi_loadPageEl.find('.text_load');
	text_loadEl.html(text_load);

	//Menentukan hilang atau muncul
	switch( param ){
		case "show" :
		animasi_loadPageEl.show();
		break;

		case 'hide' :
		setTimeout(function() {
			animasi_loadPageEl.hide();
		}, 100);
		break;
	}
	if ( animasi_loadPageEl.length < 1 ) {
		console.log( "Tidak ada object animasi_loadPage dengan class", animasi_loadPageEl);
	}


	//Handling error arg untuk bentuk callback
	if ( callback == false ) {
		//buat menjadi fungsi kosong 
		callback = function( s ) {
			return false;
		} 
	}
	callback( animasi_loadPageEl );
}
function create_animasiLoadPageEl() {
	trace();

	//Ambil element yang sudah pernah ada di col content utama
	var col_content = $('.content');
	var animasi_loadPageEl = col_content.find('.animasi_loadPage').html();
	//Buat yang baru 
	var new_animasi_loadPage = `
	<!-- Elemen ini ditambahkan oleh fungsi create_animasiLoadPageEl() pada saat load page berlangsung dan berhasil -->
	<div class='animasi_loadPage'>
	${ animasi_loadPageEl } </div>
	<!-- Elemen ini ditambahkan oleh fungsi create_animasiLoadPageEl() pada saat load page berlangsung dan berhasil -->
	`;
	//Tambahkan ke section content di page yang di load atau yang sedang aktif pada div parent table_data
	var table_data = $('.table_data');
	var parent_table = table_data.parent('div');
	parent_table.prepend( new_animasi_loadPage );

}













function open_modal_pembayaran( src ) {
	trace();


	function loader_pembayaran( param_visible = "hide", caption = "...."  ) {
		var loader_pembayaran = $('.loader_pembayaran');
		loader_page( param_visible, loader_pembayaran, caption );
	}
	var modal_pembayaran = $('#modal_pembayaran');
	var caption_source = modal_pembayaran.find('#caption_source');
	var source_url = caption_source.find('.source_url');
	var container_modal_view = modal_pembayaran.find('.container_modal_view');
	var btn_download = modal_pembayaran.find('.btn_download');
	var midtrans_view = container_modal_view.find('#midtrans_view');
	modal_pembayaran.modal('show');
	source_url.text( src );
	btn_download.attr('data-href', src);
	loader_pembayaran('show', 'Harap Tunggu.....');

	//MENAMPILKAN IFRAME DALAM IFRAME AGARR TIDAK TERKENA EFEK REDIRECT DARI MIDTRANS CALLBACK
	// Jadi Di Modal kita melakukan iframe ke method route admin/embed_midtrans/{url}. Kemudian di method tersebut dia akan melakukan iframe lagi dengan halaman full daari url yang kita passing pada parameter routenya 
	// src = BASE_URL_PAGE +'admin/embed_midtrans/'+src ;
	// ==== Midtrans Iframe Snap ==== 
	midtrans_view.attr("src", src);
	loader_pembayaran('hide');
}


//Melakukan Debug Untuk Setiap Fungsi Yang Berjalan Pada FE 
// variabel DEBUG_CONSOLE_TRACE ada di api.js dan kalo nilainya false maka debug fungsi ini akan berjalan. Jika true debug fungsi ini tidak akan berjalan
function trace(label = "", data = null, callback = false) {

	// Handling callback
	if (callback == false) {
		callback = function() {
			return false;
		};
	}

	//Handling Debug
	if ( DEBUG_CONSOLE_TRACE == false ) {
		return false;
	}

	// Ambil stack trace
	const stack = new Error().stack;
	const stackLines = stack.split('\n');

	// Cari informasi caller (line ke-3 di stack)
	let callerInfo = "Unknown";
	let fileInfo = "Unknown";
	let functionName = "anonymous";

	if (stackLines.length >= 4) {
		const callerLine = stackLines[3].trim();

		// Ekstrak informasi fungsi dan file
		// Format: "at functionName (file:///path/to/file.js:10:20)"
		const funcMatch = callerLine.match(/at\s+([^\s(]+)/);
		if (funcMatch && funcMatch[1] !== "trace") {
			functionName = funcMatch[1];
		}

		// Ekstrak file path dan line number
		const fileMatch = callerLine.match(/\((.*):(\d+):(\d+)\)/);
		if (fileMatch) {
			const fullPath = fileMatch[1];
			// Ambil hanya nama file
			const fileName = fullPath.split('/').pop() || fullPath.split('\\').pop() || fullPath;
			const line = fileMatch[2];
			fileInfo = `${fileName}:${line}`;
		} else {
			// Format alternatif (tanpa parentheses)
			fileInfo = callerLine.replace('at ', '');
		}

		callerInfo = `${functionName} @ ${fileInfo}`;
	}

	// Header dengan informasi caller
	console.log(
		`%c =====TRACE%c ${label} %c| ${callerInfo}`,
		'background:#222;color:#00e676;font-weight:bold;padding:2px 6px;border-radius:4px 0 0 4px;',
		'color:#999;background:#333;padding:2px 8px;',
		'color:#aaa;font-size:11px;font-style:italic;padding:2px 8px;border-radius:0 4px 4px 0;'
		);

	// Data
	if (data !== null) {
		console.log(
			'%cDATA',
			'color:#03a9f4;font-weight:bold;',
			data
			);
	}

	// Stack trace dengan highlight
	console.log(
		'%cSTACK TRACE',
		'color:#ff5252;font-weight:bold;margin-top:8px;display:block;'
		);

	// Format stack trace agar lebih rapi
	const formattedStack = stackLines
	.slice(2, 8) // Ambil 6 baris mulai dari index 2
	.map((line, index) => {
		const trimmed = line.trim();

		// Highlight baris caller (index 1)
		if (index === 1) {
			return `%c▶ ${trimmed}`;
		}

		return `  ${trimmed}`;
	})
	.join('\n');

	// Print stack trace dengan styling
	console.log(
		formattedStack,
		'color:#00e676;font-weight:bold;' // Style untuk baris caller
		);

	// Separator
	console.log('%c' + '─'.repeat(60), 'color:#444;font-size:10px;');

	// Eksekusi callback
	return callback();
}

function cv_decimal(num, decimals = 2) {
	const factor = Math.pow(10, decimals);
	return Math.round((num + Number.EPSILON) * factor) / factor;
}