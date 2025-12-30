import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { IndianRupee } from 'lucide-react';

interface Service {
  _id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  category: any;
}

interface ServiceCategory {
  _id: string;
  name: string;
}

export default function RitualRequest() {
  const { user, loading: authLoading, getToken } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    serviceId: '',
    ritualType: '',
    details: '',
    dateRequired: '',
    timeRequired: '',
    placeAddress: '',
    powerAvailable: '',
    broadbandAvailable: '',
    signalStrength: '',
    otherInfo: '',
    guidelineConfirmed: false,
    budgetRange: '',
    preferredCommunity: '',
    caste: '',
  });

  // Load data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, servicesRes] = await Promise.all([
          api.get('/services/categories'),
          api.get('/services')
        ]);
        setCategories(categoriesRes.data);
        setServices(servicesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load services. Please try again.",
          variant: "destructive",
        });
      }
    };
    fetchData();
  }, [toast]);

  // Check authentication and pre-fill service from URL
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Login Required",
        description: "Please login to book a ritual",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Pre-fill service if provided in URL
    const serviceParam = searchParams.get('service');
    if (serviceParam && services.length > 0) {
      const service = services.find(s => s._id === serviceParam);
      if (service) {
        setFormData(prev => ({ ...prev, serviceId: service._id, ritualType: service.name }));
        setSelectedService(service);
      }
    }
  }, [user, authLoading, navigate, toast, searchParams, services]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.guidelineConfirmed) {
      toast({
        title: "Confirmation Required",
        description: "Please confirm that you have read the guidelines.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();
      await api.post('/rituals', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Request Submitted",
        description: "Your ritual request has been submitted successfully.",
      });

      navigate('/dashboard/seeker');
    } catch (error: any) {
      console.error('Error submitting request:', error);
      toast({
        title: "Submission Failed",
        description: error.response?.data?.message || "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Ritual Request Form</h1>
            <p className="text-muted-foreground">Fill in the details for your ritual requirement</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Ritual Details</CardTitle>
                <CardDescription>Provide information about your ritual requirement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="serviceId">Select Service *</Label>
                  <Select
                    value={formData.serviceId}
                    onValueChange={(value) => {
                      const service = services.find(s => s._id === value);
                      if (service) {
                        setFormData(prev => ({ ...prev, serviceId: value, ritualType: service.name }));
                        setSelectedService(service);
                      }
                    }}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => {
                        const categoryServices = services.filter(s =>
                          (s.category && s.category._id === category._id) ||
                          s.category === category._id
                        );
                        if (categoryServices.length === 0) return null;
                        return (
                          <div key={category._id}>
                            <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                              {category.name}
                            </div>
                            {categoryServices.map((service) => (
                              <SelectItem key={service._id} value={service._id}>
                                {service.name} - ₹{service.price.toLocaleString('en-IN')}
                              </SelectItem>
                            ))}
                          </div>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {selectedService && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <span>{selectedService.description}</span>
                      <span>•</span>
                      <span>{selectedService.duration}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1 font-semibold text-primary">
                        <IndianRupee className="h-4 w-4" />
                        {selectedService.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caste">Caste *</Label>
                  <Select
                    value={formData.caste}
                    onValueChange={(value) => updateFormData('caste', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your caste" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Brahmin">Brahmin</SelectItem>
                      <SelectItem value="Kshatriya">Kshatriya</SelectItem>
                      <SelectItem value="Vaishya">Vaishya</SelectItem>
                      <SelectItem value="Shudra">Shudra</SelectItem>
                      <SelectItem value="Veerashaiva">Veerashaiva</SelectItem>
                      <SelectItem value="Vokkaliga">Vokkaliga</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Ritual Details *</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => updateFormData('details', e.target.value)}
                    placeholder="Describe your ritual requirements in detail..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateRequired">Date Required *</Label>
                    <Input
                      id="dateRequired"
                      type="date"
                      value={formData.dateRequired}
                      onChange={(e) => updateFormData('dateRequired', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeRequired">Time Required *</Label>
                    <Input
                      id="timeRequired"
                      type="time"
                      value={formData.timeRequired}
                      onChange={(e) => updateFormData('timeRequired', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="placeAddress">Place of Requirement *</Label>
                  <Textarea
                    id="placeAddress"
                    value={formData.placeAddress}
                    onChange={(e) => updateFormData('placeAddress', e.target.value)}
                    placeholder="Enter complete address..."
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Power Supply Available? *</Label>
                  <RadioGroup
                    value={formData.powerAvailable}
                    onValueChange={(value) => updateFormData('powerAvailable', value)}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="power-yes" />
                      <Label htmlFor="power-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="power-no" />
                      <Label htmlFor="power-no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Uncertain" id="power-uncertain" />
                      <Label htmlFor="power-uncertain">Uncertain</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Broadband/WiFi Available? *</Label>
                  <RadioGroup
                    value={formData.broadbandAvailable}
                    onValueChange={(value) => updateFormData('broadbandAvailable', value)}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Yes" id="broadband-yes" />
                      <Label htmlFor="broadband-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="No" id="broadband-no" />
                      <Label htmlFor="broadband-no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Uncertain" id="broadband-uncertain" />
                      <Label htmlFor="broadband-uncertain">Uncertain</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Mobile Signal Strength *</Label>
                  <RadioGroup
                    value={formData.signalStrength}
                    onValueChange={(value) => updateFormData('signalStrength', value)}
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Strong" id="signal-strong" />
                      <Label htmlFor="signal-strong">Strong</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Moderate" id="signal-moderate" />
                      <Label htmlFor="signal-moderate">Moderate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Weak" id="signal-weak" />
                      <Label htmlFor="signal-weak">Weak</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherInfo">Other Information</Label>
                  <Textarea
                    id="otherInfo"
                    value={formData.otherInfo}
                    onChange={(e) => updateFormData('otherInfo', e.target.value)}
                    placeholder="Any other details we should know..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Budget Range *</Label>
                  <Select
                    value={formData.budgetRange}
                    onValueChange={(value) => updateFormData('budgetRange', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low (₹1,000 - ₹5,000)</SelectItem>
                      <SelectItem value="Medium">Medium (₹5,000 - ₹15,000)</SelectItem>
                      <SelectItem value="High">High (₹15,000+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Priest Community</Label>
                  <Select
                    value={formData.preferredCommunity}
                    onValueChange={(value) => updateFormData('preferredCommunity', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred community" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">No Preference</SelectItem>
                      <SelectItem value="Brahmin">Brahmin</SelectItem>
                      <SelectItem value="Veerashaiva">Veerashaiva</SelectItem>
                      <SelectItem value="Vokkaliga">Vokkaliga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="guidelines"
                    checked={formData.guidelineConfirmed}
                    onCheckedChange={(checked) => updateFormData('guidelineConfirmed', checked)}
                  />
                  <Label
                    htmlFor="guidelines"
                    className="text-sm font-normal cursor-pointer"
                  >
                    I confirm that I have read and agree to the guidelines for remote ritual services *
                  </Label>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/dashboard/seeker')}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
