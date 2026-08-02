import { 
  HeroSection, 
  StatsBanner, 
  CampaignsSection, 
  HowItWorksSection, 
  TrustSection, 
  TestimonialsSection, 
  CTASection 
} from "@/components";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Platform Statistics */}
      <StatsBanner />

      {/* Featured Campaigns Grid & Filter */}
      <CampaignsSection />

      {/* How Platform Works */}
      <HowItWorksSection />

      {/* Security & Trust Features */}
      <TrustSection />

      {/* Creator Testimonials */}
      <TestimonialsSection />

      {/* High-Impact CTA Banner */}
      <CTASection />
    </div>
  );
}
