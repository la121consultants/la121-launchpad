import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatedShaderHero
      trustBadge={{
        text: "Trusted by 2,500+ UK professionals",
        icons: ["⭐"]
      }}
      headline={{
        line1: "Land the roles you deserve",
        line2: "with strategic career consulting"
      }}
      subtitle="Interview-ready CVs, confident storytelling, and proven job-search strategies that lead to more interviews, offers, and clarity for graduates, job changers, and ambitious UK professionals."
      buttons={{
        primary: {
          text: "Book a Free Strategy Call",
          onClick: () => scrollToSection("booking")
        },
        secondary: {
          text: "Explore Career Services",
          onClick: () => scrollToSection("career-suite")
        }
      }}
      logoCloud={{
        heading: "LA121 consultants have powered careers within leading UK employers",
        logos: [
          { name: "Capgemini", initials: "CG" },
          { name: "KPMG", initials: "KPMG" },
          { name: "FinTech Innovators", initials: "FT" },
          { name: "High-Growth Tech Teams", initials: "TECH" },
          { name: "Graduate Programmes", initials: "GRAD" },
          { name: "Enterprise Rent-A-Car", initials: "ERAC" },
          { name: "Unilabs", initials: "UL" },
          { name: "Hammersmith & Fulham Council", initials: "H&F" }
        ]
      }}
    />
  );
};

export default Hero;
