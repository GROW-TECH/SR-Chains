import {
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F8F8F8] px-20 max-[500px]:px-7 pb-8 text-gray-500">
      {/* Top */}
      <div className="flex justify-between items-center py-10 flex-wrap gap-6">
        <h2 className="text-3xl font-serif tracking-widest text-black">
          SR Chains
        </h2>

        <div className="flex items-center gap-2 p-2 border border-gray-400 rounded">
          <span className="text-black text-sm">India</span>
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-20 max-[500px]:gap-10 flex-wrap">
        <div className="flex flex-col gap-1 text-sm max-[500px]:text-xs">
          <h4 className="font-medium text-black tracking-widest mb-2">
            ABOUT SILVER
          </h4>
          <span>Our Story</span>
          <span>Craftsmanship</span>
          <span>Careers</span>
          <span>Press</span>
          <span>Contact Us</span>
        </div>

        <div className="flex flex-col gap-1 text-sm max-[500px]:text-xs">
          <h4 className="font-medium text-black tracking-widest mb-2">
            COLLECTIONS
          </h4>
          <span>Rings</span>
          <span>Necklaces</span>
          <span>Bangles</span>
          <span>Wedding Jewellery</span>
        </div>

        <div className="flex flex-col gap-1 text-sm max-[500px]:text-xs">
          <h4 className="font-medium text-black tracking-widest mb-2">
            CUSTOMER CARE
          </h4>
          <span>Shipping</span>
          <span>Returns</span>
          <span>FAQs</span>
          <span>Size Guide</span>
        </div>

        <div className="flex flex-col gap-1 text-sm max-[500px]:text-xs">
          <h4 className="font-medium text-black tracking-widest mb-2">LEGAL</h4>
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
          <span>Sitemap</span>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-medium text-black tracking-widest mb-2">
            SOCIAL LINKS
          </h4>
          <div className="flex gap-2 text-lg">
            <FaLinkedinIn className="text-white bg-black rounded-full p-2 cursor-pointer" />
            <FaInstagram className="text-white bg-black rounded-full p-2 cursor-pointer" />
            <FaTwitter className="text-white bg-black rounded-full p-2 cursor-pointer" />
            <FaYoutube className="text-white bg-black rounded-full p-2 cursor-pointer" />
            <FaFacebookF className="text-white bg-black rounded-full p-2 cursor-pointer" />
          </div>
        </div>
      </div>

      <hr className="mt-16 max-[500px]:mt-10 mb-6 h-[1px] bg-gray-300" />

      {/* Bottom */}
      <p className="text-sm max-[500px]:text-xs tracking-wide text-center">
        © {new Date().getFullYear()} SILVER. All rights reserved. Crafted with
        elegance in silver.
      </p>
    </footer>
  );
};

export default Footer;
