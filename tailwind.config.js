// Import default theme bawaan Tailwind
import defaultTheme from 'tailwindcss/defaultTheme';

// Import plugin form agar styling form lebih bagus
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {

    // Menentukan file yang akan dipindai Tailwind
    // supaya class CSS yang dipakai bisa ter-generate
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {

            // Menambahkan font Figtree sebagai font utama
            // lalu fallback ke font bawaan Tailwind
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },

        },
    },

    // Plugin tambahan untuk styling form
    plugins: [forms],
};
