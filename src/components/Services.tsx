import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Sparkles, Users, TrendingUp, Rocket } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "AI CV Revamp Service",
    description: "Tailor your CV to any job instantly with our AI-powered tool.",
    price: "From £29",
    link: "https://cv.la121consultants.co.uk",
    buttonText: "Revamp My CV",
  },
  {
    icon: FileText,
    title: "ShowIntro Bio Builder",
    description: "Build a powerful personal brand bio for LinkedIn or Instagram.",
    price: "From £19",
    link: "https://showintrobio.la121consultants.co.uk",
    buttonText: "Create My Bio",
  },
  {
    icon: Briefcase,
    title: "Career Portfolio Creation",
    description: "We design and build your professional portfolio showcasing your experience, metrics, and projects.",
    price: "From £149",
    link: "#",
    buttonText: "Get My Portfolio Built",
  },
  {
    icon: Rocket,
    title: "AI Career Building Services",
    description: "AI-assisted interview prep, career roadmaps, and strategy tools with LA121 Job Ready AI.",
    price: "From £49",
    link: "#",
    buttonText: "Start Building",
  },
  {
    icon: Users,
    title: "Work Experience Programs",
    description: "Gain real-world experience and boost your employability with structured programs.",
    price: "Contact Us",
    link: "#",
    buttonText: "Sign Up",
  },
  {
    icon: TrendingUp,
    title: "Career Accelerator Program",
    description: "6-week structured program for job seekers and graduates.",
    price: "£29.99/month",
    link: "#",
    buttonText: "Join Program",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Our Professional Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose from our range of expert services designed to accelerate your career growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border-border/50"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl text-secondary">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                </div>
                <Button
                  className="w-full bg-secondary hover:bg-secondary/90 text-white"
                  onClick={() => window.open(service.link, '_blank')}
                >
                  {service.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
