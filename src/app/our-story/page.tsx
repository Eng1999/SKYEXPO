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
      {/* Main: 3-panel 3D scroll with real video */}
      <OurStoryScroll videoSrc="/videos/skyexpo-work-2025.mp4" />

      {/* Stats strip */}
      <OurStoryStats />

      {/* Client logos */}
      <ClientLogos />

      {/* Values + quote + CTA */}
      <OurStoryValues />
    </>
  );
}
