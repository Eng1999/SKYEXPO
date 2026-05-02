import { OurStoryScroll } from "@/components/our-story/OurStoryScroll";
import { OurStoryStats } from "@/components/our-story/OurStoryStats";
import { OurStoryValues } from "@/components/our-story/OurStoryValues";
import { ClientLogos } from "@/components/shared/ClientLogos";

export const metadata = {
  title: "Our Story — Sky Expo",
  description: "Founded in Riyadh in 2009, Sky Expo crafts world-class exhibitions and events.",
};

export default function OurStoryPage() {
  return (
    <>
      {/* Main: 3-panel 3D scroll — one video per panel */}
      <OurStoryScroll videos={[
        "/videos/abraj-alolaya.mp4",    // Panel 01 — The Blueprint
        "/videos/mawhiba.mp4",          // Panel 02 — A Culture of Excellence
        "/videos/roshn.mp4",            // Panel 03 — A Vision Forward
      ]} />

      {/* Stats strip */}
      <OurStoryStats />

      {/* Client logos */}
      <ClientLogos />

      {/* Values + quote + CTA */}
      <OurStoryValues />
    </>
  );
}
