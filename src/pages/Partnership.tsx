import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PartnershipForm from '@/components/PartnershipForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Handshake, Users, Building2, HeartHandshake } from 'lucide-react';

const partnershipBenefits = [
  {
    icon: Handshake,
    title: 'Custom Packages',
    description: 'Tailored service packages designed for your organization\'s specific needs',
  },
  {
    icon: Users,
    title: 'Bulk Discounts',
    description: 'Competitive pricing for high-volume partnerships with flexible payment terms',
  },
  {
    icon: Building2,
    title: 'Dedicated Support',
    description: 'Priority support with a dedicated account manager for seamless collaboration',
  },
  {
    icon: HeartHandshake,
    title: 'Flexible Terms',
    description: 'Customizable contracts and service agreements to match your business model',
  },
];

const idealPartners = [
  'Recruitment Agencies',
  'Corporate HR Departments',
  'Universities & Career Services',
  'Staffing Firms',
  'Business Consulting Firms',
  'Professional Development Organizations',
];

const Partnership = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 mx-auto">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Handshake className="w-4 h-4" />
              <span className="text-sm font-semibold">B2B Partnerships</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Partner With LA121 Consultants</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join forces with us to provide exceptional career services to your clients, employees, or members. 
              We offer customized partnership packages with competitive pricing and dedicated support.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-10">Partnership Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Ideal Partners Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-accent/20 border-accent/40">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Ideal For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {idealPartners.map((partner, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{partner}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What We Offer Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-6">What We Offer Partners</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">🎯 For Recruiters</h3>
                  <p className="text-muted-foreground">
                    Help your candidates stand out with professional CVs, interview coaching, and career portfolios. 
                    White-label options available for agencies looking to offer career services under their brand.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">🏢 For Corporate HR</h3>
                  <p className="text-muted-foreground">
                    Support your employees' career development with our comprehensive packages. Perfect for 
                    outplacement programs, internal mobility, and employee upskilling initiatives.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">🎓 For Educational Institutions</h3>
                  <p className="text-muted-foreground">
                    Enhance your career services with expert support for students and alumni. Discounted rates 
                    for bulk student packages and career center partnerships.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">📋 Job Board Services</h3>
                  <p className="text-muted-foreground mb-4">
                    Post your job openings on our job board and get access to our pool of pre-screened, 
                    career-ready candidates. Perfect for companies looking to fill positions with qualified talent.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Single or multiple job postings with flexible pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Featured listings for increased visibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Direct access to our pre-screened candidate database</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Monthly subscription options for unlimited postings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <PartnershipForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Partnership;
