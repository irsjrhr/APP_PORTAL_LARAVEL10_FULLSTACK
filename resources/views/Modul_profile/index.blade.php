<style type="text/css">
	.btn_corner{
		color: #fff;
		font-size: 30px;
	}
</style>


<link rel="stylesheet" type="text/css" href="{{ asset('') }}asset/css/profile.css">

<section class="section_content" data-fungsi="profile">
	<div class="header_page">
		<h1>
			Profile
		</h1>
	</div>


	<div class="container-fluid">

		{{-- Row Thumbnail --}}
		<div class="row row_cover pb-5" id="row_thumbnail">

			<div class="col-12 container_thumbnail">
				<div class="img_thumbnail">
				</div>
				<div class="col_profile">
					<img src="{{asset('')}}asset/gam/user.png">
				</div>
				<button class="btn btn-default btn_edit_profile" data-target="#modal_update_profile" data-toggle="modal">
					<i class="fas fa-pen"></i>
				</button>
			</div>

			<div class="col-12 container_profile_information">
				<h4 class="fw-bold mb-0">
					Irshandy Juniar Hardadi 
				</h4>
				<p class="mb-0">
					<span id="detail_label"> Regional Manager </span>
					-
					<span id="detail_label"> RMM </span>
				</p>
				<small class="text-muted">
					Territory: <span id="detail_territory"> BANDUNG SELATAN ( D3220 ) </span> |
					Regional : <span id="detail_ordertype"> Region 2 </span>
				</small>
			</div>


		</div>
		{{-- End Of Row Thumbnail --}}


		{{-- Row Personal Information --}}
		<div class="row row_modal_profile row_cover" id="row_personalInformation">
			<div class="col-12 col_header">
				<h4 class="fw-bold mb-0">
					Personal Information                                
				</h4>
			</div>


			<div class="col-md-4 col_card_info">
				<div class="card">
					<div class="card-body d-flex align-items-center">
						<div class="icon_profile bg-primary text-white">
							<i class="fas fa-id-card"></i>
						</div>
						<div>
							<small class="text-muted d-block">NIK</small>
							<div class="fw-semibold">12345678</div>
						</div>
					</div>
				</div>
			</div>


			<div class="col-md-4 col_card_info">
				<div class="card">
					<div class="card-body d-flex align-items-center">
						<div class="icon_profile bg-info text-white">
							<i class="fas fa-user"></i>
						</div>
						<div>
							<small class="text-muted d-block">Personal</small>
							<div class="fw-semibold">
								Laki-laki 
								• Tidak Kawin
							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="col-md-4 col_card_info">
				<div class="card">
					<div class="card-body d-flex align-items-center">
						<div class="icon_profile bg-secondary text-white">
							<i class="fas fa-calendar"></i>
						</div>
						<div>
							<small class="text-muted d-block">Tanggal Lahir</small>
							<div class="fw-semibold">

							</div>
						</div>
					</div>
				</div>
			</div>



			<div class="col-md-4 col_card_info">
				<div class="card">
					<div class="card-body d-flex align-items-center">
						<div class="icon_profile bg-warning text-white">
							<i class="fas fa-phone"></i>
						</div>
						<div>
							<small class="text-muted d-block">Kontak</small>
							<div class="fw-semibold">
								0123456789
							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="col-md-4 col_card_info">
				<div class="card">
					<div class="card-body d-flex align-items-center">
						<div class="icon_profile bg-dark text-white">
							<i class="fas fa-calendar-check"></i>
						</div>
						<div>
							<small class="text-muted d-block">Tanggal Masuk</small>
							<div class="fw-semibold">
								23 Dec 2025
							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="col-md-4 col_card_info">
				<div class="card">
					<div class="card-body d-flex align-items-center">
						<div class="icon_profile bg-success text-white">
							<i class="fas fa-user-check"></i>
						</div>
						<div>
							<small class="text-muted d-block">Status</small>
							<div class="fw-semibold text-success">
								Aktif
							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="col-md-4 col_card_info">
				<div class="card">
					<div class="card-body d-flex align-items-center">
						<div class="icon_profile bg-info text-white">
							<i class="fas fa-graduation-cap"></i>
						</div>
						<div>
							<small class="text-muted d-block">Pendidikan</small>
							<div class="fw-semibold">
								S1
							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="col-md-4 col_card_info">
				<div class="card">
					<div class="card-body d-flex align-items-center">
						<div class="icon_profile bg-secondary text-white">
							<i class="fas fa-id-card-alt"></i>
						</div>
						<div>
							<small class="text-muted d-block">No KTP</small>
							<div class="fw-semibold">
								-
							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="col-md-4 col_card_info">
				<div class="card">
					<div class="card-body d-flex align-items-start">
						<div class="icon_profile bg-dark text-white">
							<i class="fas fa-map-marker-alt"></i>
						</div>
						<div>
							<small class="text-muted d-block">Alamat</small>
							<div class="fw-semibold">
								Rumah
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
		{{-- End Of Row Personal Information --}}


	</div>


	<div class="modal fade" id="modal_update_profile" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Update Profile</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">


					<form class="form_file_upload" action="account" method="post">

						<div class="form-group">
							<label> Nama Lengkap : </label>
							<input autosave type="text" name="nama" class="form-control" required placeholder="Your Name">
						</div>

						<div class="form-group">
							<label> Email : </label>
							<input autosave type="text" name="email" class="form-control" required placeholder="Your Email">
						</div>

						<div class="form-group">
							<label> Alamat : </label>
							<textarea autosave type="text" name="alamat" class="form-control" required>
							</textarea>
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



