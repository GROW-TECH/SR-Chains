import { useState } from "react";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { FiChevronDown } from "react-icons/fi";

export default function SupportPage() {
  return (
    <>
      {/* PAGE BACKGROUND */}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

        <div className="px-4 pt-3">
          <SearchBar placeholder="Search silver jewellery..." />
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10 text-sm">

          {/* HEADER */}
          <div className="bg-white/80 backdrop-blur border rounded-2xl p-6 mb-8">
            <h1 className="text-2xl font-bold mb-2">Support & Help</h1>
            <p className="text-gray-500">
              We’re here to help you with your silver jewellery purchases.
            </p>
          </div>

          {/* CONTACT */}
          <div className="bg-white border rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="font-semibold mb-4">Contact Us</h2>
            <div className="space-y-3 text-gray-700">
              <p>📞 <span className="font-medium">+91 98765 43210</span></p>
              <p>📧 <span className="font-medium">support@srchains.com</span></p>
              <p>🕒 Mon – Sat (10 AM – 7 PM)</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white border rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="font-semibold mb-5">Frequently Asked Questions</h2>

            <div className="divide-y">
              <FAQItem
                q="Is the silver jewellery hallmarked?"
                a="Yes, all our silver products are hallmarked and quality checked."
              />
              <FAQItem
                q="How long does delivery take?"
                a="Delivery usually takes 3–7 working days depending on your location."
              />
              <FAQItem
                q="Can I return or exchange a product?"
                a="Yes, returns and exchanges are accepted within 7 days of delivery."
              />
              <FAQItem
                q="Do prices change daily?"
                a="Yes, silver prices are based on daily market rates."
              />
            </div>
          </div>

          {/* ORDER HELP */}
          <div className="bg-white border rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="font-semibold mb-4">Order & Payment Help</h2>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>Issues with placing an order</li>
              <li>Payment failures or refunds</li>
              <li>Order tracking and delivery updates</li>
              <li>Bulk / wholesale enquiries</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-2xl p-8 text-center shadow-md">
            <h3 className="font-semibold mb-2">Need more help?</h3>
            <p className="text-gray-200 mb-5">
              Reach out to our support team and we’ll assist you shortly.
            </p>
            <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
              Contact Support
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

/* ================= FAQ ITEM ================= */

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="font-medium">{q}</span>
        <FiChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <p className="mt-3 text-gray-600 text-sm leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
};
