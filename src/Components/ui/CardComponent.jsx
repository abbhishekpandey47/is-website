"use client";

const CardComponent = ({ image, title, desc }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between min-h-[350px]"
    >
      <div className="h-24 bg-gray-100 rounded mb-4 flex items-center justify-center">
        {/* Replace with actual image or icon */}
        <span className="text-gray-400 text-lg">{image || "🖼️"}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>
      <p className="text-sm text-gray-900 font-medium">{desc}</p>
    </div>
  );
};

export default CardComponent;
