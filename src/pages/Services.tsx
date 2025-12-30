import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen, Heart, Star, Flame, IndianRupee } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  currency: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bg_color: string;
  services: Service[];
}

const iconMap: Record<string, any> = {
  Flame,
  Star,
  Heart,
  BookOpen,
  Users,
};

// Mock data - will be replaced with API calls later
const MOCK_CATEGORIES: ServiceCategory[] = [
  {
    id: '1',
    name: 'Nitya Karma (Daily Rituals)',
    description: 'Essential daily spiritual practices',
    icon: 'Flame',
    color: 'text-orange-600',
    bg_color: 'bg-orange-50',
    services: [
      { id: 's1', name: 'Sandhyavandane', description: 'Daily sacred ritual performed at dawn, noon, and dusk', duration: '30-45 mins', price: 2000, currency: 'INR' },
      { id: 's2', name: 'Deva Puje', description: 'Daily worship of household deities with proper procedures', duration: '45-60 mins', price: 3000, currency: 'INR' }
    ]
  },
  {
    id: '2',
    name: 'Nimitta Karma (Votive Rituals)',
    description: 'Special votive ceremonies for specific purposes',
    icon: 'Star',
    color: 'text-yellow-600',
    bg_color: 'bg-yellow-50',
    services: [
      { id: 's3', name: 'Ganesha Vrata', description: 'Vrata dedicated to Lord Ganesha for removing obstacles', duration: '2-3 hours', price: 5000, currency: 'INR' },
      { id: 's4', name: 'Gowri Vrata', description: 'Sacred vrata for Goddess Gowri for marital bliss', duration: '2-3 hours', price: 5000, currency: 'INR' },
      { id: 's5', name: 'Lakshmi Vrata', description: 'Worship of Goddess Lakshmi for prosperity', duration: '2-3 hours', price: 5500, currency: 'INR' },
      { id: 's6', name: 'Ananta Vrata', description: 'Vrata for Lord Vishnu in Ananta form', duration: '2-3 hours', price: 5000, currency: 'INR' },
      { id: 's7', name: 'Saraswati Vrata', description: 'Worship of Goddess Saraswati for knowledge', duration: '2-3 hours', price: 5000, currency: 'INR' }
    ]
  },
  {
    id: '3',
    name: 'Apara Karma (Ancestral Rites)',
    description: 'Sacred rituals for honoring ancestors',
    icon: 'Heart',
    color: 'text-purple-600',
    bg_color: 'bg-purple-50',
    services: [
      { id: 's8', name: 'Sankalpa Shradda', description: 'Ritual for ancestors with sankalpam', duration: '2-3 hours', price: 7000, currency: 'INR' },
      { id: 's9', name: 'Pinda Pradhana Shradda', description: 'Offering pinda to ancestors', duration: '3-4 hours', price: 8000, currency: 'INR' },
      { id: 's10', name: 'Mahalaya Vidhi', description: 'Special ancestral ritual during Mahalaya Paksha', duration: '2-3 hours', price: 7500, currency: 'INR' },
      { id: 's11', name: 'Tarpana Karya', description: 'Water oblation for ancestors', duration: '1-2 hours', price: 4000, currency: 'INR' },
      { id: 's12', name: 'Garuda Purana', description: 'Recitation and discourse on Garuda Purana', duration: 'Multiple sessions', price: 15000, currency: 'INR' }
    ]
  },
  {
    id: '4',
    name: 'Vishesha Dinagalu / Saptaha (Special Occasions)',
    description: 'Multi-day spiritual discourses and celebrations',
    icon: 'BookOpen',
    color: 'text-blue-600',
    bg_color: 'bg-blue-50',
    services: [
      { id: 's13', name: 'Bhagavatha Upanyaasa', description: 'Seven-day discourse on Bhagavatam', duration: '7 days', price: 50000, currency: 'INR' },
      { id: 's14', name: 'Srinivasa Kalyana Upanyaasa', description: 'Discourse on Lord Venkateshwara\'s wedding', duration: '3-7 days', price: 35000, currency: 'INR' },
      { id: 's15', name: 'Itare Upanyaasagalu', description: 'Other spiritual discourses and kathas', duration: 'Varies', price: 10000, currency: 'INR' }
    ]
  },
  {
    id: '5',
    name: 'Bhajane & Haadugalu (Devotional Music)',
    description: 'Sacred devotional singing sessions',
    icon: 'Users',
    color: 'text-green-600',
    bg_color: 'bg-green-50',
    services: [
      { id: 's16', name: 'Harikathamrutasaara', description: 'Singing of devotional compositions', duration: '2-3 hours', price: 6000, currency: 'INR' },
      { id: 's17', name: 'Lakshmi Shobhane', description: 'Devotional songs for Goddess Lakshmi', duration: '2-3 hours', price: 6000, currency: 'INR' },
      { id: 's18', name: 'Dasara Padagalu', description: 'Special Dasara devotional songs', duration: '2-3 hours', price: 6500, currency: 'INR' },
      { id: 's19', name: 'Ekadashi Jaagra Vishesha', description: 'Night-long devotional singing on Ekadashi', duration: '4-8 hours', price: 12000, currency: 'INR' }
    ]
  }
];

export default function Services() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setCategories(MOCK_CATEGORIES);
      setLoading(false);
    }, 500);
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-warm text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
              Comprehensive range of authentic Vedic rituals and ceremonies performed by qualified priests
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8">
              <Link to="/ritual/request">Book a Ritual</Link>
            </Button>
          </div>
        </section>

        {/* Services Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {categories.map((category) => {
                const Icon = iconMap[category.icon] || Star;
                return (
                  <div key={category.id}>
                    <div className="flex items-center gap-3 mb-8">
                      <div className={`h-12 w-12 rounded-full ${category.bg_color} flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{category.name}</h2>
                        {category.description && (
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.services.map((service) => (
                        <Card key={service.id} className="shadow-soft hover:shadow-medium transition-all">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg">{service.name}</CardTitle>
                              <Badge variant="secondary" className="ml-2">
                                <Clock className="h-3 w-3 mr-1" />
                                {service.duration}
                              </Badge>
                            </div>
                            <CardDescription className="mt-2">{service.description}</CardDescription>
                            <div className="flex items-center gap-1 text-lg font-semibold text-primary mt-3">
                              <IndianRupee className="h-5 w-5" />
                              {service.price.toLocaleString('en-IN')}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Button asChild className="w-full">
                              <Link to={`/ritual/request?service=${service.id}`}>Request This Ritual</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">What's Included in Every Service</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Priest Consultation', desc: 'Pre-ritual consultation to understand your requirements' },
                  { title: 'Samagri List', desc: 'Detailed list of items needed for the ritual' },
                  { title: 'Live Video Call', desc: 'High-quality video streaming during the ritual' },
                  { title: 'Recorded Blessings', desc: 'Video recording sent after completion' },
                  { title: 'Mantra Chanting', desc: 'Authentic Sanskrit mantras with correct pronunciation' },
                  { title: 'Post-Ritual Guidance', desc: 'Instructions for prasad and continued observances' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Ritual?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with qualified priests and schedule your ritual at your convenience
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
