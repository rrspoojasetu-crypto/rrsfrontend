import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Phone, Mail, User, Clock, IndianRupee } from "lucide-react";

const DemoSeekerDashboard = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "Rajesh Kumar",
    email: "seeker@demo.com",
    phone: "+91-9876543210",
    address: "123 MG Road, Bangalore, Karnataka",
    community: "Tamil Brahmin",
    gotra: "Bharadwaja",
    nakshatra: "Rohini",
    rashi: "Taurus"
  });

  const rituals = [
    {
      id: "1",
      ritual_type: "House Warming",
      date_required: "2025-11-24",
      place_address: "123 MG Road, Bangalore",
      status: "pending",
      budget_range: "₹5,000 - ₹10,000",
      details: "Need priest for Graha Pravesh ceremony",
      created_at: "2025-11-17"
    },
    {
      id: "2",
      ritual_type: "Wedding",
      date_required: "2025-12-17",
      place_address: "456 Wedding Hall, Bangalore",
      status: "assigned",
      budget_range: "₹20,000 - ₹50,000",
      details: "Traditional Tamil Brahmin wedding ceremony",
      assigned_priest: "Pandit Sharma",
      priest_phone: "+91-9876543211",
      created_at: "2025-11-15"
    },
    {
      id: "3",
      ritual_type: "Upanayanam",
      date_required: "2026-01-01",
      place_address: "789 Function Hall, Chennai",
      status: "pending",
      budget_range: "₹15,000 - ₹25,000",
      details: "Sacred thread ceremony for my son",
      created_at: "2025-11-16"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "assigned": return "bg-blue-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      assigned: "bg-blue-100 text-blue-800 border-blue-300",
      completed: "bg-green-100 text-green-800 border-green-300"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Seeker Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile and ritual requests</p>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Service Requests</h2>
              <Button onClick={() => navigate("/ritual/request")}>
                + New Request
              </Button>
            </div>

            <div className="grid gap-4">
              {rituals.filter(r => r.status !== "completed").map((ritual) => (
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
                      <Badge className={getStatusBadge(ritual.status)}>
                        {ritual.status.toUpperCase()}
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
                    <p className="text-sm text-muted-foreground">{ritual.details}</p>
                    
                    {ritual.status === "assigned" && ritual.assigned_priest && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm font-medium text-blue-900 mb-2">Assigned Priest</p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-4 w-4 text-blue-600" />
                            <span>{ritual.assigned_priest}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <span>{ritual.priest_phone}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Profile Information</CardTitle>
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
                    <Label>Community</Label>
                    <Input
                      value={profile.community}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, community: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Address</Label>
                    <Input
                      value={profile.address}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gotra</Label>
                    <Input
                      value={profile.gotra}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, gotra: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nakshatra</Label>
                    <Input
                      value={profile.nakshatra}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, nakshatra: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rashi</Label>
                    <Input
                      value={profile.rashi}
                      disabled={!editing}
                      onChange={(e) => setProfile({ ...profile, rashi: e.target.value })}
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

          <TabsContent value="history">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Completed Rituals</CardTitle>
                <CardDescription>Your ritual history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Card className="border-green-200">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">Satyanarayan Puja</h3>
                          <p className="text-sm text-muted-foreground">Completed on Oct 15, 2025</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">COMPLETED</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><strong>Priest:</strong> Pandit Iyer</p>
                        <p><strong>Location:</strong> Home</p>
                        <p className="text-muted-foreground">Traditional Satyanarayan Katha and Puja performed</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default DemoSeekerDashboard;
