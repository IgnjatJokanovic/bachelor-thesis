<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link  rel="stylesheet" href="{{ asset('css/app.css') }}" />
    <link rel="icon" href="img/favicon-32x32.png" sizes="32x32">

    @if (env('APP_ENV') === 'production')
    {{-- Insert Google Analytics, other tracking scripts here  --}}
    @endif

    <title>FoxBoock</title>
</head>

<body>
    @if (Route::has('login'))
    <div class="top-right links">
        @auth
        <a href="{{ url('/home') }}">Home</a>
        @else
        <a href="{{ route('login') }}">Login</a>

        @if (Route::has('register'))
        <a href="{{ route('register') }}">Register</a>
        @endif
        @endauth
    </div>
    @endif

    <div id="app"></div>


    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>