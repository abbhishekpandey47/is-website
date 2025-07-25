import DownloadSetion from "./download";
import Hero from "./hero";
import Cta from "./cta";

export default function Page() {

  return (
    <div className="mt-36">
      <DownloadSetion />
      <div
        className="mb-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>

        <Hero />
      </div>
      <div
        className="mb-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>

        <Cta />
      </div>
    </div>
  )
}