
<section class="section_content">
	<div class="header_page">
		<h1>
			Atur Project
		</h1>
	</div>

	<div class="container-fluid">
		<div class="row mb-4">
			<!-- Box Dashboard -->
			<div class="col-md-5 box_dashboard">
				<div class="card">
					<i class="fas fa-info logo_back"></i>
					<h2 class="banyak_data"> 0 </h2>
					<h3> Project </h3>
				</div>
			</div>
			<!-- End Of Box Dashboard -->
		</div>


		<div class="row">
			<div class="col-12">
				<div class="table_data_container" data-fungsi="project" data-api-endpoint="{{ env('URL_SERVICE_BE') . "project" }}">

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
								<table class="table table_data">
									<thead>
										<tr class="row_header">
											<th><i class="fas fa-cog"></i></th>
											<th>No</th>
											<th>ID Project</th>
											<th>ID Produk</th>
											<th>User Teknisi</th>
											<th>User Client</th>
											<th>Nama Project</th>
											<th>Deskripsi Project</th>
											<th>ID Dokumen Project</th>
											<th>Source Dokumen Project</th>
											<th>Longitude</th>
											<th>Latitude</th>
											<th>Waktu Mulai</th>
											<th>Waktu Selesai</th>
											<th>Status Project</th>
											<th>User Pembuat</th>
											<th>Waktu</th>
											<th>Status</th>
										</tr>
									</thead>

									<tbody>
										<!-- Data akan diisi melalui JS -->
									</tbody>
								</table>

							</tr>
						</thead>

						<tbody>
							<!-- Disi oleh ajax -->
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>



	<!-- Modal Tambah -->
	<div class="modal fade" id="modal_tambah" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Tambah Data</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					{{-- Container tambah project --}}
					<div class="container_tambah_project">

						<div class="loader_page loader_tambah_project"></div>

					</div>
					{{-- End Of Container tambah project --}}
				</div>
			</div>
		</div>
	</div>

</section>





