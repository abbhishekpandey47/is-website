import Image from "next/image";

export default function TrustedBySection() {
    // Placeholder for logos - you can replace these with your actual logos later
const fileList = [
  "aviator.png",
  "firstock-logo.webp",
  "cedana.png",
  "cerbos.png",
];

  
    return (
      <div className=" py-2 px-6 lg:pl-40">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h2 className="text-[20px] text-[#858588] font-normal mb-4">Trusted by</h2>
          
          {/* Logo placeholder container */}
          <div className="flex flex-wrap items-center pl-4">
            {fileList.map((company) => (
              <div 
                className="h-8 w-32 bg-transparent"
                style={{ 
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {/* Empty space for logo - you can replace this */}
                <div className="text-gray-400 text-sm">
                <Image
                  loading="lazy"
                  width={100}
                  height={30}
                  className="w-30 max-sm:w-30 text-gray-400 filter brightness-0 invert "
                  src={`/trustedby/${company}`}
                  alt="Ratio is 3.9"
                />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }