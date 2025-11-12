import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Download, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const ebooks = [
    { title: "Returning to Work After Having a Baby", filename: "/ebooks/returning-to-work-after-baby.pdf" },
    { title: "Smart Ways to Use AI to Land Your Next Job", filename: "/ebooks/smart-ways-to-use-ai.pdf" },
    { title: "Side Hustle Success Playbook", filename: "/ebooks/side-hustle-success-playbook.pdf" },
    { title: "Networking: Unlocking Career Success", filename: "/ebooks/networking-career-success.pdf" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your ebook(s) are ready to download.
            </p>
            {sessionId && (
              <p className="text-sm text-muted-foreground mt-2">
                Order ID: {sessionId}
              </p>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Download Your Ebooks</CardTitle>
              <CardDescription>
                Click on any ebook below to download it to your device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {ebooks.map((ebook, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-between"
                  asChild
                >
                  <a href={ebook.filename} download>
                    <span>{ebook.title}</span>
                    <Download className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your email address with download links.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
