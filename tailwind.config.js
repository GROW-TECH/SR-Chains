/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bgImage:
          "url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1470&q=80')",

        // ✅ renamed from sliver → silver
        silver:
          "url('https://images.unsplash.com/photo-1602524811650-6e6b4b8e5b7c')",

        dining:
          "url('https://b.zmtcdn.com/data/collections/2deab8e9f06ff125e80f5cc09f11e4d7_1674569132.jpg?output-format=webp')",
        chocolate:
          "url('https://b.zmtcdn.com/data/collections/0a4f52d9dc95cf3a5d3cf05f2299c1bf_1704348957.png?output-format=webp')",
        insta:
          "url('https://b.zmtcdn.com/data/collections/ae71f4c72fda8a608a3650b15a994fdb_1696838475.jpg?output-format=webp')",
        cozy: "url('https://b.zmtcdn.com/data/collections/2022843bd23fe6c24f67cbea79836a4f_1704970294.png?output-format=webp')",
        zomato:
          "url('https://b.zmtcdn.com/data/cover_images/7dc92ec243c19684b2eaefd0050d656e1548144012.jpeg')",
      },
      colors: {
        primary: "#E23744",
      },
    },
  },
  plugins: [],
};
