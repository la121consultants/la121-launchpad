import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";

const Booking = () => {
  return (
    <section id="booking" className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Book a 10-Minute Strategy Call
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss your career goals and find the perfect solution for you
            </p>
          </div>
          
          <Card className="border-2 border-primary/20 shadow-soft">
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-secondary">Free Strategy Session</CardTitle>
              <CardDescription className="text-base">
                No commitment required • Personalized advice • Quick and convenient
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <Clock className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm font-semibold">10 Minutes</p>
                  <p className="text-xs text-muted-foreground">Quick & focused</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <Video className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm font-semibold">Video Call</p>
                  <p className="text-xs text-muted-foreground">Face-to-face online</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm font-semibold">Flexible Times</p>
                  <p className="text-xs text-muted-foreground">Book at your convenience</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Choose a time that works for you from our available slots
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6"
                  onClick={() => window.open('https://calendar.google.com/calendar/appointments/schedules/AcZssZ0la121consultants', '_blank')}
                >
                  Schedule My Call Now
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  You'll receive a confirmation email immediately after booking
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Booking;
