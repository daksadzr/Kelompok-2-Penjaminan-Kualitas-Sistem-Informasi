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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            // Menghubungkan booking ke tabel rooms
            // Jika kamar dihapus, data booking terkait juga akan terhapus (cascade)
            $table->foreignId('room_id')->constrained()->onDelete('cascade');
            
            $table->string('customer_name');
            $table->date('check_in');
            $table->date('check_out');
            
            // Status default diset sebagai 'booked'
            $table->string('status')->default('booked');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};