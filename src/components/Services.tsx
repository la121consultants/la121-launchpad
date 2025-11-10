import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Briefcase, Sparkles, Users, TrendingUp, Rocket, Check } from "lucide-react";

const packages = [
  {
    icon: Briefcase,
    name: "Basic Career Boost",
    price: "£159",
    description: "Perfect for getting started with professional career support",
    features: [
      "CV review and revamp",
      "Professional cover letter",
      "1 interview preparation session",
      "Email support"
    ],
    popular: false
  },
  {
    icon: TrendingUp,
    name: "Premium Career Accelerator",
    price: "£250",
    description: "Comprehensive support for serious job seekers",
    features: [
      "CV review and revamp",
      "Professional cover letter",
      "1 interview preparation session",
      "Application support",
      "Job search support",
      "Priority email support"
    ],
    popular: true
  },
  {
    icon: Rocket,
    name: "Personal Mentorship Program",
    price: "£499",
    description: "Full career transformation with AI tools and personal guidance",
    features: [
      "AI CV Revamp & Pro User Access",
      "Professional CV review & enhancement",
      "Personalized cover letter",
      "2 hours of 1:1 personal mentorship",
      "Job search & application support",
      "2 interview preparation sessions (2 hours total)",
      "Exclusive LA121 WhatsApp community access"
    ],
    popular: false
  },
  {
    icon: Sparkles,
    name: "Executive Career Branding",
    price: "Contact Us",
    description: "Position yourself for a £10,000+ salary increase in 6 weeks",
    features: [
      "Career strategy session (1:1 Zoom)",
      "AI-enhanced CV transformation",
      "Tailored cover letter & personal statement",
      "LinkedIn profile optimisation",
      "Interview confidence accelerator",
      "30-day ongoing support",
      "Results within 6 weeks"
    ],
    popular: false
  }
];

const consultationServices = [
  { duration: "30 minutes", price: "£50", description: "Quick career guidance session" },
  { duration: "1 hour", price: "£75", description: "In-depth consultation" },
  { duration: "2 hours", price: "£99", description: "Comprehensive career planning" },
];

const additionalServices = [
  { service: "CV Review Only", price: "£30", description: "Expert highlights areas for improvement" },
  { service: "CV Revamp", price: "£99", description: "Complete expert redo tailored to your skills" },
  { service: "CV Revamp & Cover Letter", price: "£125", description: "Full CV transformation plus cover letter" },
  { service: "Multiple CV Revamp", price: "£199", description: "Up to 3 CVs for different roles" },
  { service: "Interview Prep - Standard", price: "£65", description: "Standard interview preparation" },
  { service: "Interview Prep - Premium", price: "£125", description: "Detailed research on you and the role" },
  { service: "Cover Letter Review", price: "£30", description: "Expert feedback on your cover letter" },
  { service: "Cover Letter Creation", price: "£99", description: "Professional cover letter from scratch" },
  { service: "Job Search Support", price: "£49", description: "CV review + job search consultation" },
  { service: "Career Portfolio", price: "From £99", description: "Professional online portfolio" }
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
