<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingSuccessNotification extends Mailable
{
    use Queueable, SerializesModels;

    // Definisikan variabel properti agar bisa dibaca di template blade email
    public $booking;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Konfirmasi Reservasi - Luxury Stay Hotel Demo',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.booking_success', // Mengarah ke resources/views/emails/booking_success.blade.php
        );
    }

    public function attachments(): array
    {
        return [];
    }
}