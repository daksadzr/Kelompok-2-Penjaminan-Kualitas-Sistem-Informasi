<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Membuat User Admin/Test untuk login
        User::factory()->create([
            'name' => 'Admin Luxury Stay',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // password untuk login
        ]);

        // 2. Memanggil RoomSeeder untuk mengisi data kamar
        $this->call([
            RoomSeeder::class,
        ]);
    }
}