export default function SectionDivider() {
  const bg = "#0D0A1A";

  return (
    <div
      className="relative w-full pointer-events-none overflow-hidden"
      style={{ height: "30px" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 85% 100% at 50% 50%, #1A1430 0%, #120E25 45%, ${bg} 78%)`,
          filter: "blur(35px)",
        }}
      />
    </div>
  );
}
