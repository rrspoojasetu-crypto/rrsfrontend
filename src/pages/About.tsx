import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Shield, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-warm text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Pooja Setu</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Bridging tradition and technology to connect devotees with authentic spiritual guidance
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="shadow-medium">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To preserve and promote Vedic traditions by making authentic Hindu rituals accessible to devotees worldwide, regardless of their location or circumstances. We believe that distance should never be a barrier to spiritual fulfillment.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-medium">
                <CardContent className="p-8">
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                    <Sparkles className="h-6 w-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the most trusted platform for connecting devotees with qualified priests, ensuring that every ritual is performed with authenticity, respect, and devotion. We envision a world where traditional practices thrive in harmony with modern convenience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
                <p className="text-muted-foreground">
                  We ensure all rituals are performed according to authentic Vedic traditions by verified and qualified priests.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-muted-foreground">
                  Building a supportive community that respects diversity while celebrating shared spiritual values.
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Devotion</h3>
                <p className="text-muted-foreground">
                  Every ritual is performed with genuine devotion and respect for the sacred traditions we uphold.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Pooja Setu was born from a simple yet profound realization: in our increasingly global world, millions of devotees find themselves far from temples and traditional spiritual support. Whether due to migration, work, or circumstances, distance was becoming a barrier to practicing our sacred traditions.
                </p>
                <p>
                  We witnessed families struggling to perform important rituals, NRIs longing for authentic spiritual connections, and devotees seeking guidance but finding none nearby. The pandemic further highlighted the need for reliable remote spiritual services.
                </p>
                <p>
                  Today, Pooja Setu connects thousands of devotees with qualified priests, ensuring that no one has to compromise on their spiritual practices due to geographical constraints. We leverage technology not to replace tradition, but to preserve and propagate it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Pooja Setu?</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {[
                { title: 'Verified Priests', desc: 'All priests are thoroughly verified for their qualifications and experience' },
                { title: 'Authentic Rituals', desc: 'Traditional Vedic procedures followed with proper mantras and methods' },
                { title: 'Language Options', desc: 'Services available in multiple Indian languages for your comfort' },
                { title: 'Flexible Scheduling', desc: 'Book rituals at times that work for you, including auspicious muhurtas' },
                { title: 'Transparent Pricing', desc: 'Clear, upfront pricing with no hidden charges' },
                { title: 'Live Streaming', desc: 'Participate remotely via video call and receive recorded blessings' },
                { title: 'Comprehensive Support', desc: '24/7 customer support for all your spiritual needs' },
                { title: 'Satisfaction Guaranteed', desc: 'We ensure every ritual meets your expectations' }
              ].map((item, idx) => (
                <Card key={idx} className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
