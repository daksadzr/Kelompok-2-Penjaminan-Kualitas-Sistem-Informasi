<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rooms = [
            [
                'name' => 'Deluxe Garden View',
                'type' => 'Deluxe',
                'price' => 750000,
                'description' => 'Kamar nyaman dengan pemandangan taman yang asri, atmosfer tenang, dan fasilitas esensial lengkap.',
                'status' => 'available',
                'image' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600', // Menggunakan Unsplash agar langsung muncul gambarnya
                // Tambahan spesifikasi sesuai kelas Deluxe:
                'size' => 32,
                'bed_type' => 'Queen or Twin Bed',
                'capacity' => 2,
            ],
            [
                'name' => 'Executive City Suite',
                'type' => 'Executive',
                'price' => 1250000,
                'description' => 'Suite premium dengan area duduk (living area) terpisah, mesin kopi espresso kapsul, dan pemandangan megah gedung perkotaan.',
                'status' => 'available',
                'image' => 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=600',
                // Tambahan spesifikasi sesuai kelas Executive:
                'size' => 55,
                'bed_type' => 'King Size Bed',
                'capacity' => 2,
            ],
            [
                'name' => 'Presidential Penthouse',
                'type' => 'Suite',
                'price' => 3500000,
                'description' => 'Mahakarya kemewahan tertinggi dengan private jacuzzi marmer, balkon panoramik luas, dan akses eksklusif VVIP Lounge.',
                'status' => 'available',
                'image' => 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600',
                // Tambahan spesifikasi sesuai kelas Presidential:
                'size' => 120,
                'bed_type' => 'Super King Size',
                'capacity' => 4,
            ],
        ];

        foreach ($rooms as $room) {
            Room::create($room);
        }
    }
}