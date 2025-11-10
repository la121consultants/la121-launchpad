import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary">
            About LA121 Consultants
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
            LA121 Consultants helps individuals stand out in a competitive job market through 
            tailored CVs, professional portfolios, and AI-powered tools. Led by experienced 
            consultants who understand what employers want, we empower you to take control 
            of your career journey.
          </p>
          
          <div className="pt-6">
            <Link to="/about">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
