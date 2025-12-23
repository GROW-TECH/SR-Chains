import { useState } from "react";
import SecondaryHeader from "../components/SecondaryHeader";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import CollectionCard from "../components/CollectionCard";
import CategoryPills from "../components/CategoryPills";
import CategoryModal from "../components/CategoryModal";

/* ================= CATEGORY MODAL DATA ================= */
const categoryModalData = {
  "22KT Ready": [
    {
      title: "Plain Casting",
      img: "https://cdn.quicksell.co/-NVt4TaiE3Hhq0fNqKM6/products/-OZEwW2n_I7G6jGqrwE4.jpg",
    },
    {
      title: "CZ Casting",
      img: "https://cdn.quicksell.co/-NVt4TaiE3Hhq0fNqKM6/products/-OZEwW2n_I7G6jGqrwE4.jpg",
    },
    {
      title: "Paper Casting",
      img: "https://cdn.quicksell.co/-NVt4TaiE3Hhq0fNqKM6/products/-OZEwW2n_I7G6jGqrwE4.jpg",
    },
    {
      title: "Chain",
      img: "https://cdn.quicksell.co/-NVt4TaiE3Hhq0fNqKM6/products/-OZEwW2n_I7G6jGqrwE4.jpg",
    },
    {
      title: "Bracelet",
      img: "https://cdn.quicksell.co/-NVt4TaiE3Hhq0fNqKM6/products/-OZEwW2n_I7G6jGqrwE4.jpg",
    },
    {
      title: "Cuban",
      img: "https://cdn.quicksell.co/-NVt4TaiE3Hhq0fNqKM6/products/-OZEwW2n_I7G6jGqrwE4.jpg",
    },
  ],
};

/* ================= CATEGORY CARDS ================= */
const categoryCards = [
  {
    title: "Silver Rings",
    desc: "Elegant handcrafted silver rings",
    img: "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/218766e4f/beautiful-design-silver-kada-for-baby-boy-563va8195-563va8195.jpg",
  },
  {
    title: "Silver Necklaces",
    desc: "Timeless designs for every look",
    img: "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/22399cc11/graceful-bridal-silver-haram-set-208vt1608-208vt1608-208vs5820.jpg",
  },
  {
    title: "Silver Bangles",
    desc: "Traditional & modern styles",
    img: "https://aurajewels.s3.amazonaws.com/images/AuraJewels/silbrc021p",
  },
  {
    title: "Silver Anklets",
    desc: "Delicate silver anklets for daily wear",
    img: "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/1517226c6/sterling-silver-men-s-party-wear-bracelet-208vo5368-208vo5368.jpg",
  },
  {
    title: "Silver Earrings",
    desc: "Classic and contemporary designs",
    img: "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/13551e210/92-5-sterling-silver-antique-drop-dangle-jhumkas-208vo8339-208vo8339.jpg",
  },
  {
    title: "Silver Bracelets",
    desc: "Modern silver bracelets for every style",
    img: "https://www.giva.co/cdn/shop/files/BR0221_1.jpg?v=1694080362&width=713",
  },
];

/* ================= COLLECTIONS ================= */
const collections = [
  {
    title: "Wedding Collection",
    desc: "Graceful silver jewellery for timeless weddings",
    img: "https://cdnmedia-breeze.vaibhavjewellers.com/media/webp_image/catalog/product/cache/1bdefe94714fcd7dcc850ab66b8f5472/image/270327763/celestial-flower-silver-necklace-set-with-blue-stones-6176mhoca22988.webp",
  },
  {
    title: "Everyday Elegance",
    desc: "Minimal silver pieces for daily wear",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0rOW_JdejNfVItD7MW6w5eirT7QDH-BATzbP_FtTVcIpcfHdDN81Re4&s",
  },
  {
    title: "Festive Specials",
    desc: "Statement silver designs for celebrations",
    img: "https://static.vecteezy.com/system/resources/thumbnails/027/062/824/small_2x/silver-necklace-on-a-solid-color-background-in-close-up-ai-generative-photo.jpeg",
  },
];

const HomePage = () => {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <>
      {/* ================= HERO ================= */}
      <div
        className="relative flex flex-col items-center bg-cover bg-center text-white pb-24 max-[500px]:pb-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 w-full flex flex-col items-center">
          <SecondaryHeader />

          <h1 className="text-6xl max-[500px]:text-3xl font-serif tracking-widest mt-8">
            SR Chains
          </h1>

          <p className="text-4xl max-[500px]:text-2xl text-center mt-4 px-6">
            Discover Elegant Silver Jewellery for Every Occasion
          </p>

          <div className="w-[65%] max-[500px]:w-[90%] mt-6">
            <SearchBar placeholder="Search rings, necklaces, bangles..." />
          </div>
        </div>
      </div>

      {/* ================= SHOP BY CATEGORY ================= */}
      <div className="px-20 max-[500px]:px-7 py-20 bg-[#FFF7F7]">
        <h2 className="text-4xl max-[500px]:text-2xl font-medium text-center mb-10 text-[#7A4A4A]">
          Shop by Category
        </h2>

        <CategoryPills onSelect={setOpenCategory} />
      </div>

      {/* ================= CATEGORY CARDS ================= */}
      <div className="flex flex-wrap justify-center gap-5 px-20 max-[500px]:px-7 py-20">
        {categoryCards.map((item, index) => (
          <CategoryCard key={index} {...item} />
        ))}
      </div>

      {/* ================= COLLECTIONS ================= */}
      <div className="px-20 max-[500px]:px-7 mb-28">
        <h2 className="text-4xl max-[500px]:text-2xl font-medium">
          Featured Silver Collections
        </h2>

        <p className="text-xl max-[500px]:text-sm py-3">
          Explore curated silver jewellery collections crafted to perfection
        </p>

        <div className="grid grid-cols-3 gap-6 mt-8 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1">
          {collections.map((item, index) => (
            <CollectionCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* ================= CATEGORY MODAL ================= */}
      <CategoryModal
        isOpen={Boolean(openCategory)}
        onClose={() => setOpenCategory(null)}
        title={openCategory}
        items={categoryModalData[openCategory] || []}
      />

      <Footer />
    </>
  );
};

export default HomePage;
