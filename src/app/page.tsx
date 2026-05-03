import { HeroSection } from "@/components/home/HeroSection";
import { HomeIntro } from "@/components/home/HomeIntro";
import { CEOMessage } from "@/components/our-story/CEOMessage";
import { HomeFeaturedWork } from "@/components/home/HomeFeaturedWork";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeIntro />
      <CEOMessage />
      <HomeFeaturedWork />
    </>
  );
}
