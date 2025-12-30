import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, MapPin, User, Phone, IndianRupee, Star } from "lucide-react";

const DemoPriestDashboard = () => {
  const [editing, setEditing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [profile, setProfile] = useState({
    full_name: "Pandit Sharma",
    email: "priest@demo.com",
    phone: "+91-9876543211",
    bio: "Experienced priest with 15 years of expertise in Vedic rituals",
    experience_years: 15,
    languages: ["Tamil", "Sanskrit", "Hindi", "English"],
    qualification_dharmic: "Veda Patashala Graduate",
    qualification_regular: "B.A in Sanskrit",
    rating: "4.8",
    rituals_comfortable: ["Wedding", "House Warming", "Upanayanam", "Satyanarayan Puja"]
  });

  const assignedRituals = [
    {
      id: "1",
      ritual_type: "Wedding",
      date_required: "2025-12-17",
      place_address: "456 Wedding Hall, Bangalore",
      seeker_name: "Rajesh Kumar",
      seeker_phone: "+91-9876543210",
      budget_range: "₹20,000 - ₹50,000",
      details: "Traditional Tamil Brahmin wedding ceremony. Need priest for full day ceremony including Muhurtham.",
      status: "assigned"
    }
  ];

  const availableRituals = [
    {
      id: "2",
      ritual_type: "House Warming",
      date_required: "2025-11-24",
      place_address: "123 MG Road, Bangalore",
      budget_range: "₹5,000 - ₹10,000",
      details: "Need priest for Graha Pravesh ceremony",
      community: "Tamil Brahmin",
      status: "pending"
    },
    {
      id: "3",
      ritual_type: "Upanayanam",
      date_required: "2026-01-01",
      place_address: "789 Function Hall, Chennai",
      budget_range: "₹15,000 - ₹25,000",
      details: "Sacred thread ceremony for my son",
      community: "Tamil Brahmin",
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Priest Dashboard</h1>
            <p className="text-muted-foreground">Manage your assignments and availability</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-card rounded-lg shadow-medium">
            <div className="text-right">
              <p className="text-sm font-medium">Status</p>
              <p className="text-xs text-muted-foreground">
                {isOnline ? "Available" : "Offline"}
              </p>
            </div>
            <Switch
              checked={isOnline}
              onCheckedChange={setIsOnline}
            />
          </div>
        </div>

        <Tabs defaultValue="assigned" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assigned">Assigned Rituals</TabsTrigger>
            <TabsTrigger value="available">Available Requests</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="assigned" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Your Assigned Rituals</h2>
            
            <div className="grid gap-4">
              {assignedRituals.map((ritual) => (
                <Card key={ritual.id} className="shadow-medium hover:shadow-lg transition-shadow border-blue-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{ritual.ritual_type}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(ritual.date_required).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </CardDescription>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                        ASSIGNED
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span>{ritual.place_address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{ritual.budget_range}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{ritual.details}</p>
                    
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-900 mb-3">Seeker Details</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{ritual.seeker_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <span>{ritual.seeker_phone}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Seeker
                        </Button>
                        <Button size="sm">
                          Mark Complete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Available Ritual Requests</h2>
            
            <div className="grid gap-4">
              {availableRituals.map((ritual) => (
                <Card key={ritual.id} className="shadow-medium hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{ritual.ritual_type}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(ritual.date_required).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </CardDescription>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        AVAILABLE
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span>{ritual.place_address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{ritual.budget_range}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Community: {ritual.community}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{ritual.details}</p>
                    <Button className="w-full mt-4">
                      Express Interest
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Profile Information
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-5 w-5 fill-current" />
                        <span className="text-lg font-bold">{profile.rating}</span>
                      </div>
                    </CardTitle>
                    <CardDescription>Your professional details</CardDescription>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setEditing(!editing)}
                  >
                    {editing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={profile.full_name}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={profile.email}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={profile.phone}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Experience (Years)</Label>
                    <Input
                      type="number"
                      value={profile.experience_years}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, experience_years: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Bio</Label>
                    <Input
                      value={profile.bio}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Dharmic Qualification</Label>
                    <Input
                      value={profile.qualification_dharmic}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, qualification_dharmic: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Academic Qualification</Label>
                    <Input
                      value={profile.qualification_regular}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, qualification_regular: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Languages</Label>
                    <Input
                      value={profile.languages.join(", ")}
                      disabled={!editing}
                      placeholder="Separate with commas"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Rituals Comfortable With</Label>
                    <Input
                      value={profile.rituals_comfortable.join(", ")}
                      disabled={!editing}
                      placeholder="Separate with commas"
                    />
                  </div>
                </div>
                {editing && (
                  <div className="mt-6">
                    <Button onClick={() => setEditing(false)}>
                      Save Changes
                    </Button>
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
};

export default DemoPriestDashboard;
