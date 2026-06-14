<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelController extends Controller
{
    public function index(Request $request)
    {
        $query = Room::latest();

        if ($request->has('guests')) {
            $guests = $request->guests;
            if ($guests == 4) {
                $query->where('name', 'like', '%Presidential%');
            } elseif ($guests == 2) {
                $query->where(function($q) {
                    $q->where('name', 'like', '%Executive%')
                      ->orWhere('name', 'like', '%Presidential%');
                });
            } else {
                $query->where('name', 'like', '%Deluxe%')
                      ->orWhere('name', 'like', '%Executive%')
                      ->orWhere('name', 'like', '%Presidential%');
            }
        }

        $rooms = $query->get()->map(function ($room) {
            $room->image_url = $this->getRoomImage($room, 600);
            return $room;
        });

        return Inertia::render('Welcome', [
            'rooms' => $rooms,
            'filters' => $request->only(['guests', 'check_in'])
        ]);
    }

    public function show(Request $request, $id)
    {
        $room = Room::findOrFail($id);
        
        // Tambahkan fitur secara manual jika belum ada di database
        $room->image_url = $this->getRoomImage($room, 1200);
        $room->features = $this->getRoomFeatures($room);

        return Inertia::render('Rooms/Show', [
            'room' => $room,
            'booking_details' => [
                'check_in' => $request->query('check_in'),
                'guests' => $request->query('guests'),
            ]
        ]);
    }

    // Fungsi Privat agar kode tidak duplikat
    private function getRoomImage($room, $width)
    {
        if (!empty($room->image_url)) return $room->image_url;

        $name = strtolower($room->name);
        if (str_contains($name, 'presidential')) {
            return "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=$width";
        } elseif (str_contains($name, 'executive')) {
            return "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=$width";
        }
        return "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=$width";
    }

    private function getRoomFeatures($room)
    {
        $name = strtolower($room->name);
        if (str_contains($name, 'presidential')) {
            return ['Private Jacuzzi', 'Butler Service 24/7', 'Panoramic View', 'King Size Bed'];
        } elseif (str_contains($name, 'executive')) {
            return ['Work Station', 'Coffee Maker', 'City View', 'Queen Size Bed'];
        }
        return ['Comfortable Bed', 'Free WiFi', 'Daily Cleaning', 'Smart TV'];
    }
}