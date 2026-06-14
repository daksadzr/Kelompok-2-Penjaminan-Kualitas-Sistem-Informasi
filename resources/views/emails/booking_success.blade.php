<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Konfirmasi Reservasi</title>
    <style>
        body { font-family: 'Georgia', serif; background-color: #fdfcf8; color: #2d2a26; margin: 0; padding: 40px; }
        .container { max-width: 600px; background: #ffffff; margin: 0 auto; padding: 40px; border: 1px solid #e7e5e0; border-radius: 8px; }
        .header { text-align: center; border-bottom: 1px solid #e7e5e0; padding-bottom: 20px; }
        .logo { font-size: 24px; tracking: 3px; text-transform: uppercase; color: #b45309; font-weight: bold; }
        .content { padding: 20px 0; line-height: 1.6; }
        .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .details-table td { padding: 10px 0; border-bottom: 1px solid #f4f4f3; }
        .details-table td.label { color: #78716c; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
        .details-table td.value { text-align: right; font-weight: bold; }
        .footer { text-align: center; font-size: 11px; color: #a8a29e; margin-top: 40px; border-top: 1px solid #e7e5e0; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Luxury Stay</div>
            <p style="font-style: italic; color: #78716c; margin-top: 5px;">Sanctuary Confirmation</p>
        </div>
        
        <div class="content">
            <p>Halo <strong>{{ $booking->customer_name }}</strong>,</p>
            <p>Terima kasih telah memilih Luxury Stay. Reservasi Anda telah kami terima dan kamar Anda telah berhasil dijadwalkan.</p>
            
            <table class="details-table">
                <tr>
                    <td class="label">Check In</td>
                    <td class="value">{{ $booking->check_in }}</td>
                </tr>
                <tr>
                    <td class="label">Check Out</td>
                    <td class="value">{{ $booking->check_out }}</td>
                </tr>
                <tr>
                    <td class="label">Total Pembayaran</td>
                    <td class="value" style="color: #b45309;">Rp {{ number_format($booking->total_price, 0, ',', '.') }}</td>
                </tr>
                <tr>
                    <td class="label">Status</td>
                    <td class="value" style="text-transform: uppercase; font-size: 12px; letter-spacing: 1px; color: #b45309;">{{ $booking->status }}</td>
                </tr>
            </table>

            <p style="font-size: 13px; color: #57534e;">Silakan tunjukkan email ini saat melakukan proses check-in di meja resepsionis kami.</p>
        </div>

        <div class="footer">
            <p>© 2026 Luxury Stay Boutique Hotel | All Rights Reserved</p>
        </div>
    </div>
</body>
</html>