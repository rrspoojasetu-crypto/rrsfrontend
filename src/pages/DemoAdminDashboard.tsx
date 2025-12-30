import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, MapPin, User, Phone, Star, IndianRupee, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const DemoAdminDashboard = () => {
  const [selectedPriest, setSelectedPriest] = useState("");
  
  const priests = [
    {
      id: "1",
      full_name: "Pandit Sharma",
      email: "priest@demo.com",
      phone: "+91-9876543211",
      community: "Tamil Brahmin",
      languages: ["Tamil", "Sanskrit", "Hindi", "English"],
      experience_years: 15,
      rating: "4.8",
      status: "online",
      rituals_comfortable: ["Wedding", "House Warming", "Upanayanam"]
    },
    {
      id: "2",
      full_name: "Pandit Iyer",
      email: "priest2@demo.com",
      phone: "+91-9876543213",
      community: "Tamil Brahmin",
      languages: ["Tamil", "Sanskrit", "Telugu"],
      experience_years: 8,
      rating: "4.5",
      status: "online",
      rituals_comfortable: ["Graha Pravesh", "Satyanarayan Puja", "Navagraha Homam"]
    }
  ];

  const seekers = [
    {
      id: "1",
      full_name: "Rajesh Kumar",
      email: "seeker@demo.com",
      phone: "+91-9876543210",
      community: "Tamil Brahmin",
      address: "123 MG Road, Bangalore",
      created_at: "2025-10-15"
    }
  ];

  const [rituals, setRituals] = useState([
    {
      id: "1",
      ritual_type: "House Warming",
      date_required: "2025-11-24",
      place_address: "123 MG Road, Bangalore",
      seeker_name: "Rajesh Kumar",
      seeker_phone: "+91-9876543210",
      status: "pending",
      budget_range: "₹5,000 - ₹10,000",
      preferred_community: "Tamil Brahmin",
      assigned_priest_id: null
    },
    {
      id: "2",
      ritual_type: "Wedding",
      date_required: "2025-12-17",
      place_address: "456 Wedding Hall, Bangalore",
      seeker_name: "Rajesh Kumar",
      seeker_phone: "+91-9876543210",
      status: "assigned",
      budget_range: "₹20,000 - ₹50,000",
      preferred_community: "Tamil Brahmin",
      assigned_priest_id: "1",
      assigned_priest_name: "Pandit Sharma"
    },
    {
      id: "3",
      ritual_type: "Upanayanam",
      date_required: "2026-01-01",
      place_address: "789 Function Hall, Chennai",
      seeker_name: "Rajesh Kumar",
      seeker_phone: "+91-9876543210",
      status: "pending",
      budget_range: "₹15,000 - ₹25,000",
      preferred_community: "Tamil Brahmin",
      assigned_priest_id: null
    }
  ]);

  const handleAssignPriest = (ritualId: string) => {
    if (!selectedPriest) {
      toast.error("Please select a priest");
      return;
    }

    const priest = priests.find(p => p.id === selectedPriest);
    
    setRituals(rituals.map(r => 
      r.id === ritualId 
        ? { ...r, status: "assigned", assigned_priest_id: selectedPriest, assigned_priest_name: priest?.full_name }
        : r
    ));
    
    toast.success(`Priest ${priest?.full_name} assigned successfully!`);
    setSelectedPriest("");
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
          <h1 className="text-4xl font-serif font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage priests, seekers, and ritual assignments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-medium">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{priests.length}</p>
                <p className="text-sm text-muted-foreground">Total Priests</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-medium">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{seekers.length}</p>
                <p className="text-sm text-muted-foreground">Total Seekers</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-medium">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600">{rituals.filter(r => r.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-medium">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{rituals.filter(r => r.status === 'assigned').length}</p>
                <p className="text-sm text-muted-foreground">Assigned</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">Service Requests</TabsTrigger>
            <TabsTrigger value="priests">All Priests</TabsTrigger>
            <TabsTrigger value="seekers">All Seekers</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Ritual Assignment Management</h2>
            
            <div className="grid gap-4">
              {rituals.map((ritual) => (
                <Card key={ritual.id} className="shadow-medium">
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
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                        <span>{ritual.place_address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span>{ritual.budget_range}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{ritual.seeker_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{ritual.seeker_phone}</span>
                      </div>
                    </div>

                    {ritual.status === "assigned" && ritual.assigned_priest_name ? (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Assigned to: {ritual.assigned_priest_name}</span>
                        </div>
                      </div>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full mt-4">Assign Priest</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Priest to Ritual</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Select onValueChange={setSelectedPriest} value={selectedPriest}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a priest" />
                              </SelectTrigger>
                              <SelectContent>
                                {priests.filter(p => p.status === "online").map((priest) => (
                                  <SelectItem key={priest.id} value={priest.id}>
                                    <div className="flex items-center gap-2">
                                      <span>{priest.full_name}</span>
                                      <Badge variant="outline" className="text-xs">
                                        {priest.rating} ⭐
                                      </Badge>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Button onClick={() => handleAssignPriest(ritual.id)} className="w-full">
                              Confirm Assignment
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="priests">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Registered Priests</CardTitle>
                <CardDescription>Manage and view all priests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {priests.map((priest) => (
                      <TableRow key={priest.id}>
                        <TableCell className="font-medium">{priest.full_name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{priest.email}</div>
                            <div className="text-muted-foreground">{priest.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{priest.experience_years} years</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{priest.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={priest.status === "online" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                            {priest.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seekers">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Registered Seekers</CardTitle>
                <CardDescription>View all seekers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Community</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seekers.map((seeker) => (
                      <TableRow key={seeker.id}>
                        <TableCell className="font-medium">{seeker.full_name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{seeker.email}</div>
                            <div className="text-muted-foreground">{seeker.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{seeker.community}</TableCell>
                        <TableCell className="text-sm">{seeker.address}</TableCell>
                        <TableCell>{new Date(seeker.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default DemoAdminDashboard;
