<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link  rel="stylesheet" href="{{ asset('css/app.css') }}" />
    <link rel="icon" href="img/favicon-32x32.png" sizes="32x32">
    <link rel="stylesheet" rel="preload"  href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
        integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
     
  

    <title>FoxBook</title>
</head>

<body>

    <div id="app"></div>


    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>