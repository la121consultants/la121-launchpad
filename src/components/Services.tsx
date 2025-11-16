import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, Rocket, Crown, Check, Sparkles, GraduationCap } from "lucide-react";

const studentOffer = {
  icon: GraduationCap,
  name: "Student Winter Offer",
  price: "£49.99",
  originalPrice: "£69.99",
  description: "Special student pricing for essential career tools",
  features: [
    "CV Review",
    "CV Revamp",
    "1-Page Career Portfolio"
  ],
  badge: "Limited Time"
};

const packages = [
  {
    icon: Briefcase,
    name: "Basic Plus Package",
    price: "£99",
    studentPrice: "£69.99",
    description: "Perfect for students and entry-level professionals",
    features: [
      "CV Review",
      "CV Revamp",
      "1-Page Portfolio"
    ],
    popular: false
  },
  {
    icon: TrendingUp,
    name: "Essential Career Starter",
    price: "£129",
    description: "Complete package to kickstart your career journey",
    features: [
      "CV Review",
      "CV Revamp",
      "Cover Letter",
      "Interview Prep (30 mins)",
      "Starter Portfolio",
      "Unlimited CV AI Tool Access",
      "WhatsApp Community"
    ],
    popular: false
  },
  {
    icon: Rocket,
    name: "Career Accelerator",
    price: "£249",
    description: "Comprehensive support for serious job seekers",
    features: [
      "CV Review",
      "CV Revamp",
      "Cover Letter",
      "Interview Prep (45 mins)",
      "Job Strategy",
      "Application Support (1 role)",
      "Starter Portfolio",
      "Unlimited CV AI Access",
      "Unlimited ShowIntroBio Access"
    ],
    popular: true
  },
  {
    icon: Crown,
    name: "Premium Mentorship Programme",
    price: "£499",
    description: "Full career transformation with premium support",
    features: [
      "Full CV Revamp",
      "LinkedIn Optimisation",
      "Cover Letter",
      "2× Interview Prep Sessions",
      "Job Search Support",
      "Application Support (2 roles)",
      "Professional Portfolio (3–4 Pages)",
      "Unlimited CV AI Access",
      "Unlimited ShowIntroBio Access"
    ],
    popular: false
  }
];

const addOns = [
  { name: "Unlimited CV Access", price: "£199", category: "Tools" },
  { name: "Unlimited ShowIntroBio Access", price: "£39", category: "Tools" },
  { name: "Additional CV Revamp", price: "£49", category: "CV Services" },
  { name: "Multiple CV Pack (Up to 3)", price: "£99", category: "CV Services" },
  { name: "Cover Letter Rewrite", price: "£35", category: "Cover Letter" },
  { name: "Cover Letter Review", price: "£20", category: "Cover Letter" },
  { name: "Application Support (Per Role)", price: "£50", category: "Job Search" },
  { name: "Job Search Strategy Session", price: "£69", category: "Job Search" },
  { name: "Interview Prep (Standard)", price: "£65", category: "Interview" },
  { name: "Premium Interview Prep", price: "£99", category: "Interview" },
  { name: "Multiple Interview Pack (4)", price: "£399", category: "Interview" },
  { name: "Starter Portfolio", price: "£99", category: "Portfolio" },
  { name: "Professional Portfolio", price: "£149–£179", category: "Portfolio" },
  { name: "Personal Brand Portfolio", price: "£249–£299", category: "Portfolio" },
  { name: "Premium Portfolio", price: "£399–£499", category: "Portfolio" },
  { name: "Custom Domain", price: "£25–£30", category: "Portfolio" },
  { name: "Domain Subscription", price: "£5/month", category: "Portfolio" },
  { name: "Maintenance & Updates", price: "£10/month or £79.99/year", category: "Portfolio" },
  { name: "Portfolio + Bio Combo", price: "£69", category: "Portfolio" },
  { name: "1:1 Portfolio Review Call", price: "£35", category: "Consultation" },
  { name: "1:1 Mentorship Hour", price: "£60", category: "Consultation" },
  { name: "Email Support (30 Days)", price: "£25", category: "Support" },
  { name: "Career Roadmap Session", price: "£50", category: "Consultation" }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            One-to-One Career Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Personalized career consulting packages designed to help you succeed
          </p>
        </div>
        
        {/* Main Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`group hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border-border/50 ${
                pkg.popular ? 'border-primary border-2' : ''
              }`}
            >
              <CardHeader>
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold rounded-bl-lg rounded-tr-lg">
                    POPULAR
                  </div>
                )}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <pkg.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl text-secondary">{pkg.name}</CardTitle>
                <div className="text-3xl font-bold text-primary mt-2">{pkg.price}</div>
                <CardDescription className="text-base mt-2">{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-secondary hover:bg-secondary/90 text-white"
                  onClick={() => {
                    const bookingSection = document.getElementById('booking');
                    bookingSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services Accordion */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-secondary text-center mb-8">
            Additional Services & Pricing
          </h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="consultations">
              <AccordionTrigger className="text-lg font-semibold">
                One-to-One Consultations
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  {consultationServices.map((service, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-primary mb-2">{service.price}</div>
                        <div className="font-semibold text-secondary mb-1">{service.duration}</div>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="additional">
              <AccordionTrigger className="text-lg font-semibold">
                À La Carte Services
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {additionalServices.map((service, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="pt-6 flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-secondary mb-1">{service.service}</div>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        <div className="text-lg font-bold text-primary whitespace-nowrap ml-4">
                          {service.price}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <p className="text-sm text-center text-foreground/80">
                    <span className="font-semibold">10% student discount available</span> on all services
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Services;
