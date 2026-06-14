import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, rooms, bookings = [] }) {
    // 1. Jika customer login, paksa masuk ke tab bookings, selain itu (admin) default ke rooms
    const isAdmin = auth.user.role === 'admin';
    const [activeTab, setActiveTab] = useState(isAdmin ? 'rooms' : 'bookings'); 
    const [isEditing, setIsEditing] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const roomForm = useForm({
        name: '', type: 'Deluxe', price: '', description: '',
    });

    const bookingForm = useForm({
        customer_name: '', room_id: '', check_in: '', check_out: '', status: 'booked'
    });

    // Helper untuk memformat angka ke format mata uang Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    const openEditRoom = (room) => {
        setSelectedRoom(room);
        roomForm.setData({
            name: room.name, type: room.type, price: room.price, description: room.description || '',
        });
        setIsEditing(true);
    };

    const submitRoom = (e) => {
        e.preventDefault();
        if (isEditing) {
            roomForm.patch(`/dashboard/rooms/${selectedRoom.id}`, { onSuccess: () => { setIsEditing(false); roomForm.reset(); } });
        } else {
            roomForm.post('/dashboard/rooms', { onSuccess: () => roomForm.reset() });
        }
    };

    const submitBooking = (e) => {
        e.preventDefault();
        bookingForm.post('/dashboard/bookings', { onSuccess: () => bookingForm.reset() });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-serif text-[#1a2b48] tracking-tight">Hotel Management</h2>
                    <div className="flex bg-[#f3f4f6] rounded-full p-1 border border-gray-200 shadow-sm">
                        {/* 2. Tombol Data Kamar HANYA muncul jika User adalah Admin */}
                        {isAdmin && (
                            <button 
                                onClick={() => setActiveTab('rooms')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'rooms' ? 'bg-[#1a2b48] text-white shadow-md' : 'text-gray-500 hover:text-[#1a2b48]'}`}
                            >
                                Data Kamar
                            </button>
                        )}
                        <button 
                            onClick={() => setActiveTab('bookings')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'bookings' ? 'bg-[#1a2b48] text-white shadow-md' : 'text-gray-500 hover:text-[#1a2b48]'}`}
                        >
                            Booking & Customer
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12 bg-[#fdfbf7] min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    
                    {/* Halaman Data Kamar - Double check agar customer tidak bisa tembus lewat state manual */}
                    {activeTab === 'rooms' && isAdmin ? (
                        <div className="flex flex-col gap-8 md:flex-row">
                            {/* FORM SECTION */}
                            <div className="w-full p-8 bg-white border border-gray-100 shadow-xl md:w-1/3 rounded-2xl h-fit">
                                <h3 className="text-lg font-serif font-bold mb-6 text-[#1a2b48] border-b pb-2 italic">
                                    {isEditing ? 'Update Selection' : 'Register New Room'}
                                </h3>
                                <form onSubmit={submitRoom} className="space-y-5">
                                    <div>
                                        <label className="block mb-1 text-xs tracking-widest text-gray-500 uppercase">Nama Kamar</label>
                                        <input type="text" value={roomForm.data.name} onChange={e => roomForm.setData('name', e.target.value)} className="w-full rounded-lg border-gray-200 focus:border-[#bc986a] focus:ring-[#bc986a]" required />
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-xs tracking-widest text-gray-500 uppercase">Tipe</label>
                                        <select value={roomForm.data.type} onChange={e => roomForm.setData('type', e.target.value)} className="w-full rounded-lg border-gray-200 focus:border-[#bc986a] focus:ring-[#bc986a]">
                                            <option value="Deluxe">Deluxe</option>
                                            <option value="Executive">Executive Suite</option>
                                            <option value="Presidential">Presidential Suite</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-xs tracking-widest text-gray-500 uppercase">Harga (Rp)</label>
                                        <input type="number" value={roomForm.data.price} onChange={e => roomForm.setData('price', e.target.value)} className="w-full rounded-lg border-gray-200 focus:border-[#bc986a] focus:ring-[#bc986a]" required />
                                    </div>
                                    <button type="submit" disabled={roomForm.processing} className="w-full bg-[#bc986a] text-white py-3 rounded-lg font-serif tracking-widest uppercase text-xs hover:bg-[#a6845a] transition-all shadow-lg shadow-orange-100">
                                        {isEditing ? 'Update Room' : 'Save Room'}
                                    </button>
                                </form>
                            </div>

                            {/* TABLE SECTION */}
                            <div className="w-full p-8 overflow-x-auto bg-white border border-gray-100 shadow-xl md:w-2/3 rounded-2xl">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-100 uppercase text-[10px] tracking-[0.2em] text-gray-400">
                                            <th className="p-4">Room Details</th>
                                            <th className="p-4">Rate</th>
                                            <th className="p-4 text-center">Manage</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[#1a2b48]">
                                        {rooms.map(room => (
                                            <tr key={room.id} className="transition-colors border-b border-gray-50 hover:bg-gray-50">
                                                <td className="p-4">
                                                    <div className="font-bold">{room.name}</div>
                                                    <div className="text-[10px] text-[#bc986a] uppercase tracking-tighter">{room.type}</div>
                                                </td>
                                                <td className="p-4 font-mono">Rp {Number(room.price).toLocaleString('id-ID')}</td>
                                                <td className="p-4 text-center">
                                                    <button onClick={() => openEditRoom(room)} className="text-[#bc986a] hover:text-[#1a2b48] font-bold text-sm transition-colors uppercase tracking-widest">Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        /* BOOKING TAB */
                        <div className="flex flex-col gap-8 md:flex-row">
                            {/* 3. Form New Reservation HANYA dirender jika pengguna adalah Admin */}
                            {isAdmin && (
                                <div className="w-full p-8 bg-white border border-gray-100 shadow-xl md:w-1/3 rounded-2xl h-fit">
                                    <h3 className="text-lg font-serif font-bold mb-6 text-[#1a2b48] border-b pb-2 italic">New Reservation</h3>
                                    <form onSubmit={submitBooking} className="space-y-5">
                                        <div>
                                            <label className="block mb-1 text-xs tracking-widest text-gray-500 text-gray-700 uppercase">Nama Customer</label>
                                            <input type="text" value={bookingForm.data.customer_name} onChange={e => bookingForm.setData('customer_name', e.target.value)} className="w-full rounded-lg border-gray-200 focus:border-[#bc986a] focus:ring-[#bc986a]" required />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-xs tracking-widest text-gray-500 uppercase">Select Room</label>
                                            <select value={bookingForm.data.room_id} onChange={e => bookingForm.setData('room_id', e.target.value)} className="w-full rounded-lg border-gray-200 focus:border-[#bc986a] focus:ring-[#bc986a]" required>
                                                <option value="">-- Availability --</option>
                                                {rooms.map(room => (
                                                    <option key={room.id} value={room.id}>{room.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block mb-1 text-xs tracking-widest text-gray-500 uppercase">Check In</label>
                                                <input type="date" value={bookingForm.data.check_in} onChange={e => bookingForm.setData('check_in', e.target.value)} className="w-full text-xs border-gray-200 rounded-lg" required />
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-xs tracking-widest text-gray-500 uppercase">Check Out</label>
                                                <input type="date" value={bookingForm.data.check_out} onChange={e => bookingForm.setData('check_out', e.target.value)} className="w-full text-xs border-gray-200 rounded-lg" required />
                                            </div>
                                        </div>
                                        <button type="submit" disabled={bookingForm.processing} className="w-full bg-[#1a2b48] text-white py-3 rounded-lg font-serif tracking-widest uppercase text-xs hover:bg-[#111e33] transition-all shadow-lg">
                                            Confirm Reservation
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* 4. Bagian Tabel Jadwal: Jika Admin ambil ukuran lebar md:w-2/3, Jika Customer otomatis lebar penuh w-full */}
                            <div className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-100 overflow-x-auto ${isAdmin ? 'w-full md:w-2/3' : 'w-full'}`}>
                                <h3 className="text-lg font-serif font-bold mb-6 text-[#1a2b48]">Guest Schedule</h3>
                                <table className="w-full text-left">
                                    <thead className="bg-[#fdfbf7] uppercase text-[10px] tracking-[0.2em] text-gray-400">
                                        <tr>
                                            <th className="p-4 border-b">Guest</th>
                                            <th className="p-4 border-b">Contact</th>
                                            <th className="p-4 border-b">Room</th>
                                            <th className="p-4 border-b">Period</th>
                                            <th className="p-4 border-b">Total Price</th>
                                            <th className="p-4 border-b">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {bookings.length > 0 ? bookings.map(booking => (
                                            <tr key={booking.id} className="transition-all border-b border-gray-50 hover:bg-gray-50">
                                                <td className="p-4 font-bold text-[#1a2b48]">{booking.customer_name}</td>
                                                <td className="p-4">
                                                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-mono">
                                                        {booking.phone || booking.user?.phone || '-'}
                                                    </span>
                                                </td>
                                                <td className="p-4 italic text-gray-600">{booking.room?.name || 'Unassigned'}</td>
                                                <td className="p-4 text-[11px]">
                                                    <span className="text-[#bc986a] font-bold">IN:</span> {booking.check_in} <br/>
                                                    <span className="font-bold text-gray-400">OUT:</span> {booking.check_out}
                                                </td>
                                                <td className="p-4 font-semibold font-mono text-[#C78233]">
                                                    {formatRupiah(booking.total_price || 0)}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${booking.status === 'booked' ? 'border-[#bc986a] text-[#bc986a]' : 'border-amber-300 text-amber-700 bg-amber-50/50'}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="6" className="p-8 italic text-center text-gray-300">No guests scheduled.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}