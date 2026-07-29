import { HeroSection } from "@/sections/home/HeroSection";
import { MarqueeSection } from "@/sections/home/MarqueeSection";
import { WatchItWorkSection } from "@/sections/home/WatchItWorkSection";
import { ServicesSection } from "@/sections/home/ServicesSection";
import { UseCaseTeaserSection } from "@/sections/home/UseCaseTeaserSection";
import { RoiSection } from "@/sections/home/RoiSection";
import { ProcessTeaserSection } from "@/sections/home/ProcessTeaserSection";
import { WhySection } from "@/sections/home/WhySection";
import { PrincipleBandSection } from "@/sections/home/PrincipleBandSection";
import { InsightsTeaserSection } from "@/sections/home/InsightsTeaserSection";
import { FinalCtaSection } from "@/sections/home/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <WatchItWorkSection />
      <ServicesSection />
      <UseCaseTeaserSection />
      <RoiSection />
      <ProcessTeaserSection />
      <WhySection />
      <PrincipleBandSection />
      <InsightsTeaserSection />
      <FinalCtaSection />
    </>
  );
}
