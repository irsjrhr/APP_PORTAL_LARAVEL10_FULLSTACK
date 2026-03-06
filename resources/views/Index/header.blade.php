
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
	<div class="container_page">
		<!-- Row page -->
		<div class="row_page" style="display:flex">
			<!-- Sidebar -->
			<div class="col_sidebar">
				<div class="sidebar">
					<button class="btn btn-default btn_close">
						<i class="fas fa-times"></i>
					</button>

					{{-- container modul menu --}}
					<div class="container-fluid container_modul_menu">
						{{-- Loop data sidebar - modul menu --}}
						@foreach ($data_sidebar as $row_sidebar)
						@php
						$jenis_modul = $row_sidebar['jenis_modul'];
						@endphp

						@if ( $jenis_modul == "MODUL" )
						{{-- JIKA JENIS MODUL NYA MODUL --}}
						{{-- Row Modul --}}
						@php
						$nama_modul = $row_sidebar['nama_modul'];
						$data_modul_menu = $row_sidebar['data_modul_menu'];
						@endphp
						<div class="row_modul link_modul">
							{{-- row modul header --}}
							<div class="row row_modul_header mb-2">
								<div class="col-1 menu_logo">
									<i class="{{ $row_sidebar['icon'] }} icon_modul"></i>
								</div>
								<div class="col menu_text">
									{{$nama_modul}}
									<span class="icon_indicator">
										<i class="fas fa-chevron-right"></i>
									</span>
								</div>
							</div>
							{{-- end of row modul header --}}

							{{-- row container menu --}}
							<div class="row row_container_menu">
								{{-- Col Container Menu --}}
								<div class="col-12 col_container_menu">
									{{-- Loop Row Menu --}}
									@foreach ($data_modul_menu as $row_menu)
									{{-- Row Menu - Link Menu --}}
									<div class="row row_menu link_menu" data-page="{{ $row_menu['url'] }}">
										<div class="col-1 menu_logo">
											<i class="{{ $row_menu['icon'] }}"></i>
										</div>
										<div class="col menu_text">
											{{ $row_menu['menu'] }}
										</div>
									</div>
									{{-- End Of Row Menu - Link Menu --}}
									@endforeach
									{{-- End Of Loop Row Menu --}}
								</div>
								{{-- End Of Col Container Menu --}}
							</div>
							{{-- end of row container menu --}}
						</div>
						{{-- End Of Row Modul --}}
						{{-- END OF JIKA JENIS MODUL NYA MODUL --}}

						@elseif ( $jenis_modul = "MENU" )
						{{-- JIKA JENIS MODUL NYA MENU --}}
						{{-- Row Menu - Link Menu --}}
						@php
						$row_menu = $row_sidebar;
						@endphp
						<div class="row row_menu link_menu" data-page="{{ $row_menu['url'] }}">
							<div class="col-1 menu_logo">
								<i class="{{ $row_menu['icon'] }}"></i>
							</div>
							<div class="col menu_text">
								{{ $row_menu['menu'] }}
							</div>
						</div>
						{{-- End Of Row Menu - Link Menu --}}
						{{-- JIKA JENIS MODUL NYA MENU --}}
						@endif

						@endforeach
						{{-- End Of Loop data sidebar  --}}

					</div>
					{{-- end of container modul menu --}}

				</div>
			</div>
			<!-- End Of Sidebar -->
			<!-- Content -->
			<div class="content">

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
