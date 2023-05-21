<?php
use App\Models\Cart;
?>
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
        crossorigin="anonymous" />
    <!-- Styles -->
    <!-- site Favicon -->
    <link rel="icon" href="{{ asset('assets/images/favicon/favicon.png') }}" sizes="32x32" />
    <link rel="apple-touch-icon" href="{{ asset('assets/images/favicon/favicon.png') }}" />
    <meta name="msapplication-TileImage" content="{{ asset('assets/images/favicon/favicon.png') }}" />

    <!-- css Icon Font -->
    <link rel="stylesheet" href="{{ asset('assets/css/vendor/ecicons.min.css') }}" />

    <!-- css All Plugins Files -->
    <link rel="stylesheet" href="{{ asset('assets/css/plugins/animate.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/plugins/swiper-bundle.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/plugins/jquery-ui.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/plugins/countdownTimer.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/plugins/slick.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/plugins/bootstrap.css') }}" />

    <!-- Main Style -->
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/responsive.css') }}" />
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app">

        <!-- Header start  -->
        <header class="ec-header">
            <!--Ec Header Top Start -->
            <div class="header-top">
                <div class="container">
                    <div class="row align-items-center">
                        <!-- Header Top phone Start -->
                        <div class="col header-top-left">
                            <div class="header-top-call">
                                <i class="fi-rr-phone-call"></i> Phone:
                                <a href="tel:+212697361122"> +212697361122</a>
                            </div>
                        </div>
                        <!-- Header Top phone End -->
                        <!-- Header Top call Start -->
                        <div class="col header-top-center">
                            <div class="header-top-call">
                                Order online or call us +212697361122
                            </div>
                        </div>
                        <!-- Header Top call End -->
                        <!-- Header Top Language Currency -->
                        <div class="col header-top-right d-none d-lg-block">
                            <div class="header-top-right-inner d-flex justify-content-end">


                                <!-- Social Start -->
                                <div class="header-top-social">
                                    <ul class="mb-0">
                                        <li class="list-inline-item"><a href="#"><i
                                                    class="ecicon eci-facebook"></i></a>
                                        </li>
                                        <li class="list-inline-item"><a href="#"><i
                                                    class="ecicon eci-twitter"></i></a></li>
                                        <li class="list-inline-item"><a href="#"><i
                                                    class="ecicon eci-instagram"></i></a>
                                        </li>
                                        <li class="list-inline-item"><a href="#"><i
                                                    class="ecicon eci-linkedin"></i></a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- Social End -->
                            </div>
                        </div>
                        <!-- Header Top Language Currency -->
                        <!-- Header Top responsive Action -->
                        <div class="col header-top-res d-lg-none">
                            <div class="ec-header-bottons">
                                <!-- Header User Start -->
                                <div class="ec-header-user dropdown">
                                    <button class="dropdown-toggle" data-bs-toggle="dropdown"><i
                                            class="fi-rr-user"></i></button>
                                    <ul class="dropdown-menu dropdown-menu-right">
                                        <li><a class="dropdown-item" href="register.html">Register</a></li>
                                        <li><a class="dropdown-item" href="checkout.html">Checkout</a></li>
                                        <li><a class="dropdown-item" href="login.html">Login</a></li>
                                    </ul>
                                </div>
                                <!-- Header User End -->
                                <!-- Header Cart Start -->
                                <a href="#" class="ec-header-btn ec-header-wishlist">
                                    <div class="header-icon"><i class="fi-rr-heart"></i></div>
                                    <span class="ec-header-count ec-wishlist-count">0</span>
                                </a>
                                <!-- Header Cart End -->
                                <!-- Header Cart Start -->
                                <a href="#ec-side-cart" class="ec-header-btn ec-side-toggle">
                                    <div class="header-icon"><i class="fi-rr-shopping-basket"></i></div>
                                    <span class="ec-header-count ec-cart-count">3</span>
                                </a>
                                <!-- Header Cart End -->
                                <!-- Header menu Start -->
                                <a href="#ec-mobile-menu" class="ec-header-btn ec-side-toggle ec-d-l d-lg-none">
                                    <i class="ecicon eci-bars"></i>
                                </a>
                                <!-- Header menu End -->
                            </div>
                        </div>
                        <!-- Header Top responsive Action -->
                    </div>
                </div>
            </div>
            <!-- Ec Header Top  End -->
            <!-- Ec Header Bottom  Start -->
            <div class="ec-header-bottom d-none d-lg-block">
                <div class="container position-relative">
                    <div class="row">
                        <div class="ec-flex">
                            <!-- Ec Header Logo Start -->
                            <div class="align-self-center">
                                <div class="header-logo">
                                    <a href="index.html"><img src="assets/images/logo/logo.png"
                                            alt="Site Logo" /><img class="dark-logo"
                                            src="assets/images/logo/dark-logo.png" alt="Site Logo"
                                            style="display: none;" /></a>
                                </div>
                            </div>
                            <!-- Ec Header Logo End -->

                            <!-- Ec Header Search Start -->
                            <div class="align-self-center">
                                <div class="header-search">
                                    <form class="ec-btn-group-form" action="#">
                                        <input class="form-control ec-search-bar" placeholder="Search products..."
                                            type="text">
                                        <button class="submit" type="submit"><i class="fi-rr-search"></i></button>
                                    </form>
                                </div>
                            </div>
                            <!-- Ec Header Search End -->

                            <!-- Ec Header Button Start -->
                            <div class="align-self-center">
                                <div class="ec-header-bottons">

                                    <!-- Header User Start -->
                                    <div class="ec-header-user dropdown">
                                        <button class="dropdown-toggle" data-bs-toggle="dropdown"><i
                                                class="fi-rr-user"></i></button>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            @guest
                                                <li><a class="dropdown-item" href="{{ route('register') }}">Register</a>
                                                </li>
                                                <li><a class="dropdown-item" href="{{ route('login') }}">Login</a></li>
                                            @endguest
                                            @auth
                                                <li><a class="dropdown-item" href="{{ route('logout') }}">Logout</a>
                                                </li>
                                                @if (Auth::guard('admin')->check())
                                                    <li><a class="dropdown-item"
                                                            href="{{ route('admin.index') }}">Dashboard</a>
                                                @endif
                                                </li>

                                            @endauth
                                        </ul>
                                    </div>
                                    <!-- Header User End -->
                                    <!-- Header wishlist Start -->
                                    <a href="wishlist.html" class="ec-header-btn ec-header-wishlist">
                                        <div class="header-icon"><i class="fi-rr-heart"></i></div>
                                        <span class="ec-header-count">4</span>
                                    </a>
                                    <!-- Header wishlist End -->
                                    <!-- Header Cart Start -->
                                    <a href="{{ route('cart.index') }}" class="ec-header-btn ec-side-toggle">
                                        <div class="header-icon"><i class="fi-rr-shopping-bag"></i></div>
                                        <span class="ec-header-count cart-count-lable">
                                            @auth

                                                @if (Auth::user()->carts)
                                                    {{ Auth::user()->carts->count() }}
                                                @else
                                                    0
                                                @endif
                                            @endauth
                                            0
                                        </span>
                                    </a>
                                    <!-- Header Cart End -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Ec Header Button End -->
            <!-- Header responsive Bottom  Start -->
            <div class="ec-header-bottom d-lg-none">
                <div class="container position-relative">
                    <div class="row ">

                        <!-- Ec Header Logo Start -->

                        <!-- Ec Header Logo End -->
                        <!-- Ec Header Search Start -->
                        <div class="col">
                            <div class="header-search">
                                <form class="ec-btn-group-form" action="#">
                                    <input class="form-control ec-search-bar" placeholder="Search products..."
                                        type="text">
                                    <button class="submit" type="submit"><i class="fi-rr-search"></i></button>
                                </form>
                            </div>
                        </div>
                        <!-- Ec Header Search End -->
                    </div>
                </div>
            </div>
            <!-- Header responsive Bottom  End -->
            <!-- EC Main Menu Start -->
            <div id="ec-main-menu-desk" class="d-none d-lg-block sticky-nav">
                <div class="container position-relative">
                    <div class="row">
                        <div class="col-md-12 align-self-center">
                            <div class="ec-main-menu">
                                <ul>
                                    <li><a href="{{ route('products.index') }}">Home</a></li>
                                    <li class="dropdown position-static"><a href="javascript:void(0)">Categories</a>

                                    </li>
                                    <li class="dropdown"><a href="{{ route('products.index') }}">Products</a>

                                    </li>
                                    <li class="dropdown"><a href="javascript:void(0)">Pages</a>

                                    </li>
                                    <li><a href="offer.html">Hot Offers</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ec Main Menu End -->

        </header>
        <!-- Header End  -->
        <!-- Header End  -->

        <div class="row">
            <div class="col-md-8 mx-auto my-4">
                @include('layouts.alerts')
            </div>
        </div>
        <main class="py-4">
            @yield('content')
        </main>
    </div>
    <script src="{{ asset('assets/js/vendor/jquery-3.5.1.min.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/popper.min.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/jquery-migrate-3.3.0.min.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/modernizr-3.11.2.min.js') }}"></script>

    <!--Plugins JS-->
    <script src="{{ asset('assets/js/plugins/swiper-bundle.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/countdownTimer.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/scrollup.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/jquery.zoom.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/slick.min.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/infiniteslidev2.js') }}"></script>
    <script src="{{ asset('assets/js/plugins/fb-chat.js') }}"></script>

    <!-- Main Js -->
    <script src="{{ asset('assets/js/vendor/index.js') }}"></script>
    <script src="{{ asset('assets/js/demo-3.js') }}"></script>

</body>

</html>
