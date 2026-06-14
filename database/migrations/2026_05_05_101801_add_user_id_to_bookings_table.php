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
        Schema::table('bookings', function (Blueprint $table) {
            /**
             * foreignId('user_id'): Membuat kolom user_id
             * constrained(): Secara otomatis menghubungkan ke tabel 'users'
             * onDelete('cascade'): Jika user dihapus, data booking-nya juga ikut terhapus
             * after('id'): Meletakkan kolom ini tepat setelah kolom 'id' agar struktur tabel rapi
             */
            $table->foreignId('user_id')->after('id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Menghapus relasi foreign key terlebih dahulu sebelum menghapus kolomnya
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
};