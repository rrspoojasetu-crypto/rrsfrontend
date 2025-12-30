import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Star, Sparkles, Crown } from 'lucide-react';

export default function Pricing() {
  const pricingTiers = [
    {
      name: 'Basic Rituals',
      icon: Star,
      price: '₹500',
      priceDesc: 'Starting from',
      description: 'Perfect for daily worship and simple ceremonies',
      features: [
        'Daily rituals (Sandhyavandane, Deva Puje)',
        'Single session - 30-45 minutes',
        'Video call participation',
        'Basic recording provided',
        'Samagri list included',
        'Post-ritual instructions'
      ],
      cta: 'Book Basic Ritual',
      color: 'border-primary/50'
    },
    {
      name: 'Special Vratas',
      icon: Sparkles,
      price: '₹2,500',
      priceDesc: 'Starting from',
      description: 'For important vratas and festivals',
      features: [
        'All Vratas (Ganesha, Lakshmi, etc.)',
        '2-3 hours duration',
        'HD video streaming',
        'Full ritual recording',
        'Complete samagri guidance',
        'Pre-ritual consultation',
        'Muhurta selection help',
        'Digital prasad blessing'
      ],
      cta: 'Book Special Vrata',
      color: 'border-secondary',
      popular: true
    },
    {
      name: 'Premium Services',
      icon: Crown,
      price: '₹5,000',
      priceDesc: 'Starting from',
      description: 'Comprehensive multi-day ceremonies',
      features: [
        'Shradda ceremonies (all types)',
        'Multi-day Upanyaasas',
        'Bhajane & musical sessions',
        'Priority priest selection',
        '4K video quality',
        'Multiple camera angles',
        'Complete documentation',
        'Personalized mantras',
        'Follow-up support',
        'Certificate of completion'
      ],
      cta: 'Book Premium Service',
      color: 'border-accent'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-warm text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Transparent Pricing</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Clear, honest pricing with no hidden charges. Choose the service that fits your needs.
            </p>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingTiers.map((tier, idx) => {
                const Icon = tier.icon;
                return (
                  <Card 
                    key={idx} 
                    className={`shadow-medium hover:shadow-lg transition-all relative ${tier.color} ${tier.popular ? 'border-2 scale-105' : ''}`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center pb-8">
                      <div className="mx-auto h-16 w-16 rounded-full bg-gradient-warm flex items-center justify-center mb-4">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                      <div className="mb-2">
                        <span className="text-4xl font-bold">{tier.price}</span>
                        <span className="text-muted-foreground ml-2">{tier.priceDesc}</span>
                      </div>
                      <CardDescription className="text-base">{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature, fidx) => (
                          <li key={fidx} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full" size="lg">
                        <Link to="/ritual/request">{tier.cta}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Pricing Information</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>What's Included</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">✓ Qualified and verified priest</p>
                    <p className="text-sm text-muted-foreground">✓ Pre-ritual consultation</p>
                    <p className="text-sm text-muted-foreground">✓ Complete samagri list</p>
                    <p className="text-sm text-muted-foreground">✓ Live video streaming</p>
                    <p className="text-sm text-muted-foreground">✓ Video recording of ritual</p>
                    <p className="text-sm text-muted-foreground">✓ Post-ritual guidance</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Services</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">• Emergency same-day booking: +₹500</p>
                    <p className="text-sm text-muted-foreground">• Samagri delivery: ₹200-500</p>
                    <p className="text-sm text-muted-foreground">• Muhurta consultation: ₹300</p>
                    <p className="text-sm text-muted-foreground">• Multiple camera setup: +₹500</p>
                    <p className="text-sm text-muted-foreground">• Extended recording: ₹200/hour</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Payment & Refund Policy</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Secure online payment via UPI, cards, net banking</li>
                  <li>• Full refund if canceled 48 hours before scheduled time</li>
                  <li>• 50% refund if canceled 24-48 hours before</li>
                  <li>• Rescheduling available once at no extra cost</li>
                  <li>• Invoice and receipt provided automatically</li>
                  <li>• Transparent pricing - no hidden charges</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Have Questions About Pricing?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our support team is here to help you choose the right service for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/ritual/request">Book Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
