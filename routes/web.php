<?php

use App\Http\Controllers\HotelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BookingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// --- Public Routes ---
// Halaman depan: Katalog & Pencarian
Route::get('/', [HotelController::class, 'index'])->name('home');

// Detail Kamar: Menampilkan spesifikasi lengkap
Route::get('/rooms/{id}', [HotelController::class, 'show'])->name('rooms.show');


// --- Protected Routes (Must be logged in) ---
Route::middleware(['auth', 'verified'])->group(function () {
    
    /**
     * DASHBOARD & MANAGEMENT
     */
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // CRUD Kamar (Biasanya untuk Admin/Internal)
    Route::prefix('dashboard')->group(function () {
        Route::post('/rooms', [DashboardController::class, 'storeRoom'])->name('rooms.store');
        Route::patch('/rooms/{room}', [DashboardController::class, 'updateRoom'])->name('rooms.update');
        Route::delete('/rooms/{room}', [DashboardController::class, 'destroyRoom'])->name('rooms.destroy');
    });

    /**
     * BOOKING SYSTEM
     * Mengarahkan ke BookingController agar logika transaksi terpisah dari Dashboard
     */
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');

    /**
     * USER PROFILE (Laravel Breeze)
     */
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';