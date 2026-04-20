
{{-- GET AND SET ENV VALUE TO WINDOW VARIABEL  --}}
@php
$BASE_URL_PAGE = asset('');
$URL_SERVICE_BE = env('URL_SERVICE_BE');
$URL_SERVICE_FILE = env('URL_SERVICE_FILE');
$SPA_EVENT_NAMESPACE = env('SPA_EVENT_NAMESPACE');
$SPA_ROUTE_PREFIX_KEYWORD = env('SPA_ROUTE_PREFIX_KEYWORD');
@endphp


<script type="text/javascript">
    window.ENV = {
        BASE_URL_PAGE: @json($BASE_URL_PAGE),
        URL_SERVICE_CI: "BELUM DIISI",
        URL_SERVICE_BE: @json($URL_SERVICE_BE),
        URL_SERVICE_FILE: @json($URL_SERVICE_FILE),
        //KONFIG EVENT SPA
        SPA_EVENT_NAMESPACE : @json($SPA_EVENT_NAMESPACE),
        SPA_ROUTE_PREFIX_KEYWORD : @json($SPA_ROUTE_PREFIX_KEYWORD)
    };

</script>

@include('Index.header')
@include('template.alert_flasher')
{{-- Disi Oleh JS SPA di core.js load_page() --}}
@include('Index.footer')
@include('Index.modal_menu')
@include('File.modal_select_file')