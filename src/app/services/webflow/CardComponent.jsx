import Image from "next/image";

const CardComponent = ({ image, title, desc }) => {
  return (
    <div className="shadow-md bg-gradient-to-br from-[#231442] to-[#331a63] flex flex-col text-start min-h-[250px] bg-white border rounded-xl p-4"
    style={{
      background: `linear-gradient(35deg, rgba(71, 24, 99, 0.2) 10%, rgba(118, 67, 175, 0.5) 50%, rgba(193, 145, 231, 0.2) 100%)`,
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
    }}

    >
      {/* Image Section */}
      <div className="w-full h-[200px] overflow-hidden items-stretch rounded-md ">
        {image ? (
          <Image
            src={image.src}
            alt={title || "Card Image"}
            width={450} 
            height={0} 
            className="object-contain border-2 border-black"
          />
        ) : (
          <span className="text-lg">🖼️</span> 
        )}
      </div>

      {/* Title Section */}
      <h3 className="text-4xl mb-3 text-white px-4">{title}</h3>

      {/* Description Section */}
      <p className="text-base text-white px-5">{desc}</p>
    </div>
  );
};

export default CardComponent;