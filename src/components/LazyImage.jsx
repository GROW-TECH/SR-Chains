import { useState } from "react";

export default function LazyImage({ src, alt = "", className = "" }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
      {/* PLACEHOLDER */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <span className="text-xs text-gray-500">Loading...</span>
        </div>
      )}

      {/* IMAGE */}
      <img
        src={src}
        alt={alt}
        loading="lazy" // ✅ Lazy load
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}
