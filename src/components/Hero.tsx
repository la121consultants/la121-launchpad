import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatedShaderHero
      trustBadge={{
        text: "Trusted by professionals across industries",
        icons: ["⭐"]
      }}
      headline={{
        line1: "Personalised One-to-One",
        line2: "Career Consulting"
      }}
      subtitle="Get expert guidance on CVs, interviews, and career strategy. Transform your job search with AI-powered tools and personalized mentorship from LA121 Consultants."
      buttons={{
        primary: {
          text: "Book a Free Strategy Call",
          onClick: () => scrollToSection("booking")
        },
        secondary: {
          text: "Explore the Career Suite",
          onClick: () => scrollToSection("career-suite")
        }
      }}
    />
  );
};

export default Hero;
