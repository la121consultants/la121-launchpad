import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PartnershipForm from '@/components/PartnershipForm';

const Partnership = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner With Us</h1>
            <p className="text-lg text-muted-foreground">
              Are you a recruiter or organization looking for career services at scale? 
              We offer customized partnership packages with competitive pricing and dedicated support.
            </p>
          </div>
          <PartnershipForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Partnership;
