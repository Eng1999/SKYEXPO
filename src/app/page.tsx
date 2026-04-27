import { HeroSection } from "@/components/home/HeroSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Additional home sections can be added here */}
      <section className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center px-8">
          <p className="text-xs tracking-[0.5em] uppercase text-white/20 mb-6">Sky Expo</p>
          <h2 className="text-4xl md:text-6xl font-extralight text-white/60 leading-tight">
            Where moments<br />
            <span style={{ color: "var(--accent)" }}>become legacy</span>
          </h2>
        </div>
      </section>
    </>
  );
}
