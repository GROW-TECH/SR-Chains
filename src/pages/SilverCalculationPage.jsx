import { useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

export default function SilverCalc() {
  const { state } = useLocation();

  const [weight, setWeight] = useState(0);
  const [rate, setRate] = useState(0);
  const [making, setMaking] = useState(0);
  const [gst, setGst] = useState(3);

  /* ================= AUTO UPDATE ON VARIANT ================= */
  useEffect(() => {
    if (!state) return;

    setWeight(state.weight || 0);
    setRate(state.rate || 0);
    setMaking(state.making || 0);
  }, [state]);

  /* ================= CALC ================= */
  const result = useMemo(() => {
    const silver = weight * rate;
    const subTotal = silver + making;
    const gstAmount = (subTotal * gst) / 100;

    return {
      silver,
      gstAmount,
      total: subTotal + gstAmount,
    };
  }, [weight, rate, making, gst]);

  return (
    <>
      <div className="sticky top-0 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <SearchBar placeholder="Search silver jewellery..." />
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-1">Silver Price Breakup</h1>

        <p className="text-sm text-gray-500 mb-4">
          {state?.name} • Variant {state?.variant}
        </p>

        <div className="border rounded-xl p-4 text-sm space-y-2">
          <Row label="Weight" value={`${weight} g`} />
          <Row label="Rate / g" value={`₹${rate}`} />
          <Row label="Making" value={`₹${making}`} />
          <Row label="Silver Price" value={`₹${result.silver}`} />
          <Row label="GST" value={`₹${result.gstAmount}`} />
          <hr />
          <Row label="Final Price" value={`₹${result.total}`} bold />
        </div>
      </div>

      <Footer />
    </>
  );
}

const Row = ({ label, value, bold }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span className={bold ? "font-bold text-base" : "font-medium"}>
      {value}
    </span>
  </div>
);
