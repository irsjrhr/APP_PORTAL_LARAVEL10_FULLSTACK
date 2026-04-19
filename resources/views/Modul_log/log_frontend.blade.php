
<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/log.css">

<section class="section_content">
	<div class="header_page">
		<h1>
			Log Front End
		</h1>
	</div>

	<div class="container-fluid">
		<div class="row mb-4">
			<!-- Box Dashboard -->
			<div class="col-md-5 box_dashboard">
				<div class="card">
					<i class="fas fa-info logo_back"></i>
					<h2 class="banyak_data"> 0 </h2>
					<h3> Log </h3>
				</div>
			</div>
			<!-- End Of Box Dashboard -->
		</div>


		<div class="row">
			<div class="col-12">

				<div class="table_data_container">
					<div class="container_option">

						<form class="form_filterLog" id="form_filterLog">
							<div class="filter_section">
								<div class="form-group">
									<label> Start Time </label>
									<select class="form-control" name="startTime">
									</select>
								</div>
								<div class="form-group">
									<label> End Time </label>
									<select class="form-control" name="endTime">
									</select>
								</div>
								<div class="form-group">
									<label> Type Log </label>
									<select class="form-control" name="logType">
										<option value="" class="all"> All </option>
									</select>
								</div>
								<div class="form-group">
									<label> File Log </label>
									<select class="form-control" name="logFile">
										<option value="" class="all"> All </option>
									</select>
								</div>
								<div class="form-group">
									<button class="btn btn-primary">
										<i class="fas fa-filter"></i>
										Apply Data
									</button>
								</div>
								<div class="form-group">
									<button class="btn btn-danger" id="btn_delete_allData">
										<i class="fas fa-trash"></i>
										Reset Data
									</button>
								</div>
								<div class="form-group">
									<button class="btn btn-warning" id="btn_generate_dummy">
										<i class="fas fa-pen"></i>
										Generate Data Log Dummy
									</button>
								</div>


							</div>

						</form>
					</div>
					<table class="table table_data" id="table_logData">
						<thead>
							<tr class="row_header">
								<th> <i class="fas fa-cog"></i> </th>
								<th>Time</th>
								<th>Type</th>
								<th>Message</th>
								<th>Context</th>
								<th>File</th>
								<th>Line</th>
								<th>URL</th>
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


					<form action="{{env('URL_SERVICE_BE') . "laporan/post_tambah_data"}}" method="post">

						<div class="form-group">
							<label> Name : </label>
							<input autosave type="text" name="nama" class="form-control" required placeholder="Your Name">
						</div>

						<div class="form-group">
							<label> User : </label>
							<input autosave type="text" name="user" class="form-control" required>
						</div>

						<div class="form-group">
							<label> Email : </label>
							<input autosave type="text" name="email" class="form-control" required placeholder="Your Email">
						</div>

						<div class="form-group">
							<label> Input Select </label>
							<select class="form-control" name="level">
								<!-- Ini akan ditambahkan dengan jvascript -->
							</select>
						</div>

						<div class="form-group">
							<button type="submit" name="submit" class="btn btn-success form-control">
								Submit
							</button>
						</div>
					</form>

				</div>
			</div>
		</div>
	</div>

</section>


<script type="text/javascript" src="{{asset('')}}asset/js/panel_spa/log_page.js"></script>

