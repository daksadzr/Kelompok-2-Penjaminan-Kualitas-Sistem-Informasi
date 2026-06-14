<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room; // Pastikan Model Room di-import
use App\Mail\BookingSuccessNotification; // <-- 1. IMPORT CLASS MAILABLE BARU
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;   // <-- 2. IMPORT FACADE MAIL
use Carbon\Carbon;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'room_id'   => 'required|exists:rooms,id',
            'check_in'  => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'guests'    => 'required|integer|min:1',
            // Jika Anda belum memunculkan input phone di frontend, 
            // ganti menjadi 'nullable|string' agar tidak error saat disubmit.
            'phone'     => 'nullable|string|min:10', 
        ]);

        // 2. Ambil Data Kamar untuk Mendapatkan Harga Asli Sisi Server
        $room = Room::findOrFail($request->room_id);

        // 3. Hitung Jumlah Malam Menggunakan Carbon
        $checkIn = Carbon::parse($request->check_in);
        $checkOut = Carbon::parse($request->check_out);
        $nights = $checkIn->diffInDays($checkOut);

        // Pastikan minimal menginap adalah 1 malam
        $nights = $nights > 0 ? $nights : 1;

        // 4. Hitung Total Harga yang Valid
        $totalPrice = $nights * $room->price;

        // 5. Simpan Data ke Database Dashboard Admin
        // Kita masukkan ke variabel $booking agar datanya bisa dikirim via email
        $booking = Booking::create([
            'user_id'       => Auth::id(),
            'room_id'       => $request->room_id,
            'check_in'      => $request->check_in,
            'check_out'     => $request->check_out,
            'guests'        => $request->guests,
            'phone'         => $request->phone,
            'status'        => 'success',
            'customer_name' => Auth::user()->name, 
            'total_price'   => $totalPrice, // Menyimpan total kalkulasi harga asli ke database
        ]);

        // 6. PEMICU PENGIRIMAN EMAIL NOTIFIKASI OTOMATIS
        // Mengirim ke email user yang sedang login saat ini
        if (Auth::user() && Auth::user()->email) {
            Mail::to(Auth::user()->email)->send(new BookingSuccessNotification($booking));
        }

        // 7. Redirect dengan Feedback ke Dashboard
        return redirect()->route('dashboard')->with('message', 'Booking successfully created! Please check your email.');
    }
}