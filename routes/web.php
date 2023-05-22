<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ActivationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PaypalPaymentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/logout', [ProfileController::class, 'logout'])->name('logout');
});




// Home route
Route::get('/', [HomeController::class, 'index'])->name('home');

// Activate user account routes
Route::get('/activate/{code}', [ActivationController::class, 'activateUserAccount'])->name('user.activate');
Route::get('/resend/{email}', [ActivationController::class, 'resendActivationCode'])->name('code.resend');

// Products routes
Route::resource('products', ProductController::class);
Route::get('products/category/{category}', [HomeController::class, 'getProductByCategory'])->name("category.products");

// Cart routes
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/add/cart/{product}', [CartController::class, 'store'])->name('add.cart');
Route::delete('/remove/{product}/cart', [CartController::class, 'destroy'])->name('cart.destroy');
Route::put('/update/{product}/cart', [CartController::class, 'update'])->name('update.cart');

// Payment routes
Route::get('/handle-payment', [PaypalPaymentController::class, 'handlePayment'])->name('make.payment');
Route::get('/cancel-payment', [PaypalPaymentController::class, 'paymentCancel'])->name('cancel.payment');
Route::get('/payment-success', [PaypalPaymentController::class, 'paymentSuccess'])->name('success.payment');

// Admin routes
Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
Route::get('/admin/login', [AdminController::class, 'showAdminLoginForm'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'adminLogin'])->name('admin.login');
Route::get('/admin/logout', [AdminController::class, 'adminLogout'])->name('admin.logout');
Route::get('/admin/products', [AdminController::class, 'getProducts'])->name('admin.products');
Route::get('/admin/orders', [AdminController::class, 'getOrders'])->name('admin.orders');

// Orders routes
Route::resource('orders', OrderController::class);
require __DIR__ . '/auth.php';
