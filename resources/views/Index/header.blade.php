
<!doctype html>
	<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
		<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/style.css">
		<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/panel.css">
		<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/panel_admin.css">
		<title> Admin Panel </title>
	</head>
	<body>

		<style type="text/css">	
		.content .nav_header .col_left{
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.responsive_content{
			display: flex !important;
		}
		.link_menu .row_menu.active{
			background: #007bff;
		}
	</style>


	<header class="header_admin_page">
		<!-- Nav nav_header -->
		<nav class="nav_header not_inherit_sidebar">
			<div class="container-fluid">
				<div class="row">
					<!-- Col Left' -->
					<div class="col col_left">
						<div class="responsive_content">
							<div class="content">
								<div class="col_content">
									<span class="btn_sidebar">
										<i class="fas fa-bars"></i>
									</span>
								</div>
								<div class="col_content">
									<a href="{{asset('')}}">
										<img src="{{asset('')}}asset/gam/logo.png" class="logo_sidebar">
									</a>
								</div>
								<div class="col_content title_app">
									<h4> 
										FSM - Admin
									</h4>
								</div>
							</div>
						</div>
					</div>
					<!-- End Of Col Left' -->
					<!-- Col Right' -->
					{{-- INI AKAN DIUBAH OTOMATIS DI api.js --}}
					<div class="col col_right">
						<div class="box_profile" data-toggle="modal" data-target="#modal_menu">
							<img src="{{asset('')}}asset/gam/user.png" class="img_profile">
							<div class="info_profile">
								<div class="info_user text_flow_multi1">
									Nama Account
								</div>
								<div class="info_role">
									Level Account
								</div>
							</div>
						</div>
					</div>
					{{-- INI AKAN DIUBAH OTOMATIS DI api.js --}}
					<!-- End Of Col Right' -->

				</div>
			</div>
		</nav>
		<!-- End Of Nav nav_header -->

	</header>

	<!-- Container page -->
	<div class="container-fluid container_page">
		<!-- Row page -->
		<div class="row row_page">
			<!-- Sidebar -->
			<div class="col_sidebar">
				<div class="sidebar">
					<button class="btn btn-default btn_close">
						<i class="fas fa-times"></i>
					</button>

					{{-- container modul menu --}}
					<div class="container-fluid container_modul_menu">

						{{-- Row Menu - Link Menu --}}
						<div class="row row_menu link_menu" data-page="{{asset('dashboard')}}">
							<div class="col-1 menu_logo">
								<i class="fas fa-th-large"></i>
							</div>
							<div class="col menu_text">
								Dashboard
							</div>
						</div>
						
						{{--  Row Modul - Modul Account --}}
						<div class="row_modul link_modul">
							
							<div class="row row_modul_header mb-2">
								<div class="col-1 menu_logo">
									<i class="fas fa-folder-open icon_modul"></i>
								</div>
								<div class="col menu_text">
									Modul Account
									<span class="icon_indicator">
										<i class="fas fa-chevron-down"></i>
									</span>
								</div>
							</div>
							

							{{-- Row Container Menu - Loop Menu --}}
							<div class="row row_container_menu">
								{{-- Col Container Menu --}}
								<div class="col-12 col_container_menu">
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu active" data-page="{{asset('account/level')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-key"></i>
										</div>
										<div class="col menu_text">
											Atur Level
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('account/account')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-users"></i>
										</div>
										<div class="col menu_text">
											Atur Account
										</div>
									</div>



									{{--  Row Sub Modul --}}
									<div class="row_modul sub_modul link_modul">

										<div class="row row_modul_header mb-2">
											<div class="col-1 menu_logo">
												<i class="fas fa-folder-open icon_modul"></i>
											</div>
											<div class="col menu_text">
												Sub Modul
												<span class="icon_indicator">
													<i class="fas fa-chevron-down"></i>
												</span>
											</div>
										</div>

										{{-- Row Container Menu - Loop Menu --}}
										<div class="row row_container_menu">
											{{-- Col Container Menu --}}
											<div class="col-12 col_container_menu">

												{{-- Row Menu - Link Menu --}}
												<div class="row row_menu link_menu" data-page="{{asset('sub_modu/fitur')}}">
													<div class="col-1 menu_logo">
														<i class="fas fa-users"></i>
													</div>
													<div class="col menu_text">
														Fitur 1
													</div>
												</div>


											</div>

										</div>

									</div>
									{{--  End Of Sub Row Modul --}}

									{{--  Row Sub Modul --}}
									<div class="row_modul sub_modul link_modul">

										<div class="row row_modul_header mb-2">
											<div class="col-1 menu_logo">
												<i class="fas fa-folder-open icon_modul"></i>
											</div>
											<div class="col menu_text">
												Sub Modul 2
												<span class="icon_indicator">
													<i class="fas fa-chevron-down"></i>
												</span>
											</div>
										</div>

										{{-- Row Container Menu - Loop Menu --}}
										<div class="row row_container_menu">
											{{-- Col Container Menu --}}
											<div class="col-12 col_container_menu">

												{{-- Row Menu - Link Menu --}}
												<div class="row row_menu link_menu" data-page="{{asset('sub_modu/fitur')}}">
													<div class="col-1 menu_logo">
														<i class="fas fa-users"></i>
													</div>
													<div class="col menu_text">
														Fitur 1
													</div>
												</div>


											</div>

										</div>

									</div>
									{{--  End Of Sub Row Modul --}}

								</div>
								
							</div>
							
						</div>
						{{--  End Of Row Modul - Modul Account --}}

						{{--  Row Modul - Modul FSM --}}
						<div class="row_modul link_modul">
							
							<div class="row row_modul_header mb-2">
								<div class="col-1 menu_logo">
									<i class="fas fa-folder-open icon_modul"></i>
								</div>
								<div class="col menu_text">
									Modul FSM
									<span class="icon_indicator">
										<i class="fas fa-chevron-right"></i>
									</span>
								</div>
							</div>
							

							{{-- Row Container Menu - Loop Menu --}}
							<div class="row row_container_menu">
								{{-- Col Container Menu --}}
								<div class="col-12 col_container_menu">
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('fsm/teknisi')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-hard-hat"></i>
										</div>
										<div class="col menu_text">
											Atur Teknisi
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('fsm/produk')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-box"></i>
										</div>
										<div class="col menu_text">
											Atur Produk
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('fsm/project')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-tasks"></i>
										</div>
										<div class="col menu_text">
											Atur Project
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('fsm/laporan')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-file-alt"></i>
										</div>
										<div class="col menu_text">
											Atur Laporan
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('fsm/monitoring')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-tv"></i>
										</div>
										<div class="col menu_text">
											Monitoring
										</div>
									</div>


								</div>
								
							</div>
							
						</div>
						{{-- End Of Row Modul - Modul FSM --}}
						

						{{-- Row Modul - Modul Transaksi --}}
						<div class="row_modul link_modul">
							
							<div class="row row_modul_header mb-2">
								<div class="col-1 menu_logo">
									<i class="fas fa-folder-open icon_modul"></i>
								</div>
								<div class="col menu_text">
									Modul Transaksi
									<span class="icon_indicator">
										<i class="fas fa-chevron-right"></i>
									</span>
								</div>
							</div>
							

							{{-- Row Container Menu - Loop Menu --}}
							<div class="row row_container_menu">
								{{-- Col Container Menu --}}
								<div class="col-12 col_container_menu">
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('transaksi/transaksi_kategori')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-filter"></i>
										</div>
										<div class="col menu_text">
											Atur Transaksi Kategori
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('transaksi/transaksi_pemasukan')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-cash-register"></i>
										</div>
										<div class="col menu_text">
											Atur Pemasukan
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('transaksi/transaksi_pengeluaran')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-money-bill"></i>
										</div>
										<div class="col menu_text">
											Atur Pengeluaran
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('transaksi/transaksi_pembayaran')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-cash-register"></i>
										</div>
										<div class="col menu_text">
											Atur Pembayaran
										</div>
									</div>
									

								</div>
								
							</div>
							
						</div>
						{{-- End Of Row Modul - Modul Transaksi --}}
						

						{{-- Row Modul - Modul Teknisi --}}
						<div class="row_modul link_modul">
							
							<div class="row row_modul_header mb-2">
								<div class="col-1 menu_logo">
									<i class="fas fa-folder-open icon_modul"></i>
								</div>
								<div class="col menu_text">
									Modul Teknisi ( FSM )
									<span class="icon_indicator">
										<i class="fas fa-chevron-right"></i>
									</span>
								</div>
							</div>
							

							{{-- Row Container Menu - Loop Menu --}}
							<div class="row row_container_menu">
								{{-- Col Container Menu --}}
								<div class="col-12 col_container_menu">
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('teknisi/dashboard')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-tachometer-alt"></i>
										</div>
										<div class="col menu_text">
											Dashboard
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('teknisi/project')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-clipboard-list"></i>
										</div>
										<div class="col menu_text">
											List Project
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('teknisi/monitoring')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-map-marked-alt"></i>
										</div>
										<div class="col menu_text">
											Monitoring Project
										</div>
									</div>
									

								</div>
								
							</div>
							
						</div>
						{{-- End Of Row Modul - Modul Teknisi --}}

						{{-- Row Modul - Modul User --}}
						<div class="row_modul link_modul">
							
							<div class="row row_modul_header mb-2">
								<div class="col-1 menu_logo">
									<i class="fas fa-folder-open icon_modul"></i>
								</div>
								<div class="col menu_text">
									Modul User ( FSM )
									<span class="icon_indicator">
										<i class="fas fa-chevron-right"></i>
									</span>
								</div>
							</div>
							

							{{-- Row Container Menu - Loop Menu --}}
							<div class="row row_container_menu">
								{{-- Col Container Menu --}}
								<div class="col-12 col_container_menu">
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('user/dashboard')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-tachometer-alt"></i>
										</div>
										<div class="col menu_text">
											Dashboard
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('user/project')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-clipboard-list"></i>
										</div>
										<div class="col menu_text">
											List Project
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('user/tambah_project')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-plus-circle"></i>
										</div>
										<div class="col menu_text">
											Tambah Project
										</div>
									</div>
									
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{asset('user/monitoring')}}">
										<div class="col-1 menu_logo">
											<i class="fas fa-eye"></i>
										</div>
										<div class="col menu_text">
											Monitoring Project
										</div>
									</div>






									

								</div>
								
							</div>
							
						</div>
						{{-- End Of Row Modul - Modul User --}}

					</div>
					{{-- end of container modul menu --}}

				</div>
			</div>
			<!-- End Of Sidebar -->
			<!-- Content -->
			<div class="col content">

				<!-- Load animasi - akan muncul dan menghilang sesuai dengan perilaku load_page  -->
				<div class="animasi_loadPage">
					<div class="content_load">
						<div class="container-fluid">
							<div class="row">
								<div class="col-12">
									<img src="{{asset('')}}asset/gam/load.gif">
									<p class="text_load">
										<!-- Diisi oleh js  -->
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- End Of Load animasi - akan muncul dan menghilang sesuai dengan perilaku load_page  -->


				<main class="main_container"> 
					<!-- Di Load Ajax di admin.js -->
