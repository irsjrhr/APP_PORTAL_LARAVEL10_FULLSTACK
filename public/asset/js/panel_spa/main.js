$(document).ready(function(){
	//Membuka halaman pertama dari menu yang paling awal yaitu dashboard 
	var link_menu_first = $('.sidebar').find('.link_menu').first();
	var data_page = link_menu_first.attr('data-page');
	load_page( BASE_URL_PAGE + "dashboard", function() {

	});	
	
	// Method event untMenambahkan data secara asynchronous
	$('body').on('submit', '#modal_tambah form', function(e) {
		e.preventDefault(); //Menghentikan laju fungsi submit pada form

		var form = $(this);
		var form_data = form.serialize();
		var action = form.attr('action');
		post_dataForm( action, form_data, function( response ) {
			console.log(response);
			var msg = response.msg;
			Swal.fire( msg );
			//Refresh data di table load 
			load_table_active();
		});
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
})