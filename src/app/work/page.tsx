import { HorizontalScroll } from "@/components/work/HorizontalScroll";

export const metadata = {
  title: "Work — Sky Expo",
};

export default function WorkPage() {
  return (
    <>
      <div className="h-24 bg-black" />
      <section className="px-8 py-16 bg-black">
        <p className="text-xs tracking-[0.5em] uppercase text-white/30 mb-4">Portfolio</p>
        <h1
          className="text-5xl md:text-7xl font-light text-white"
          style={{ color: "#B83A14" }}
        >
          Our Work
        </h1>
      </section>
      <HorizontalScroll />
    </>
  );
}
