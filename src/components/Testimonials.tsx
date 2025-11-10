import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content: "LA121 Consultants transformed my CV and helped me land my dream role in just 3 weeks. The AI tools are game-changing!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    content: "The Career Accelerator Program gave me the structure and confidence I needed. Within 2 months, I had multiple job offers.",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Recent Graduate",
    content: "The portfolio service showcased my projects beautifully. Recruiters were impressed, and I secured my first role much faster than expected.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of professionals who've accelerated their careers with LA121
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-soft transition-all duration-300 border-border/50">
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed">{testimonial.content}</p>
                <div className="pt-4 border-t border-border/50">
                  <p className="font-semibold text-secondary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
