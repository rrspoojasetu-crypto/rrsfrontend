import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, FileText, IndianRupee, Video, ExternalLink } from 'lucide-react';

export default function SeekerDashboard() {
  const { user, signOut, getToken } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [rituals, setRituals] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const token = await getToken();
      const [profileRes, ritualsRes, servicesRes] = await Promise.all([
        api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/rituals/my-requests', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/services') // Public endpoint, no token needed usually, or add if protected? Services GET is public per routes.
      ]);

      setProfile(profileRes.data);
      setRituals(ritualsRes.data || []);
      setServices(servicesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await api.put('/auth/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-serif text-foreground">Welcome, {profile?.fullName || 'Seeker'}</h1>
            <p className="text-muted-foreground">Book services and manage your ritual requests</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </div>
        </div>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Book Services</TabsTrigger>
            <TabsTrigger value="rituals">My Requests</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Available Services</h2>
                <Button onClick={() => navigate('/services')}>View All Services</Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Card key={service._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="h-4 w-4" />
                          <span>{service.duration}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                          <IndianRupee className="h-5 w-5" />
                          {service.price.toLocaleString('en-IN')}
                        </div>
                        <Button onClick={() => navigate(`/ritual/request?service=${service._id}`)}>
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rituals">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">My Ritual Requests</h2>
                <Button onClick={() => navigate('/ritual/request')}>
                  New Request
                </Button>
              </div>
              {rituals.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No ritual requests yet</p>
                    <Button onClick={() => navigate('/ritual/request')} className="mt-4">
                      Create Your First Request
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                rituals.filter(r => r.status !== 'completed').map((ritual) => (
                  <Card key={ritual._id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{ritual.ritualType}</CardTitle>
                          <CardDescription className="mt-2">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(ritual.dateRequired).toLocaleDateString()}</span>
                                <Clock className="h-4 w-4 ml-2" />
                                <span>{ritual.timeRequired}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{ritual.caste}</span>
                              </div>
                            </div>
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(ritual.status)}>
                          {ritual.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm"><strong>Details:</strong> {ritual.details}</p>
                        <p className="text-sm"><strong>Location:</strong> {ritual.placeAddress}</p>
                        {ritual.googleMeetLink && (
                          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                            <Video className="h-5 w-5 text-blue-600" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">Google Meet Link</p>
                              <a
                                href={ritual.googleMeetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                              >
                                Join Meeting <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Requested on {new Date(ritual.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>View and update your profile details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={updateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profile?.fullName || ''}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        disabled={!editing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profile?.email || ''}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!editing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile?.phone || ''}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!editing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="religion">Religion</Label>
                      <Input
                        id="religion"
                        value={profile?.religion || ''}
                        onChange={(e) => setProfile({ ...profile, religion: e.target.value })}
                        disabled={!editing}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={profile?.address || ''}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        disabled={!editing}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {editing ? (
                      <>
                        <Button type="submit">Save Changes</Button>
                        <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button type="button" onClick={() => setEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Completed Rituals</CardTitle>
                <CardDescription>View your ritual history</CardDescription>
              </CardHeader>
              <CardContent>
                {rituals.filter(r => r.status === 'completed').length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No completed rituals yet</p>
                ) : (
                  <div className="space-y-4">
                    {rituals
                      .filter(r => ['completed', 'cancelled'].includes(r.status))
                      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                      .map((ritual) => (
                        <div key={ritual._id} className="border-b pb-4 last:border-0 hover:bg-muted/50 p-4 rounded-lg transition-colors">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-lg">{ritual.ritualType}</h4>
                            <Badge variant={ritual.status === 'completed' ? 'default' : 'destructive'}>
                              {ritual.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {ritual.status === 'completed' ? 'Completed' : 'Cancelled'} on {new Date(ritual.updatedAt).toLocaleDateString()}
                          </p>
                          {ritual.priest && (
                            <p className="text-sm mt-1"><strong>Priest:</strong> {ritual.priest.fullName || 'Assigned Priest'}</p>
                          )}
                          <p className="text-sm mt-2">{ritual.details}</p>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
