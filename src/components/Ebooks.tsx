import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen } from "lucide-react";
import interviewImg from "@/assets/interview.jpg";

const ebooks = [
  {
    title: "The Modern CV Guide",
    description: "Master the art of creating ATS-friendly CVs that get you noticed by recruiters and hiring managers.",
    downloadLink: "#",
    pages: "42 pages",
  },
  {
    title: "Interview Success Strategies",
    description: "Learn proven techniques to ace any interview, from preparation to follow-up, with real examples.",
    downloadLink: "#",
    pages: "36 pages",
  },
  {
    title: "LinkedIn Profile Optimization",
    description: "Transform your LinkedIn presence and attract recruiters with our step-by-step optimization guide.",
    downloadLink: "#",
    pages: "28 pages",
  },
  {
    title: "Career Transition Blueprint",
    description: "Navigate career changes confidently with strategies for pivoting industries or roles successfully.",
    downloadLink: "#",
    pages: "54 pages",
  },
];

const Ebooks = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${interviewImg})` }}
      >
        <div className="absolute inset-0 bg-secondary/95"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Free Resources</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Free Career Development eBooks
          </h2>
          <p className="text-lg text-white/80">
            Download our expert guides to accelerate your job search and career growth
          </p>
          <p className="text-accent font-semibold mt-2">
            🎁 Free for a limited time — grab yours today!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {ebooks.map((ebook, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow transition-all duration-300 border-border/20 bg-card/95 backdrop-blur-sm hover:-translate-y-2"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-secondary">{ebook.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {ebook.pages}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {ebook.description}
                </p>
                <Button 
                  className="w-full group-hover:scale-105 transition-transform"
                  asChild
                >
                  <a href={ebook.downloadLink} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download Free
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ebooks;
