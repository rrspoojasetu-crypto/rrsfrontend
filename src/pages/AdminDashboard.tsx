import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Users, FileText, UserCheck, Award } from 'lucide-react';

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [priests, setPriests] = useState<any[]>([]);
  const [seekers, setSeekers] = useState<any[]>([]);
  const [rituals, setRituals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRitual, setSelectedRitual] = useState<any>(null);
  const [selectedPriest, setSelectedPriest] = useState<string>('');
  const [filterCaste, setFilterCaste] = useState<string>('all');
  const [filterLanguage, setFilterLanguage] = useState<string>('all');

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    try {
      const [usersRes, ritualsRes] = await Promise.all([
        api.get('/users'),
        api.get('/rituals'),
      ]);

      const allUsers = usersRes.data;
      const priestsList = allUsers.filter((u: any) => u.role === 'priest');
      const seekersList = allUsers.filter((u: any) => u.role === 'seeker');

      setPriests(priestsList);
      setSeekers(seekersList);
      setRituals(ritualsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const assignPriest = async () => {
    if (!selectedRitual || !selectedPriest) return;

    try {
      await api.put(`/rituals/${selectedRitual._id}/assign`, {
        priestId: selectedPriest
      });

      toast({
        title: "Priest Assigned",
        description: "Priest has been successfully assigned to the ritual.",
      });

      setSelectedRitual(null);
      setSelectedPriest('');
      fetchAllData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to assign priest.",
        variant: "destructive",
      });
    }
  };

  const updatePriestRating = async (priestId: string, rating: string) => {
    try {
      await api.put(`/users/${priestId}/rating`, { rating });

      toast({
        title: "Rating Updated",
        description: "Priest rating has been updated.",
      });

      fetchAllData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update rating.",
        variant: "destructive",
      });
    }
  };

  const filteredPriests = priests.filter(priest => {
    if (filterCaste !== 'all' && priest.community !== filterCaste) return false;
    if (filterLanguage !== 'all' && !priest.languages?.includes(filterLanguage)) return false;
    return true;
  });

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
            <h1 className="text-3xl font-bold font-serif text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage priests, seekers, and ritual requests</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => window.location.href = '/admin/services'} variant="default">
              Manage Services
            </Button>
            <Button onClick={signOut} variant="outline">Sign Out</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Priests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{priests.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Seekers</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{seekers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {rituals.filter(r => r.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {rituals.filter(r => r.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="priests" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="priests">All Priests</TabsTrigger>
            <TabsTrigger value="requests">Service Requests</TabsTrigger>
            <TabsTrigger value="seekers">All Seekers</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>

          <TabsContent value="priests">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>All Priests</CardTitle>
                    <CardDescription>View and manage registered priests</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterCaste} onValueChange={setFilterCaste}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by caste" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Castes</SelectItem>
                        <SelectItem value="Brahmin">Brahmin</SelectItem>
                        <SelectItem value="Veerashaiva">Veerashaiva</SelectItem>
                        <SelectItem value="Vokkaliga">Vokkaliga</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Community</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Languages</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPriests.map((priest) => (
                      <TableRow key={priest._id}>
                        <TableCell className="font-medium">{priest.fullName}</TableCell>
                        <TableCell>{priest.community}</TableCell>
                        <TableCell>{priest.experience} years</TableCell>
                        <TableCell>{priest.languages?.join(', ')}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${priest.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                            {priest.status || 'offline'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{priest.email}</div>
                            <div className="text-muted-foreground">{priest.phone}</div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Service Requests</CardTitle>
                <CardDescription>Manage ritual requests and assign priests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ritual Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Place</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Priest</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rituals.map((ritual) => (
                      <TableRow key={ritual._id}>
                        <TableCell className="font-medium">{ritual.ritualType}</TableCell>
                        <TableCell>{new Date(ritual.dateRequired).toLocaleDateString()}</TableCell>
                        <TableCell>{ritual.placeAddress}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${ritual.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            ritual.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                            {ritual.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {ritual.priest
                            ? ritual.priest.fullName
                            : 'Unassigned'}
                        </TableCell>
                        <TableCell>
                          {ritual.status === 'pending' && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  onClick={() => setSelectedRitual(ritual)}
                                >
                                  Assign
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Assign Priest</DialogTitle>
                                  <DialogDescription>
                                    Select a priest to assign to this ritual request
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Ritual Details</h4>
                                    <p><strong>Type:</strong> {ritual.ritualType}</p>
                                    <p><strong>Date:</strong> {new Date(ritual.dateRequired).toLocaleString()}</p>
                                    <p><strong>Budget:</strong> {ritual.budgetRange}</p>
                                    <p><strong>Preferred Community:</strong> {ritual.preferredCommunity}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Available Priests</h4>
                                    <Select value={selectedPriest} onValueChange={setSelectedPriest}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a priest" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {priests
                                          .filter(p => p.status === 'online')
                                          .map((priest) => (
                                            <SelectItem key={priest._id} value={priest._id}>
                                              {priest.fullName} - {priest.community} - {priest.experience}y exp
                                            </SelectItem>
                                          ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <Button onClick={assignPriest} disabled={!selectedPriest}>
                                    Confirm Assignment
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seekers">
            <Card>
              <CardHeader>
                <CardTitle>All Seekers</CardTitle>
                <CardDescription>View registered seekers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Religion</TableHead>
                      <TableHead>Community</TableHead>
                      <TableHead>Registered</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {seekers.map((seeker) => (
                      <TableRow key={seeker._id}>
                        <TableCell className="font-medium">{seeker.fullName}</TableCell>
                        <TableCell>{seeker.email}</TableCell>
                        <TableCell>{seeker.phone}</TableCell>
                        <TableCell>{seeker.religion}</TableCell>
                        <TableCell>{seeker.community}</TableCell>
                        <TableCell>{new Date(seeker.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluation">
            <Card>
              <CardHeader>
                <CardTitle>Priest Evaluation Panel</CardTitle>
                <CardDescription>Rate and evaluate priest performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Completed Rituals</TableHead>
                      <TableHead>Current Rating</TableHead>
                      <TableHead>Update Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {priests.map((priest) => {
                      const completedCount = rituals.filter(
                        r => r.priest?._id === priest._id && r.status === 'completed'
                      ).length;

                      return (
                        <TableRow key={priest._id}>
                          <TableCell className="font-medium">{priest.fullName}</TableCell>
                          <TableCell>{priest.experience} years</TableCell>
                          <TableCell>{completedCount}</TableCell>
                          <TableCell>{priest.rating || 'Not rated'}</TableCell>
                          <TableCell>
                            <Select
                              value={priest.rating || ''}
                              onValueChange={(value) => updatePriestRating(priest._id, value)}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Set rating" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Excellent">Excellent</SelectItem>
                                <SelectItem value="Good">Good</SelectItem>
                                <SelectItem value="Average">Average</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
}
