import { CapabilitiesGrid } from "@/components/capabilities/CapabilitiesGrid";

export const metadata = {
  title: "Capabilities — Sky Expo",
};

export default function CapabilitiesPage() {
  return (
    <>
      <div className="h-24 bg-black" /> {/* Navbar spacer */}
      <CapabilitiesGrid />
    </>
  );
}
