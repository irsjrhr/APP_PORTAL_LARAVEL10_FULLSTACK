
@php
$BASE_URL_PAGE = asset('');
$URL_SERVICE_BE = env('URL_SERVICE_BE');
@endphp

<script type="text/javascript">

    window.ENV = {
        BASE_URL_PAGE: @json($BASE_URL_PAGE),
        URL_SERVICE_CI: "sadad",
        URL_SERVICE_BE: @json($URL_SERVICE_BE)
    };

</script>

@include('Index.header')
@include('template.alert_flasher')
{{-- Disi Oleh JS SPA di core.js load_page() --}}
@include('Index.footer')
@include('Index.modal_menu')
@include('File.modal_select_file')