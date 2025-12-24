import { useNavigate } from "react-router-dom";
// import Header from "./Header"; // Add this import
// import SecondaryHeader from "../components/SecondaryHeader";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import CollectionCard from "../components/CollectionCard";
import Category from "../components/CategoryFilter";

/* ================= CATEGORIES DATA ================= */
const categoriesData = [
  {
    id: "rings",
    title: "Silver Rings",
    desc: "Elegant handcrafted silver rings",
    img: "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/218766e4f/beautiful-design-silver-kada-for-baby-boy-563va8195-563va8195.jpg",
    slug: "silver-rings",
  },
  {
    id: "necklaces",
    title: "Silver Necklaces",
    desc: "Timeless designs for every look",
    img: "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/22399cc11/graceful-bridal-silver-haram-set-208vt1608-208vt1608-208vs5820.jpg",
    slug: "silver-necklaces",
  },
  {
    id: "bangles",
    title: "Silver Bangles",
    desc: "Traditional & modern styles",
    img: "https://aurajewels.s3.amazonaws.com/images/AuraJewels/silbrc021p",
    slug: "silver-bangles",
  },
  {
    id: "anklets",
    title: "Silver Anklets",
    desc: "Delicate silver anklets for daily wear",
    img: "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/1517226c6/sterling-silver-men-s-party-wear-bracelet-208vo5368-208vo5368.jpg",
    slug: "silver-anklets",
  },
  {
    id: "earrings",
    title: "Silver Earrings",
    desc: "Classic and contemporary designs",
    img: "https://cdnmedia-breeze.vaibhavjewellers.com/media/catalog/product/cache/30d09bf8af51e4fea389519968dfdb4b/image/13551e210/92-5-sterling-silver-antique-drop-dangle-jhumkas-208vo8339-208vo8339.jpg",
    slug: "silver-earrings",
  },
  {
    id: "bracelets",
    title: "Silver Bracelets",
    desc: "Modern silver bracelets for every style",
    img: "https://www.giva.co/cdn/shop/files/BR0221_1.jpg?v=1694080362&width=713",
    slug: "silver-bracelets",
  },
];

/* ================= COLLECTIONS DATA ================= */
const collectionsData = [
  {
    id: 1,
    title: "Wedding Collection",
    desc: "Graceful silver jewellery for timeless weddings",
    img: "https://cdnmedia-breeze.vaibhavjewellers.com/media/webp_image/catalog/product/cache/1bdefe94714fcd7dcc850ab66b8f5472/image/270327763/celestial-flower-silver-necklace-set-with-blue-stones-6176mhoca22988.webp",
    slug: "wedding-collection",
  },
  {
    id: 2,
    title: "Everyday Elegance",
    desc: "Minimal silver pieces for daily wear",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0rOW_JdejNfVItD7MW6w5eirT7QDH-BATzbP_FtTVcIpcfHdDN81Re4&s",
    slug: "everyday-elegance",
  },
  {
    id: 3,
    title: "Festive Specials",
    desc: "Statement silver designs for celebrations",
    img: "https://static.vecteezy.com/system/resources/thumbnails/027/062/824/small_2x/silver-necklace-on-a-solid-color-background-in-close-up-ai-generative-photo.jpeg",
    slug: "festive-specials",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="relative min-h-[80vh] flex flex-col items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://t4.ftcdn.net/jpg/01/49/30/53/240_F_149305346_Baj4gSO2q9b0dQzZ53cdTksOXC2nQhyR.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 w-full flex flex-col items-center px-6">
          <h1 className="text-5xl md:text-6xl font-serif tracking-widest mt-10 text-center">
            SR Chains
          </h1>

          <p className="text-xl md:text-3xl text-center mt-4 max-w-3xl">
            Discover Elegant Silver Jewellery for Every Occasion
          </p>

          <div className="w-full max-w-3xl mt-8">
            <SearchBar placeholder="Search rings, necklaces, bangles..." />
          </div>
        </div>
      </div>
      {/* ================= SHOP BY CATEGORY ================= */}
      <section className="px-6 md:px-20 pt-16 pb-20 bg-[#FFF7F7]">
        <h2 className="text-4xl text-center mb-12 text-[#7A4A4A]">
          Shop by Category
        </h2>
        <Category />
      </section>
      {/* ================= CATEGORY CARDS ================= */}
      <section className="px-6 md:px-20 py-20 bg-gray-50">
        <h2 className="text-4xl text-center mb-12 font-medium">
          Popular Categories
        </h2>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {categoriesData.map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.title}
              desc={cat.desc}
              img={cat.img}
              onClick={() =>
                navigate("/categories", { state: { category: cat.slug } })
              }
            />
          ))}
        </div>
      </section>
      {/* ================= COLLECTIONS ================= */}
      <section className="px-6 md:px-20 py-20 bg-gray-50">
        <h2 className="text-4xl text-center mb-12">
          Featured Silver Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionsData.map((col) => (
            <CollectionCard
              key={col.id}
              title={col.title}
              desc={col.desc}
              img={col.img}
              onClick={() => navigate(`./categories`)}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
