import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { User, Shield } from 'lucide-react';

const Onboarding = () => {
    const { user, loading, checkAuth, getToken } = useAuth(); // Need checkAuth to refresh user after update
    const navigate = useNavigate();
    const { toast } = useToast();
    const [step, setStep] = useState<'role-selection' | 'seeker-form' | 'priest-form'>('role-selection');
    const [submitting, setSubmitting] = useState(false);

    // Common State
    const [formData, setFormData] = useState({
        // Common
        phone: '',
        address: '',
        gender: '',
        dob: '',
        religion: 'Hindu', // Default

        // Seeker Specific
        community: '',
        subSect: '',
        gotra: '',
        rashi: '',
        nakshatra: '',
        languages: '', // Comma separated

        // Priest Specific
        specialization: '', // Comma separated
        experience: '',
        qualificationRegular: '',
        qualificationDharmic: '',
        preferredTiming: '',
        occupation: '',
        bio: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (role: 'seeker' | 'priest') => {
        setSubmitting(true);
        try {
            console.log("Submitting profile update...");

            // Get token
            const token = await getToken();

            // Prepare payload
            const payload: any = {
                role,
                phone: formData.phone,
                address: formData.address,
                religion: formData.religion,
            };

            if (role === 'seeker') {
                payload.dob = formData.dob;
                payload.gender = formData.gender;
                payload.community = formData.community;
                payload.subSect = formData.subSect;
                payload.gotra = formData.gotra;
                payload.rashi = formData.rashi;
                payload.nakshatra = formData.nakshatra;
                payload.languages = formData.languages.split(',').map(s => s.trim()).filter(Boolean);
            } else {
                payload.specialization = formData.specialization.split(',').map(s => s.trim()).filter(Boolean);
                payload.experience = parseInt(formData.experience) || 0;
                payload.qualificationRegular = formData.qualificationRegular;
                payload.qualificationDharmic = formData.qualificationDharmic;
                payload.preferredTiming = formData.preferredTiming;
                payload.occupation = formData.occupation;
                payload.bio = formData.bio;
            }

            // Call API to update profile
            const response = await api.put('/auth/profile', payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Profile updated:", response.data);

            // Explicitly fetch new user data
            console.log("Refreshing auth context...");
            await checkAuth();

            toast({
                title: "Welcome!",
                description: "Your profile has been set up successfully.",
            });

            // Navigate based on the selected role, but ensure state is updated
            // The checkAuth update should trigger a re-render in App.tsx that redirects,
            // but we can also forcefully navigate to avoid waiting.
            navigate(`/dashboard/${role}`);

        } catch (error: any) {
            console.error("Onboarding Error:", error);
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to update profile. Please try again.",
                variant: "destructive"
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    if (step === 'role-selection') {
        return (
            <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-serif">Welcome to Dharmic Connect</CardTitle>
                        <CardDescription>Please select how you would like to join our community.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6 p-8">
                        <div
                            className="border-2 rounded-xl p-6 hover:border-primary hover:bg-orange-50 cursor-pointer transition-all text-center space-y-4"
                            onClick={() => setStep('seeker-form')}
                        >
                            <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                                <User className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-bold">I am a Seeker</h3>
                            <p className="text-sm text-muted-foreground">I am looking for spiritual services, pujas, and connections.</p>
                        </div>

                        <div
                            className="border-2 rounded-xl p-6 hover:border-primary hover:bg-blue-50 cursor-pointer transition-all text-center space-y-4"
                            onClick={() => setStep('priest-form')}
                        >
                            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                <Shield className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold">I am a Priest</h3>
                            <p className="text-sm text-muted-foreground">I am a qualified priest offering religious services.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-subtle py-12 px-4">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <Button variant="ghost" onClick={() => setStep('role-selection')} className="w-fit mb-2 p-0 h-auto hover:bg-transparent hover:underline">
                        &larr; Back to Selection
                    </Button>
                    <CardTitle className="text-2xl font-serif">
                        Complete Your {step === 'seeker-form' ? 'Seeker' : 'Priest'} Profile
                    </CardTitle>
                    <CardDescription>Please provide a few details to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {/* Common Fields */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" value={formData.phone} onChange={handleChange} placeholder="+91..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">City / Location</Label>
                                <Input id="address" value={formData.address} onChange={handleChange} placeholder="e.g. Bangalore" />
                            </div>
                        </div>

                        {/* Seeker Specific */}
                        {step === 'seeker-form' && (
                            <>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <Input id="dob" type="date" value={formData.dob} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <Select onValueChange={(val) => handleSelectChange('gender', val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gotra">Gotra</Label>
                                        <Input id="gotra" value={formData.gotra} onChange={handleChange} placeholder="Gotra" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rashi">Rashi (Moon Sign)</Label>
                                        <Input id="rashi" value={formData.rashi} onChange={handleChange} placeholder="e.g. Mesha" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="languages">Languages Known</Label>
                                    <Input id="languages" value={formData.languages} onChange={handleChange} placeholder="English, Hindi, Kannada..." />
                                </div>
                            </>
                        )}

                        {/* Priest Specific */}
                        {step === 'priest-form' && (
                            <>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="experience">Years of Experience</Label>
                                        <Input id="experience" type="number" value={formData.experience} onChange={handleChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="specialization">Specializations (Comma separated)</Label>
                                        <Input id="specialization" value={formData.specialization} onChange={handleChange} placeholder="Ganapati Homa, Marriage..." />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio / About You</Label>
                                    <Textarea id="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about your background..." />
                                </div>
                            </>
                        )}

                        <Button
                            className="w-full"
                            onClick={() => handleSubmit(step === 'seeker-form' ? 'seeker' : 'priest')}
                            disabled={submitting}
                        >
                            {submitting ? 'Setting up...' : 'Complete Setup'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Onboarding;
