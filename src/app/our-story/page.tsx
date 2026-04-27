import { ParallaxDepth } from "@/components/our-story/ParallaxDepth";

export const metadata = {
  title: "Our Story — Sky Expo",
};

export default function OurStoryPage() {
  return (
    <>
      <ParallaxDepth />

      {/* Additional story sections */}
      <section className="min-h-screen bg-black flex items-center justify-center px-8">
        <div className="max-w-3xl text-center">
          <h3
            className="text-3xl md:text-5xl font-light leading-relaxed"
            style={{ color: "#FED172" }}
          >
            &ldquo;We don&apos;t build booths.<br />We build moments.&rdquo;
          </h3>
          <p className="mt-8 text-white/30 text-sm tracking-widest">
            — Sky Expo Founding Vision
          </p>
        </div>
      </section>
    </>
  );
}
