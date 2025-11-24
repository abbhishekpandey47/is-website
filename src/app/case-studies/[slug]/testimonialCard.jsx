import Image from "next/image";

export default function TestimonialCard({ data }) {
  if (!data) return null;
  return (
<div className="flex flex-col md:!flex-row bg-[#0B0B23] text-white rounded-2xl p-8 border border-[#243B7A] items-center gap-8 shadow-xl">
      <div className="flex flex-col items-center text-center md:text-left md:items-start min-w-[200px]">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#243B7A]">
          <Image
            src={data[0].imgSrc}
            alt={data[0].personName || "Profile"}
            width={160}
            height={160}
            style={{margin:0}}
          />
        </div>
        <h3 className="text-lg md:text-xl font-bold mt-4">{data[0].personName}</h3>
        <p className="text-sm md:text-lg opacity-80">{data[0].personTitle}</p>
      </div>

      <div className="text-base md:text-lg leading-relaxed opacity-90 mt-4 md:mt-0">
        {data[0].quote}
      </div>
    </div>
  );
}