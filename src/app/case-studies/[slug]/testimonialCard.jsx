import Image from "next/image";

export default function TestimonialCard({data}) {
  return (
    <div className="bg-[#0B0B23] text-white rounded-2xl p-8 border border-[#243B7A] mx-auto flex flex-row items-center gap-8 shadow-xl">
      <div className="flex flex-col items-center text-center md:text-left md:items-start min-w-[200px]">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#243B7A]">
          <Image
            src={data[0].imgSrc}
            alt="Profile"
            width={160}
            height={160}
            className="object-cover"
            style={{margin:0}}
          />
        </div>
        <h2 className="text-xl font-bold mt-4">{data[0].personName}</h2>
        <p className="text-lg opacity-80">{data[0].personTitle}</p>
      </div>

      <div className="flex-1 text-lg leading-relaxed opacity-90 italic">
        {data[0].quote}
      </div>
    </div>
  );
}