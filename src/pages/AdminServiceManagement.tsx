import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, IndianRupee } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import api from '@/lib/api';

export default function AdminServiceManagement() {
    const { toast } = useToast();
    const [services, setServices] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
    const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
    const [editingService, setEditingService] = useState<any>(null);

    const [newService, setNewService] = useState({
        name: '',
        description: '',
        duration: '',
        price: '',
        category_id: '',
    });

    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        icon: 'Star',
        color: 'text-blue-600',
        bg_color: 'bg-blue-50',
    });

    useEffect(() => {
        fetchData();
    }, []);

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
                description: "Failed to load data",
                variant: "destructive",
            });
        }
    };

    const handleAddService = async () => {
        if (!newService.name || !newService.category_id || !newService.price) {
            toast({
                title: "Missing Fields",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return;
        }

        try {
            const res = await api.post('/services', {
                ...newService,
                price: parseFloat(newService.price),
            });

            setServices([...services, res.data]);
            setNewService({ name: '', description: '', duration: '', price: '', category_id: '' });
            setIsAddServiceOpen(false);

            toast({
                title: "Service Added",
                description: `${res.data.name} has been added successfully`,
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to add service",
                variant: "destructive",
            });
        }
    };

    const handleUpdateService = async () => {
        if (!editingService) return;

        try {
            const res = await api.put(`/services/${editingService._id}`, editingService);

            setServices(services.map(s =>
                s._id === editingService._id ? res.data : s
            ));

            toast({
                title: "Service Updated",
                description: `${res.data.name} has been updated successfully`,
            });

            setEditingService(null);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to update service",
                variant: "destructive",
            });
        }
    };

    const handleDeleteService = async (id: string) => {
        try {
            await api.delete(`/services/${id}`);
            const service = services.find(s => s._id === id);
            setServices(services.filter(s => s._id !== id));

            toast({
                title: "Service Deleted",
                description: `${service?.name} has been deleted`,
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to delete service",
                variant: "destructive",
            });
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.name) {
            toast({
                title: "Missing Name",
                description: "Please enter a category name",
                variant: "destructive",
            });
            return;
        }

        try {
            const res = await api.post('/services/categories', newCategory);

            setCategories([...categories, res.data]);
            setNewCategory({ name: '', description: '', icon: 'Star', color: 'text-blue-600', bg_color: 'bg-blue-50' });
            setIsAddCategoryOpen(false);

            toast({
                title: "Category Added",
                description: `${res.data.name} has been added successfully`,
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to add category",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-serif">Service Management</h1>
                    <p className="text-muted-foreground">Manage services and categories</p>
                </div>

                {/* Categories Section */}
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Service Categories</CardTitle>
                                <CardDescription>Manage service categories</CardDescription>
                            </div>
                            <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Category
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Category</DialogTitle>
                                        <DialogDescription>Create a new service category</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="cat-name">Category Name *</Label>
                                            <Input
                                                id="cat-name"
                                                value={newCategory.name}
                                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                                placeholder="e.g., Daily Rituals"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="cat-desc">Description</Label>
                                            <Textarea
                                                id="cat-desc"
                                                value={newCategory.description}
                                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                                placeholder="Brief description"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="cat-icon">Icon</Label>
                                            <Select value={newCategory.icon} onValueChange={(value) => setNewCategory({ ...newCategory, icon: value })}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Flame">Flame</SelectItem>
                                                    <SelectItem value="Star">Star</SelectItem>
                                                    <SelectItem value="Heart">Heart</SelectItem>
                                                    <SelectItem value="BookOpen">BookOpen</SelectItem>
                                                    <SelectItem value="Users">Users</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <Button onClick={handleAddCategory} className="w-full">Add Category</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.map((cat) => (
                                <Card key={cat._id}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{cat.name}</CardTitle>
                                        <CardDescription>
                                            {services.filter(s => (s.category && s.category._id === cat._id) || s.category_id === cat._id || s.category === cat._id).length} services
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Services Section */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Services</CardTitle>
                                <CardDescription>Manage all services and pricing</CardDescription>
                            </div>
                            <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Service
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>Add New Service</DialogTitle>
                                        <DialogDescription>Create a new service offering</DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="service-name">Service Name *</Label>
                                                <Input
                                                    id="service-name"
                                                    value={newService.name}
                                                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                                    placeholder="e.g., Ganesha Vrata"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="category">Category *</Label>
                                                <Select value={newService.category_id} onValueChange={(value) => setNewService({ ...newService, category_id: value })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories.map((cat) => (
                                                            <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={newService.description}
                                                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                                placeholder="Service description"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="duration">Duration</Label>
                                                <Input
                                                    id="duration"
                                                    value={newService.duration}
                                                    onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                                                    placeholder="e.g., 2-3 hours"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="price">Price (₹) *</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    value={newService.price}
                                                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                                                    placeholder="e.g., 5000"
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={handleAddService} className="w-full">Add Service</Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {categories.map((category) => {
                                const categoryServices = services.filter(s => (s.category && s.category._id === category._id) || s.category_id === category._id || s.category === category._id);
                                if (categoryServices.length === 0) return null;

                                return (
                                    <div key={category._id}>
                                        <h3 className="font-semibold text-lg mb-3">{category.name}</h3>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {categoryServices.map((service) => (
                                                <Card key={service._id}>
                                                    <CardHeader>
                                                        <CardTitle className="text-base">{service.name}</CardTitle>
                                                        <CardDescription>{service.description}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="space-y-2">
                                                            <div className="flex items-center justify-between text-sm">
                                                                <span className="text-muted-foreground">Duration:</span>
                                                                <span>{service.duration}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-muted-foreground text-sm">Price:</span>
                                                                <div className="flex items-center gap-1 font-semibold text-primary">
                                                                    <IndianRupee className="h-4 w-4" />
                                                                    {service.price.toLocaleString('en-IN')}
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2 pt-2">
                                                                <Dialog>
                                                                    <DialogTrigger asChild>
                                                                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingService({ ...service })}>
                                                                            <Edit className="h-3 w-3 mr-1" />
                                                                            Edit
                                                                        </Button>
                                                                    </DialogTrigger>
                                                                    <DialogContent>
                                                                        <DialogHeader>
                                                                            <DialogTitle>Edit Service</DialogTitle>
                                                                        </DialogHeader>
                                                                        {editingService && (
                                                                            <div className="space-y-4">
                                                                                <div>
                                                                                    <Label>Service Name</Label>
                                                                                    <Input
                                                                                        value={editingService.name}
                                                                                        onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                                                                                    />
                                                                                </div>
                                                                                <div>
                                                                                    <Label>Description</Label>
                                                                                    <Textarea
                                                                                        value={editingService.description}
                                                                                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                                                                    />
                                                                                </div>
                                                                                <div className="grid grid-cols-2 gap-4">
                                                                                    <div>
                                                                                        <Label>Duration</Label>
                                                                                        <Input
                                                                                            value={editingService.duration}
                                                                                            onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                    <div>
                                                                                        <Label>Price (₹)</Label>
                                                                                        <Input
                                                                                            type="number"
                                                                                            value={editingService.price}
                                                                                            onChange={(e) => setEditingService({ ...editingService, price: parseFloat(e.target.value) })}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <Button onClick={handleUpdateService} className="w-full">Update Service</Button>
                                                                            </div>
                                                                        )}
                                                                    </DialogContent>
                                                                </Dialog>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteService(service._id)}
                                                                >
                                                                    <Trash2 className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
