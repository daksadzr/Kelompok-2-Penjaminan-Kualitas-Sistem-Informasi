<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Booking;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() 
    {
        return Inertia::render('Dashboard', [
            'rooms' => Room::latest()->get(),
            // Memanggil relasi room agar nama kamar muncul di tabel booking
            'bookings' => Booking::with('room')->latest()->get(), 
        ]);
    }

    public function storeRoom(Request $request) 
    {
        $attr = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required',
            'price' => 'required|numeric',
            'description' => 'nullable',
        ]);
        
        Room::create($attr);
        return back()->with('message', 'Kamar berhasil ditambahkan!');
    }

    public function updateRoom(Request $request, Room $room) 
    {
        $attr = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required',
            'price' => 'required|numeric',
            'description' => 'nullable',
        ]);

        $room->update($attr);
        return back()->with('message', 'Data kamar berhasil diperbarui!');
    }

    public function destroyRoom(Room $room) 
    {
        $room->delete();
        return back()->with('message', 'Kamar berhasil dihapus!');
    }

    public function storeBooking(Request $request) 
    {
        $attr = $request->validate([
            'customer_name' => 'required|string',
            'room_id' => 'required|exists:rooms,id',
            'check_in' => 'required|date',
            'check_out' => 'required|date|after:check_in',
        ]);

        Booking::create($attr);
        return back()->with('message', 'Booking berhasil dicatat!');
    }
}