// Komponen untuk menampilkan pesan error pada form
export default function InputError({ message, className = '', ...props }) {

    // Jika terdapat pesan error, maka tampilkan teks error
    // Jika tidak ada pesan error, maka tidak menampilkan apa pun (null)
    return message ? (
        <p
            {...props}
            className={'text-sm text-red-600 ' + className}
        >
            {message}
        </p>
    ) : null;
}
