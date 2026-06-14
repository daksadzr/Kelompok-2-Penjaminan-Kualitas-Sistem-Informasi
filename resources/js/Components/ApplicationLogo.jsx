import { Link } from '@inertiajs/react';

export default function ApplicationLogo() {
    return (
        <Link href="/">
            <div className="text-xl font-semibold tracking-[0.3em] uppercase text-amber-700">
                Luxury <span className="font-light">Stay</span>
            </div>
        </Link>
    );
}
