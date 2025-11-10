import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Target, Award, TrendingUp, CheckCircle, Heart, Lightbulb, Zap } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Clients Helped" },
    { icon: Award, value: "85%", label: "Success Rate" },
    { icon: TrendingUp, value: "£10k+", label: "Avg. Salary Increase" },
    { icon: CheckCircle, value: "1000+", label: "CVs Transformed" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Personalised Support",
      description: "Every client gets tailored guidance that fits their unique career goals and aspirations."
    },
    {
      icon: Lightbulb,
      title: "Modern Innovation",
      description: "We combine expert insight with cutting-edge AI tools to deliver results-driven solutions."
    },
    {
      icon: Zap,
      title: "Real Results",
      description: "We focus on tangible outcomes - interviews secured, jobs landed, and careers transformed."
    },
    {
      icon: Target,
      title: "Accessible Excellence",
      description: "Making career growth accessible to everyone through free resources and affordable services."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            About <span className="text-primary">LA121 Consultants</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A forward-thinking UK-based career consultancy dedicated to helping individuals secure 
            meaningful roles through expert guidance, AI-powered tools, and hands-on career support.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                LA121 Consultants was founded with a simple belief: <strong className="text-foreground">career growth 
                should be accessible, modern, and results-driven</strong>. We saw too many talented individuals 
                struggling to stand out in today's competitive job market — not because they lacked skills, 
                but because they lacked the right tools and guidance.
              </p>
              <p>
                We specialise in supporting <strong className="text-foreground">graduates, job seekers, career changers, 
                and professionals</strong> who want to take control of their career journey. Our approach combines 
                real industry insight with modern AI innovation, ensuring every client gets personalised, 
                results-driven support tailored to their goals.
              </p>
              <p>
                Today, LA121 Consultants continues to bridge the gap between people and opportunities — 
                empowering individuals across industries to build careers that align with their goals and lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-8 md:p-12 rounded-2xl border border-primary/20">
              <p className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
                ✨ To make career growth accessible, modern, and results-driven — 
                helping you go from <span className="text-primary">overlooked to outstanding</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="p-8 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Free and professional CV reviews with actionable feedback",
              "AI CV Revamps to tailor your CV to specific roles",
              "Interview Preparation Sessions & Guides",
              "ShowIntro Bio Builder for LinkedIn & Instagram",
              "Career Portfolios to showcase your achievements",
              "Work Experience & Career Accelerator Programmes"
            ].map((service, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-foreground font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of professionals who've successfully landed their dream jobs with LA121 Consultants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#booking">
              <Button size="lg" className="px-8">
                Book Free Consultation
              </Button>
            </Link>
            <Link to="/#contact">
              <Button size="lg" variant="outline" className="px-8">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
