<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); 
            $table->integer('price'); 
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            
            // Kolom json bawaan Anda (bisa digunakan untuk list fasilitas tambahan seperti mini bar, AC, dll)
            $table->json('features')->nullable(); 

            // --- TAMBAHAN KOLOM SPESIFIKASI INTI KELAS KAMAR ---
            $table->integer('size')->nullable();       // Menyimpan ukuran kamar (m²)
            $table->string('bed_type')->nullable();   // Menyimpan jenis kasur (King, Queen, dll)
            $table->integer('capacity')->nullable();   // Menyimpan kapasitas maksimum tamu
            // --------------------------------------------------

            $table->enum('status', ['available', 'booked'])->default('available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};