import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Teks Guest Authentication - Sekarang di Tengah dan Orange */}
            <p className="text-[10px] text-amber-700 uppercase tracking-[0.2em] mt-1 text-center font-bold mb-8">
                Guest Authentication
            </p>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                {/* Input Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-medium" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-xl border-gray-300 focus:border-amber-600 focus:ring-amber-600 shadow-sm"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Input Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full rounded-xl border-gray-300 focus:border-amber-600 focus:ring-amber-600 shadow-sm"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Remember Me */}
                <div className="mt-4 block">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="rounded border-gray-300 text-amber-700 focus:ring-amber-500"
                        />
                        <span className="ms-2 text-sm text-gray-600 select-none">
                            Remember me
                        </span>
                    </label>
                </div>

                {/* Tombol Aksi & Link Navigasi */}
                <div className="mt-6 flex flex-col space-y-4">
                    
                    <div className="flex items-center justify-between text-[11px]">
                        {canResetPassword ? (
                            <Link
                                href={route('password.request')}
                                className="text-gray-500 underline hover:text-amber-700 focus:outline-none"
                            >
                                Forgot your password?
                            </Link>
                        ) : (
                            <div></div>
                        )}

                        {/* Link Registrasi Tamu Baru */}
                        <p className="text-gray-500">
                            New guest?{' '}
                            <Link
                                href={route('register')}
                                className="font-bold text-amber-700 underline hover:text-amber-800 focus:outline-none"
                            >
                                Register here
                            </Link>
                        </p>
                    </div>

                    {/* Button Login Elegant */}
                    <PrimaryButton 
                        className="w-full justify-center py-3.5 bg-[#C78233] hover:bg-[#b07029] active:bg-[#965e20] focus:bg-[#b07029] focus:ring-amber-500 rounded-xl tracking-[0.2em] text-[10px] font-bold uppercase transition duration-300" 
                        disabled={processing}
                    >
                        Log in
                    </PrimaryButton>
                    
                </div>
            </form>
        </GuestLayout>
    );
}