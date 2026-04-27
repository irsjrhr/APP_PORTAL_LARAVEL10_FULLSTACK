<section class="section_content" data-fungsi="transaksi_kategori">
	<!-- Main content -->

	<div class="header_page">
		<h1>
			Atur Transaksi Kategori
		</h1>
	</div>

	<div class="container-fluid">
		<div class="row mb-4">
			<!-- Box Dashboard -->
			<div class="col-md-5 box_dashboard">
				<div class="card">
					<i class="fas fa-info logo_back"></i>
					<h2 class="banyak_data"> 0 </h2>
					<h3> Transaksi Kategori </h3>
				</div>
			</div>
			<!-- End Of Box Dashboard -->
		</div>

		<div class="row">
			<div class="col-12">

				<div class="table_data_container" data-fungsi="transaksi_kategori" data-api-endpoint="{{ env('URL_SERVICE_BE') . "transaksi_kategori"}}">
					

					{{-- Container Option - Flex Child --}}
					<div class="container_option">
						{{-- Item Option --}}
						<div class="item_option">
							<div class="item_option_flex">
								<button class="btn btn-primary btn_load mr-2">
									<i class="fas fa-recycle"></i>
								</button>
								<button class="btn btn-default btn_tambah_data" data-toggle="modal" data-target="#modal_tambah">
									<i class="fas fa-plus"></i>
								</button>
								<!-- 							<button class="btn btn-warning btn_filter">
									<i class="fas fa-filter"></i>
								</button> -->
							</div>
						</div>
						{{-- Item Option --}}
						<div class="item_option">
							<form id="form_search">
								<div class="item_option_flex">
									<div class="form-group">
										<input type="text" class="form-control" name="search_keyword" placeholder="By User, Email, Nama">
									</div>
									<div class="form-group">
										<button class="btn btn-secondary btn_submit_opt">
											<i class="fas fa-search"></i>
										</button>
									</div>
								</div>	
							</form>
						</div>

						{{-- Item Option --}}
						<div class="item_option">
							<form class="form_filter" id="form_filter_status">
								<div class="item_option_flex">
									<div class="form-group">
										<select class="form-control" name="filter_keyword">
											<option value="active"> Active </option>
											<option value="disabled"> Disabled </option>
										</select>
									</div>
									<div class="form-group">
										<button class="btn btn-warning btn_filter btn_submit_opt">
											<i class="fas fa-filter"></i>
										</button>
									</div>
								</div>
							</form>
						</div>
						
					</div>			
					{{-- End Of Container Option --}}

					<table class="table table_data">

						<thead>
							<tr class="row_header">
								<td> <i class="fas fa-cog"></i> </td>
								<th> No </th>
								<th> ID </th>
								<th> User Admin </th>
								<th> Nama Transaksi Kategori </th>
								<th> Deskripsi  </th>
								<th> Waktu </th>
								<th> Status </th>
							</tr>
						</thead>
						<tbody>
							<!-- Ditambahakam oleh jquery berdarsarkan data loadnya  -->
						</tbody>

					</table>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Tambah -->
	<div class="modal fade" id="modal_tambah" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel"> Form Tambah Data </h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form method="post" action="{{env('URL_SERVICE_BE') . "transaksi_kategori/post_tambah_data"}}">
						<div class="form-group">
							<label> Nama Transaksi Kategori : </label>
							<input autosave type="text" name="nama_transaksi_kategori" class="form-control" required placeholder="Nama Transaksi Kategori">
						</div>
						<div class="form-group">
							<label> Deskripsi : </label>
							<textarea class="form-control" name="deskripsi_transaksi_kategori"></textarea>
						</div>

						<div class="form-group">
							<button name="submit" type="submit" class="form-control btn btn-success">
								SUBMIT
							</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>

	<!-- Modal Update -->
	<div class="modal fade" id="modal_update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel"> Form Update Data </h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form method="post" action="transaksi_kategori">
						<div class="form-group">
							<label> Nama Transaksi Kategori : </label>
							<input autosave type="text" name="nama_transaksi_kategori" class="form-control" required placeholder="Nama Transaksi Kategori">
						</div>
						<div class="form-group">
							<label> Deskripsi : </label>
							<textarea class="form-control" name="deskripsi_transaksi_kategori"></textarea>
						</div>

						<div class="form-group">
							<button name="submit" type="submit" class="form-control btn btn-success">
								SUBMIT
							</button>
						</div>

					</form>

				</div>

			</div>
		</div>
	</div>

	<!-- End Of Main content -->

</section>