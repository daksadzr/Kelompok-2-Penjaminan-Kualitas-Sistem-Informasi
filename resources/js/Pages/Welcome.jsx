import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
// Menggunakan import relatif yang valid untuk project Laravel + Ziggy standar
import { route } from '../../../vendor/tightenco/ziggy';

export default function Welcome({ auth, rooms, filters }) {
    const [values, setValues] = useState({
        check_in: filters?.check_in || '',
        check_out: filters?.check_out || '',
        guests: filters?.guests || '1',
    });

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function handleSearch() {
        router.get('/', values, {
            preserveState: true,
            replace: true,
            onSuccess: () => {
                document.getElementById('room-catalog').scrollIntoView({ behavior: 'smooth' });
            },
        });
    }

    // Fungsi Helper untuk Scroll Halus ke Section mana pun
    function scrollToSection(e, id) {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    }

    const displayRooms = rooms && rooms.length > 0 ? rooms : [
        { id: 1, name: 'Deluxe Room (Demo)', price: 1990000, image_url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600' },
        { id: 2, name: 'Executive Suite (Demo)', price: 2990000, image_url: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=600' },
        { id: 3, name: 'Presidential Suite (Demo)', price: 4990000, image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600' },
    ];

    return (
        <>
            <Head title="Luxury Stay | Premium Hotel Experience" />
            <div className="min-h-screen bg-[#fdfcf8] text-[#2d2a26] selection:bg-amber-100">

                {/* Elegant Navigation */}
                <nav className="bg-[#fdfcf8]/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200/60">
                    <div className="flex items-center justify-between p-5 px-6 mx-auto max-w-7xl lg:px-12">
                        <div className="flex lg:flex-1">
                            <Link href="/" className="text-xl font-semibold tracking-[0.3em] uppercase text-amber-700 whitespace-nowrap">
                                Luxury <span className="font-light text-stone-600">Stay</span>
                            </Link>
                        </div>

                        {/* CENTER MENU: Sekarang semuanya terhubung ke fungsi Scroll Halus */}
                        <div className="items-center hidden gap-10 lg:flex">
                            <a href="#room-catalog" onClick={(e) => scrollToSection(e, 'room-catalog')} className="text-xs uppercase tracking-widest font-medium text-stone-600 hover:text-amber-700 transition relative after:absolute after:bottom-[-6px] after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-amber-700 after:transition-all">
                                Kamar & Suite
                            </a>
                            <a href="#bar-restaurant" onClick={(e) => scrollToSection(e, 'bar-restaurant')} className="text-xs uppercase tracking-widest font-medium text-stone-600 hover:text-amber-700 transition relative after:absolute after:bottom-[-6px] after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-amber-700 after:transition-all">
                                Bar & Restaurant
                            </a>
                            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-xs uppercase tracking-widest font-medium text-stone-600 hover:text-amber-700 transition relative after:absolute after:bottom-[-6px] after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-amber-700 after:transition-all">
                                Tentang Luxury Stay
                            </a>
                            <a href="#events" onClick={(e) => scrollToSection(e, 'events')} className="text-xs uppercase tracking-widest font-medium text-stone-600 hover:text-amber-700 transition relative after:absolute after:bottom-[-6px] after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-amber-700 after:transition-all">
                                Event & Meetings
                            </a>
                        </div>

                        <div className="flex items-center justify-end gap-6 lg:flex-1">
                            <div className="items-center hidden gap-6 sm:flex">
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="text-xs font-semibold tracking-widest uppercase transition hover:text-amber-700">Dashboard</Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-xs font-semibold tracking-widest uppercase transition hover:text-amber-700">Log in</Link>
                                        <Link href={route('register')} className="px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 border rounded-full border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white">Register</Link>
                                    </>
                                )}
                            </div>

                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 lg:hidden text-stone-600 hover:text-amber-700">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden bg-[#fdfcf8] border-t border-stone-200/60 px-6 py-6 space-y-4 shadow-inner">
                            <a href="#room-catalog" onClick={(e) => scrollToSection(e, 'room-catalog')} className="block text-xs font-medium tracking-widest uppercase text-stone-600 hover:text-amber-700">Kamar & Suite</a>
                            <a href="#bar-restaurant" onClick={(e) => scrollToSection(e, 'bar-restaurant')} className="block text-xs font-medium tracking-widest uppercase text-stone-600 hover:text-amber-700">Bar & Restaurant</a>
                            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="block text-xs font-medium tracking-widest uppercase text-stone-600 hover:text-amber-700">Tentang Luxury Stay</a>
                            <a href="#events" onClick={(e) => scrollToSection(e, 'events')} className="block text-xs font-medium tracking-widest uppercase text-stone-600 hover:text-amber-700">Event & Meetings</a>
                        </div>
                    )}
                </nav>

                <main>
                    {/* Hero Section */}
                    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 z-0 w-full h-full">
                            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" alt="Luxury Hotel" className="object-cover w-full h-full" />
                            <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[1px]"></div>
                        </div>

                        <div className="relative z-10 max-w-5xl px-6 py-12 mx-auto text-center">
                            <span className="text-[#E0A86A] font-bold tracking-widest uppercase text-[10px] sm:text-xs md:text-sm mb-4 block">
                                Exclusivity in every detail
                            </span>
                            <h1 className="mb-8 font-serif text-4xl italic leading-tight tracking-tight text-white sm:text-6xl">
                                Find Your Perfect <span className="font-normal not-italic text-[#e3e3e3]">Sanctuary</span>
                            </h1>

                            {/* Search Bar */}
                            <div className="flex flex-col items-center justify-between w-full mx-auto mt-16 overflow-hidden bg-white border shadow-2xl md:flex-row rounded-2xl border-stone-200/50">
                                <div className="flex flex-col items-start flex-1 w-full px-6 py-4 text-left transition border-b md:border-b-0 md:border-r border-stone-100 hover:bg-stone-50">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Check In</label>
                                    <input type="date" value={values.check_in} onChange={e => setValues({ ...values, check_in: e.target.value })} className="block w-full p-0 mt-1 text-sm bg-transparent border-none cursor-pointer focus:ring-0 text-stone-800" />
                                </div>
                                <div className="flex flex-col items-start flex-1 w-full px-6 py-4 text-left transition border-b md:border-b-0 md:border-r border-stone-100 hover:bg-stone-50">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700">Check Out</label>
                                    <input type="date" value={values.check_out} onChange={e => setValues({ ...values, check_out: e.target.value })} className="block w-full p-0 mt-1 text-sm bg-transparent border-none cursor-pointer focus:ring-0 text-stone-800" />
                                </div>
                                <div className="flex flex-col items-start w-full px-6 py-4 text-left transition border-b md:border-b-0 md:border-r border-stone-100 hover:bg-stone-50 md:flex-[1.5]">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-amber-700 whitespace-nowrap">
                                        Guests & Room Type
                                    </label>
                                    <select
                                        value={values.guests}
                                        onChange={e => setValues({ ...values, guests: e.target.value })}
                                        className="block w-full p-0 pr-8 mt-1 text-sm font-medium bg-transparent border-none cursor-pointer focus:ring-0 text-stone-800"
                                    >
                                        <option value="1">1 Guest (Deluxe)</option>
                                        <option value="2">2 Guests (Executive)</option>
                                        <option value="4">4 Guests (Presidential)</option>
                                    </select>
                                </div>
                                <button onClick={handleSearch} className="w-full h-full px-8 py-6 text-sm font-bold tracking-widest text-white uppercase transition-colors bg-amber-700 md:py-10 hover:bg-amber-800 md:w-auto md:self-stretch whitespace-nowrap">
                                    Check Availability
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 1: Room Categories */}
                    <div id="room-catalog" className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 pt-24 bg-[#fdfcf8]">
                        <div className="mb-16 text-center">
                            <h2 className="mb-2 font-serif text-3xl text-stone-800">Our Masterpiece Accommodations</h2>
                            <p className="text-xs tracking-widest uppercase text-amber-700">Crafted for ultimate relaxation</p>
                        </div>
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                            {displayRooms.map((room) => (
                                <div key={room.id} className="group">
                                    <div className="relative overflow-hidden bg-white border shadow-sm aspect-video rounded-2xl border-stone-100">
                                        <div className="absolute inset-0 z-10 transition-all duration-500 bg-amber-900/5 group-hover:bg-amber-900/10" />
                                        <div className="h-full w-full flex items-center justify-center group-hover:scale-110 transition-transform duration-700 bg-[#f7f5f0]">
                                            <img src={room.image_url} alt={room.name} className="object-cover w-full h-full" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600' }} />
                                        </div>
                                    </div>
                                    <div className="mt-6 space-y-2 text-center">
                                        <h3 className="font-serif text-xl transition text-stone-800 group-hover:text-amber-700">{room.name}</h3>
                                        <div className="w-12 h-[1px] bg-amber-600 mx-auto transition-all duration-300 group-hover:w-24"></div>
                                        <p className="text-sm font-light tracking-wide uppercase text-stone-500">
                                            From {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(room.price)} / Night
                                        </p>
                                        <div className="pt-4">
                                            <Link href={route('rooms.show', { id: room.id, check_in: values.check_in, check_out: values.check_out, guests: values.guests })} className="inline-block px-8 py-3 text-xs font-semibold transition-all duration-300 border rounded-full shadow-sm border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white hover:shadow-md">
                                                Book This Room →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECTION 2: BAR & RESTAURANT */}
                    <div id="bar-restaurant" className="py-24 bg-stone-900 text-stone-100">
                        <div className="flex flex-col items-center gap-12 px-6 mx-auto max-w-7xl lg:px-8 md:flex-row">
                            <div className="w-full space-y-6 md:w-1/2">
                                <span className="text-xs uppercase tracking-widest text-[#E0A86A] font-bold">Fine Dining Experience</span>
                                <h2 className="font-serif text-4xl text-white">The Lounge & Bar</h2>
                                <p className="text-sm font-light leading-relaxed text-stone-400">
                                    Nikmati petualangan rasa gastronomi berkelas dunia yang diramu langsung oleh Chef bersertifikat internasional kami. Menyajikan perpaduan rasa lokal autentik dan teknik memasak modern yang memanjakan lidah Anda sepanjang malam.
                                </p>
                                <div className="pt-4">
                                    <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-stone-400 border border-stone-700 px-4 py-2 rounded-full">Open Daily: 06:00 AM - 11:00 PM</span>
                                </div>
                            </div>
                            <div className="w-full overflow-hidden shadow-2xl md:w-1/2 h-80 rounded-2xl">
                                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop" alt="Restaurant" className="object-cover w-full h-full" />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: TENTANG LUXURY STAY */}
                    <div id="about" className="py-24 bg-[#f8f6f0]">
                        <div className="max-w-4xl px-6 mx-auto space-y-6 text-center">
                            <span className="text-xs font-bold tracking-widest uppercase text-amber-700">Legacy of Heritage</span>
                            <h2 className="font-serif text-4xl text-stone-800">A Sanctuary for the Senses</h2>
                            <div className="w-16 h-[2px] bg-amber-700 mx-auto"></div>
                            <p className="max-w-2xl mx-auto text-sm font-light leading-relaxed text-stone-600">
                                Didirikan dengan satu visi yang jelas: mendefinisikan kembali arti dari kemewahan sejati. Luxury Stay memadukan kenyamanan modern yang mutakhir dengan keramahan lokal yang hangat, menciptakan oasis kedamaian di tengah hiruk pikuk pusat kota.
                            </p>
                        </div>
                    </div>

                    {/* SECTION 4: EVENT & MEETINGS */}
                    <div id="events" className="py-24 bg-white">
                        <div className="flex flex-col items-center gap-12 px-6 mx-auto max-w-7xl lg:px-8 md:flex-row-reverse">
                            <div className="w-full space-y-6 md:w-1/2">
                                <span className="text-xs font-bold tracking-widest uppercase text-amber-700">Grand Celebrations & Corporate</span>
                                <h2 className="font-serif text-4xl text-stone-800">Elegant Spaces for Every Moment</h2>
                                <p className="text-sm font-light leading-relaxed text-stone-600">
                                    Mulai dari rapat dewan direksi yang privat hingga pesta pernikahan agung yang megah. Ruang serbaguna dan ballroom kami dilengkapi dengan sistem audio-visual tercanggih dan tim perencana acara internal yang berdedikasi tinggi untuk memastikan kesuksesan setiap agenda Anda.
                                </p>
                            </div>
                            <div className="w-full overflow-hidden shadow-xl md:w-1/2 h-80 rounded-2xl">
                                <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop" alt="Meeting Room" className="object-cover w-full h-full" />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5: LOCATION & MAP */}
                    <div id="location" className="py-24 bg-[#fdfcf8] border-t border-stone-200/60">
                        <div className="px-6 mx-auto max-w-7xl lg:px-8">
                            <div className="flex flex-col items-center gap-12 lg:flex-row">

                                {/* Teks Informasi Alamat */}
                                <div className="w-full space-y-6 lg:w-1/3">
                                    <span className="text-xs font-bold tracking-widest uppercase text-amber-700">Our Location</span>
                                    <h2 className="font-serif text-4xl text-stone-800">The Prime Address</h2>
                                    <div className="w-16 h-[2px] bg-amber-700"></div>
                                    <p className="text-sm font-light leading-relaxed text-stone-600">
                                        Luxury Stay terletak strategis di kawasan pusat distrik bisnis dan hiburan eksklusif. Akses mudah menuju pusat perbelanjaan premium, galeri seni, dan hanya berjarak 30 menit dari Bandara Internasional.
                                    </p>
                                    <div className="pt-2 space-y-3 text-sm text-stone-700">
                                        <div className="flex items-start gap-3">
                                            <svg className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p className="font-light">Jl. Grand Luxury Boulevard No. 88, Kav. 21, Jakarta Selatan, Indonesia</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-amber-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <p className="font-light">+62 (21) 8888-9999</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Bingkai Google Maps Embed - Langsung Berwarna & Ada Pin Merah */}
                                <div className="w-full lg:w-2/3 h-[400px] rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-100 relative">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1130773663784!2d106.8055615757271!3d-6.248831361184313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f35ba8041a17%3A0x7c79885628af19d8!2sHouse%20Of%20Pista!5e0!3m2!1sid!2sid!4v1717880000000!5m2!1sid!2sid"
                                        className="w-full h-full border-0"
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Luxury Stay Location Map - House Of Pista"
                                    ></iframe>
                                </div>

                            </div>
                        </div>
                    </div>

                </main>

                <footer className="py-16 text-center bg-white border-t border-stone-200">
                    <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400">
                        Luxury Stay Boutique Hotel
                    </p>
                </footer>
            </div>
        </>
    );
}