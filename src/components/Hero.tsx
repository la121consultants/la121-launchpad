import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatedShaderHero
      trustBadge={{
        text: "Career Consultant UK team trusted by professionals",
        icons: ["⭐"]
      }}
      headline={{
        line1: "Professional CV Writing",
        line2: "and Career Coaching UK"
      }}
      subtitle="Partner with LA121's CV Revamp Service UK for interview preparation, graduate CV services, and job search support powered by AI tools and personal mentorship."
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
