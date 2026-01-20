import React from "react";

/* ================= CUSTOMER FEEDBACK DATA ================= */
const feedbackData = [
  {
    id: 1,
    name: "Ramesh",
    rating: 5,
    comment: "Super quality 👌 weight correct-ah irundhuchu",
  },
  {
    id: 2,
    name: "Lakshmi",
    rating: 4,
    comment: "Design romba nalla iruku. Delivery fast.",
  },
  {
    id: 3,
    name: "Suresh",
    rating: 5,
    comment: "Daily wear-ku perfect. Worth for money.",
  },
];

export default function CustomerFeedback() {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <h2 className="text-lg font-semibold mb-4">Customer Feedback</h2>

      <div className="space-y-4">
        {feedbackData.map((f) => (
          <div key={f.id} className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center">
              <p className="font-medium">{f.name}</p>
              <p className="text-yellow-500 text-sm">{"★".repeat(f.rating)}</p>
            </div>

            <p className="text-sm text-gray-600 mt-1">{f.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
