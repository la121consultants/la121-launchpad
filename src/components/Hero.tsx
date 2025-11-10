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
        line1: "Helping You Land the",
        line2: "Right Role — Faster"
      }}
      subtitle="AI-powered CVs, Portfolios, and Career Tools designed for the modern job market."
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
