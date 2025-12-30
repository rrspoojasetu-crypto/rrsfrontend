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
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Power, MapPin, IndianRupee, CheckCircle2 } from 'lucide-react';

export default function PriestDashboard() {
  const { user, signOut, getToken } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [assignedRituals, setAssignedRituals] = useState<any[]>([]);
  const [availableRituals, setAvailableRituals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchRituals();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const token = await getToken();
      const { data } = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(data);
      setIsOnline(data?.status === 'online');
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRituals = async () => {
    try {
      const token = await getToken();
      // Fetch assigned rituals
      const { data: assigned } = await api.get('/rituals/assigned', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignedRituals(assigned || []);

      // Fetch available rituals (pending, not assigned)
      const { data: available } = await api.get('/rituals/available', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAvailableRituals(available || []);
    } catch (error) {
      console.error('Error fetching rituals:', error);
    }
  };

  const expressInterest = async (ritualId: string) => {
    try {
      const token = await getToken();
      await api.put(`/rituals/${ritualId}/assign`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Interest Expressed",
        description: "You've been assigned to this ritual!",
      });

      fetchRituals();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to express interest.",
        variant: "destructive",
      });
    }
  };

  const markAsComplete = async (ritualId: string) => {
    try {
      const token = await getToken();
      await api.put(`/rituals/${ritualId}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Ritual Completed",
        description: "The ritual has been marked as completed.",
      });

      fetchRituals();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to mark as complete.",
        variant: "destructive",
      });
    }
  };

  const toggleOnlineStatus = async (checked: boolean) => {
    try {
      const token = await getToken();
      const newStatus = checked ? 'online' : 'offline';
      await api.put('/auth/profile', { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setIsOnline(checked);
      toast({
        title: checked ? "You're Online" : "You're Offline",
        description: `You are now ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
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
        description: "Your profile has been successfully updated.",
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
            <h1 className="text-3xl font-bold font-serif text-foreground">Priest Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {profile?.fullName || 'Priest'}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Power className={`h-5 w-5 ${isOnline ? 'text-green-600' : 'text-gray-400'}`} />
              <Label htmlFor="online-status">{isOnline ? 'Online' : 'Offline'}</Label>
              <Switch
                id="online-status"
                checked={isOnline}
                onCheckedChange={toggleOnlineStatus}
              />
            </div>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </div>
        </div>

        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="available">Available Requests</TabsTrigger>
            <TabsTrigger value="assigned">My Assignments</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Available Ritual Requests</h2>
                <Badge variant="secondary">{availableRituals.length} Available</Badge>
              </div>
              {availableRituals.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No available rituals at the moment</p>
                  </CardContent>
                </Card>
              ) : (
                availableRituals.map((ritual) => (
                  <Card key={ritual._id} className="shadow-medium hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{ritual.ritualType}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(ritual.dateRequired).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </CardDescription>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">PENDING</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                          <span>{ritual.placeAddress}</span>
                        </div>
                        {ritual.budgetRange && (
                          <div className="flex items-center gap-2 text-sm">
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{ritual.budgetRange}</span>
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground">{ritual.details}</p>
                        {ritual.preferredCommunity && (
                          <p className="text-sm"><strong>Preferred Community:</strong> {ritual.preferredCommunity}</p>
                        )}
                      </div>
                      <Button
                        onClick={() => expressInterest(ritual._id)}
                        className="w-full"
                      >
                        Express Interest
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="assigned">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">My Assigned Rituals</h2>
                <Badge variant="secondary">{assignedRituals.length} Assigned</Badge>
              </div>
              {assignedRituals.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No assigned rituals yet</p>
                  </CardContent>
                </Card>
              ) : (
                assignedRituals
                  .sort((a, b) => new Date(a.dateRequired).getTime() - new Date(b.dateRequired).getTime())
                  .map((ritual) => (
                    <Card key={ritual._id} className="shadow-medium">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{ritual.ritualType}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(ritual.dateRequired).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                              <Clock className="h-4 w-4 ml-2" />
                              {ritual.timeRequired}
                            </CardDescription>
                          </div>
                          <Badge className={
                            ritual.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }>
                            {ritual.status.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                            <span>{ritual.placeAddress}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>Seeker: {ritual.seeker?.fullName || 'Unknown'}</span>
                          </div>
                          {ritual.budgetRange && (
                            <div className="flex items-center gap-2 text-sm">
                              <IndianRupee className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{ritual.budgetRange}</span>
                            </div>
                          )}
                          <p className="text-sm text-muted-foreground border-l-2 pl-3 italic">{ritual.details}</p>
                          <div className="grid grid-cols-2 gap-2 pt-2 text-sm bg-muted/30 p-2 rounded">
                            <p><strong>Power:</strong> {ritual.powerAvailable || 'N/A'}</p>
                            <p><strong>Internet:</strong> {ritual.broadbandAvailable || 'N/A'}</p>
                          </div>
                        </div>
                        {ritual.status !== 'completed' && (
                          <Button
                            onClick={() => markAsComplete(ritual._id)}
                            className="w-full"
                            variant="default"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark as Complete
                          </Button>
                        )}
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
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={profile?.experience || ''}
                        onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) })}
                        disabled={!editing}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile?.bio || ''}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        disabled={!editing}
                        rows={4}
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

          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Availability Calendar</CardTitle>
                <CardDescription>Manage your availability for rituals</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Availability calendar feature coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
