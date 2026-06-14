import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Show({ auth, room, filters }) {
    // 1. Inisialisasi form Inertia dengan data filter bawaan + field phone
    const { data, setData, post, processing, errors } = useForm({
        room_id: room?.id || 1,
        check_in: filters?.check_in || '',
        check_out: filters?.check_out || '',
        guests: filters?.guests || '1',
        phone: '', // <-- MENAMPUNG STATE INPUT NOMOR TELEPON BARU
        total_price: 0, 
    });

    const [nights, setNights] = useState(0);

    // 2. Logika Hitung Otomatis Durasi Menginap & Total Harga
    useEffect(() => {
        if (data.check_in && data.check_out) {
            const dateIn = new Date(data.check_in);
            const dateOut = new Date(data.check_out);
            
            const diffTime = dateOut - dateIn;
            const calculatedNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (calculatedNights > 0) {
                setNights(calculatedNights);
                setData('total_price', calculatedNights * (room?.price || 0));
            } else {
                setNights(0);
                setData('total_price', 0);
            }
        } else {
            setNights(0);
            setData('total_price', 0);
        }
    }, [data.check_in, data.check_out]);

    function handleSubmit(e) {
        e.preventDefault();
        post(route('bookings.store'));
    }

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    return (
        <>
            <Head title={`${room?.name || 'Room Detail'} | Luxury Stay`} />
            
            <div className="min-h-screen bg-[#fdfcf8] text-[#2d2a26]">
                {/* Navigation Bar */}
                <nav className="flex items-center justify-between p-6 lg:px-12 bg-[#fdfcf8]/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200/60">
                    <Link href="/" className="text-xl font-semibold tracking-[0.3em] uppercase text-amber-700">
                        Luxury <span className="font-light">Stay</span>
                    </Link>
                    <div className="text-sm font-medium text-stone-600">
                        {auth.user ? `Welcome, ${auth.user.name}` : <Link href={route('login')} className="hover:text-amber-700">Log in</Link>}
                    </div>
                </nav>

                <main className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        
                        {/* SISI KIRI: Foto & Spesifikasi Lengkap Kamar */}
                        <div className="space-y-8">
                            {/* Foto Kamar */}
                            <div className="aspect-video overflow-hidden rounded-2xl bg-white shadow-md border border-stone-100">
                                <img 
                                    src={room?.image_url || 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600'} 
                                    alt={room?.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Judul & Harga */}
                            <div className="space-y-2">
                                <span className="text-[#E0A86A] font-bold tracking-widest uppercase text-[10px] block">Premium Accommodation</span>
                                <h1 className="text-3xl font-serif text-stone-800 md:text-4xl">{room?.name}</h1>
                                <p className="text-2xl font-light text-[#C78233]">
                                    {formatRupiah(room?.price)} <span className="text-xs text-stone-500 uppercase tracking-widest font-sans font-medium">/ Night</span>
                                </p>
                            </div>

                            {/* Deskripsi */}
                            <div className="pt-4 border-t border-stone-200/80 text-stone-600 font-light text-sm leading-relaxed">
                                Experience ultimate comfort with world-class amenities, premium bedding, and sophisticated interior design tailored to provide you with a perfect sanctuary.
                            </div>

                            {/* BAGIAN SPESIFIKASI KAMAR */}
                            <div className="pt-6 border-t border-stone-200/80 space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-800">Room Specifications</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm text-stone-600">
                                    <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-xl border border-stone-100">
                                        <span className="text-base">📐</span>
                                        <div>
                                            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Room Size</p>
                                            <p className="font-medium text-stone-800">{room?.size || '45'} m²</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-xl border border-stone-100">
                                        <span className="text-base">🛏️</span>
                                        <div>
                                            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Bed Type</p>
                                            <p className="font-medium text-stone-800">{room?.bed_type || 'King Size'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-xl border border-stone-100">
                                        <span className="text-base">👥</span>
                                        <div>
                                            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Max Capacity</p>
                                            <p className="font-medium text-stone-800">{room?.capacity || room?.guests || '2'} Guests</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-xl border border-stone-100">
                                        <span className="text-base">📶</span>
                                        <div>
                                            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">Internet</p>
                                            <p className="font-medium text-stone-800">Free High-Speed Wi-Fi</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SISI KANAN: Form Reservasi & Kalkulasi Otomatis */}
                        <div className="bg-white rounded-2xl shadow-xl border border-stone-200/60 p-8 lg:p-10 sticky top-28">
                            <h2 className="text-lg font-serif italic tracking-wide text-stone-800 mb-6">Reserve Your Stay</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Input Check In */}
                                <div className="flex flex-col items-start px-4 py-3 bg-stone-50 rounded-xl border border-stone-200/50">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Check In</label>
                                    <input 
                                        type="date" 
                                        value={data.check_in}
                                        onChange={e => setData('check_in', e.target.value)}
                                        className="mt-1 block w-full bg-transparent border-none focus:ring-0 text-sm text-stone-800 p-0 cursor-pointer"
                                        required
                                    />
                                    {errors.check_in && <span className="text-xs text-red-500 mt-1">{errors.check_in}</span>}
                                </div>

                                {/* Input Check Out */}
                                <div className="flex flex-col items-start px-4 py-3 bg-stone-50 rounded-xl border border-stone-200/50">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Check Out</label>
                                    <input 
                                        type="date" 
                                        value={data.check_out}
                                        onChange={e => setData('check_out', e.target.value)}
                                        className="mt-1 block w-full bg-transparent border-none focus:ring-0 text-sm text-stone-800 p-0 cursor-pointer"
                                        required
                                    />
                                    {errors.check_out && <span className="text-xs text-red-500 mt-1">{errors.check_out}</span>}
                                </div>

                                {/* Pilihan Jumlah Tamu */}
                                <div className="flex flex-col items-start px-4 py-3 bg-stone-50 rounded-xl border border-stone-200/50">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Guests</label>
                                    <select 
                                        value={data.guests}
                                        onChange={e => setData('guests', e.target.value)}
                                        className="mt-1 block w-full bg-transparent border-none focus:ring-0 text-sm text-stone-800 p-0 cursor-pointer font-medium"
                                    >
                                        <option value="1">1 Guest</option>
                                        <option value="2">2 Guests</option>
                                        <option value="4">4 Guests</option>
                                    </select>
                                </div>

                                {/* ================= INPUT PHONE NUMBER LUXURY STYLE ================= */}
                                <div className="flex flex-col items-start px-4 py-3 bg-stone-50 rounded-xl border border-stone-200/50">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        placeholder="e.g. 081234567890"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="mt-1 block w-full bg-transparent border-none focus:ring-0 text-sm text-stone-800 p-0 font-medium placeholder-stone-300"
                                        required
                                    />
                                    {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone}</span>}
                                </div>
                                {/* =================================================================== */}

                                {/* KOTAK KALKULASI OTOMATIS */}
                                {nights > 0 && (
                                    <div className="bg-[#fdfcf8] rounded-xl p-5 space-y-3 border border-amber-100">
                                        <div className="flex justify-between text-xs text-stone-600">
                                            <span>Price / night</span>
                                            <span>{formatRupiah(room?.price)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-stone-600 pb-2 border-b border-stone-200">
                                            <span>Total stay duration</span>
                                            <span className="font-medium text-stone-800">{nights} Night(s)</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-1">
                                            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Total Price</span>
                                            <span className="text-lg font-serif font-bold text-[#C78233]">
                                                {formatRupiah(data.total_price)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Tombol Submit */}
                                <button 
                                    type="submit"
                                    disabled={processing || nights <= 0}
                                    className="w-full bg-[#C78233] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#b07029] disabled:bg-stone-300 disabled:cursor-not-allowed transition duration-300 shadow-md hover:shadow-lg"
                                >
                                    {processing ? 'Processing...' : 'Confirm Booking'}
                                </button>
                            </form>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}