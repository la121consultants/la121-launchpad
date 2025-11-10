import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import CareerSuite from "@/components/CareerSuite";
import Ebooks from "@/components/Ebooks";
import Testimonials from "@/components/Testimonials";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <CareerSuite />
      <Ebooks />
      <Testimonials />
      <Booking />
      <Footer />
    </div>
  );
};

export default Index;
