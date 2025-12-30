import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-bg.jpg";
import { UserPlus, ClipboardList, Video } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Traditional Hindu Ritual Setting" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold">नवविध भक्ति | Navavidha Bhakti</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
              Connect with Qualified Priests for Remote Hindu Rituals
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Experience authentic Vedic rituals from anywhere in the world. Our verified priests perform traditional ceremonies via video call with devotion and precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => navigate("/login")}
              >
                Book a Ritual Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => navigate("/login")}
              >
                Join as Priest
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">100+</div>
                <div className="text-sm text-muted-foreground">Verified Priests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Rituals Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">4.9★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold mb-6">Why Choose Remote Ritual Service</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Preserving sacred traditions while embracing modern technology to keep dharmic practices accessible to all.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="shadow-soft hover:shadow-medium transition-shadow border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">🕉️</div>
                  <h3 className="font-serif text-xl font-bold mb-3">Verified Priests</h3>
                  <p className="text-muted-foreground">
                    All priests are verified for their Vedic knowledge, qualifications, and years of experience in traditional rituals.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-soft hover:shadow-medium transition-shadow border-l-4 border-l-secondary">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="font-serif text-xl font-bold mb-3">Global Accessibility</h3>
                  <p className="text-muted-foreground">
                    Conduct authentic Hindu rituals from anywhere in the world, overcoming geographical barriers.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-soft hover:shadow-medium transition-shadow border-l-4 border-l-accent">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">🔐</div>
                  <h3 className="font-serif text-xl font-bold mb-3">Secure & Reliable</h3>
                  <p className="text-muted-foreground">
                    End-to-end encrypted video sessions and secure payment processing ensure your peace of mind.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-soft">
              <blockquote className="italic text-lg border-l-4 border-primary pl-6 py-4 text-muted-foreground">
                "श्रवणं कीर्तनं विष्णोः स्मरणं पादसेवनम् ।<br />
                अर्चनं वन्दनं दास्यं सख्यमात्मनिवेदनम् ॥"<br />
                <span className="text-sm mt-2 block not-italic">— Bhagavata Purana (Navavidha Bhakti)</span>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif">1. Register</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Create your account as either a Seeker looking for ritual services or a Priest offering your expertise in traditional ceremonies.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <ClipboardList className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="font-serif">2. Request or Book</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Seekers submit detailed ritual requests specifying requirements, date, and preferences. Our admin team matches you with suitable priests.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-serif">3. Remote Ritual</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  The assigned priest performs the ritual remotely via video call, maintaining all traditional protocols while leveraging modern technology.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">What Devotees Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from seekers who have found spiritual connection through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-accent text-xl">★★★★★</div>
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Being away from home, I thought I'd miss important family rituals. Pooja Setu connected me with an amazing priest who performed my father's shradh ceremony perfectly. Truly blessed."
                </p>
                <div className="font-semibold">— Priya Sharma, USA</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-accent text-xl">★★★★★</div>
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "The convenience of having griha pravesh performed remotely without compromising on authenticity was incredible. The priest was knowledgeable and patient."
                </p>
                <div className="font-semibold">— Rajesh Kumar, UK</div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-accent text-xl">★★★★★</div>
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "As a priest, this platform has helped me reach devotees worldwide and preserve our sacred traditions. The verification process ensures quality for everyone."
                </p>
                <div className="font-semibold">— Pandit Ramesh Shastri</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">How do remote rituals work?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Priests perform rituals via secure video call. You'll receive detailed instructions beforehand about any items needed. The priest conducts the ceremony following all traditional protocols while you participate from your location.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Are the priests qualified and verified?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes. All priests undergo thorough verification of their Vedic education, qualifications, temple affiliations, and experience. We ensure they meet traditional standards for performing sacred rituals.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">What rituals can be performed remotely?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Most Hindu rituals including Satyanarayan Puja, Griha Pravesh, Navagraha Puja, Shradh ceremonies, naming ceremonies, and more. Specific requirements vary by ritual type.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">How is payment handled?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Payments are processed securely through our platform. Pricing is transparent and agreed upon before booking. We support multiple payment methods and currencies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">What if I need to cancel or reschedule?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Cancellations made 24 hours before the scheduled time are eligible for full refunds. Rescheduling is possible subject to priest availability. Contact support for assistance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif font-bold text-center mb-12">Get in Touch</h2>
            <Card className="shadow-medium">
              <CardContent className="pt-6">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input 
                      id="name" 
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you?" 
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
                <p className="text-center text-sm text-muted-foreground mt-6">
                  Or email us directly at: <a href="mailto:contact@poojasetu.com" className="text-primary hover:underline">contact@poojasetu.com</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
