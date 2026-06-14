<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; // Tambahkan ini agar DB bisa terbaca

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // BAGIAN INI YANG DIGANTI:
        DB::table('hotels')->insert([
            [
                'name' => 'The Grand Azure', 
                'location' => 'Bali, Indonesia', 
                'description' => 'Luxury beachfront resort with infinity pools.', 
                'rating' => 4.9, 
                'image_url' => 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800'
            ],
            [
                'name' => 'Mountain Retreat', 
                'location' => 'Bali, Indonesia', 
                'description' => 'Serene jungle villas overlooking the Ayung River valley.', 
                'rating' => 4.7, 
                'image_url' => 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800'
            ],
        ]);
    }
}