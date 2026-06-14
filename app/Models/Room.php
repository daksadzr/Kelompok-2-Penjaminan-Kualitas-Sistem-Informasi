<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    // Memperbarui properti yang diizinkan untuk Mass Assignment
    protected $fillable = [
        'name', 
        'type', 
        'price', 
        'image', 
        'description', 
        'features',
        'size',       // Tambahan kolom ukuran kamar (m²)
        'bed_type',   // Tambahan kolom jenis kasur
        'capacity',   // Tambahan kolom kapasitas tamu
        'status'
    ];

    // Mengonversi otomatis data database JSON menjadi array di PHP
    protected $casts = [
        'features' => 'array',
        'size' => 'integer',     // Memastikan output berupa angka/integer
        'capacity' => 'integer', // Memastikan output berupa angka/integer
    ];
}