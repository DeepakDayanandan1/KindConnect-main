"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
    ChevronLeft, Info, Upload, Image as ImageIcon, Facebook, Instagram, Linkedin,
    Youtube, MapPin, Mail, Phone, Building, User, FileText, CheckCircle2,
    Landmark, Users, LayoutGrid, Heart, GraduationCap, Leaf, AlertTriangle,
    Baby, Tractor, Brain, HandHeart, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { registerNGO } from "@/actions/ngo";

// Steps Configuration
const STEPS = [
    { id: 1, label: "Basic Details", icon: Info },
    { id: 2, label: "Media", icon: ImageIcon },
    { id: 3, label: "Contact", icon: MapPin },
    { id: 4, label: "Leadership", icon: User },
    { id: 5, label: "Compliance", icon: CheckCircle2 },
    { id: 6, label: "Banking", icon: Landmark },
    { id: 7, label: "Capacity", icon: Users },
    { id: 8, label: "Focus Themes", icon: LayoutGrid },
];

export default function AddNGOPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        // ... (Previous existing state)
        orgName: "", estDate: "", legalClassification: "", darpanId: "", mission: "", about: "",
        website: "", social: { fb: "", insta: "", linkedin: "", yt: "" },
        regAddress: { street: "", city: "", zip: "", state: "Kerala" },
        officeAddress: { sameAsReg: false, street: "", city: "", zip: "" },
        geoLink: "", officialEmail: "", officialPhone: "",
        ceo: { name: "", phone: "", email: "" },
        trustee: { name: "", phone: "", email: "" },
        contactPerson1: { name: "", design: "", phone: "", email: "" },
        contactPerson2: { name: "", design: "", phone: "", email: "" },
        regAuthority: "", regNumber: "", cin: "", pan: "",
        tax12a: { enabled: false, number: "", validUntil: "" },
        tax80g: { enabled: false, number: "", validUntil: "" },
        fcra: { status: "Not Applied", number: "", validUntil: "" },
        csrNumber: "",

        // NEW: Step 6 - Banking
        bankName: "", branchName: "", accountType: "current",
        accountHolder: "", ifsc: "", accountNumber: "", confirmAccountNumber: "",

        // NEW: Step 7 - Capacity
        staff: { male: 0, female: 0, transgender: 0, other: 0 },
        members: { male: 0, female: 0, transgender: 0, other: 0 },
        beneficiaries: { male: 0, female: 0, transgender: 0, other: 0 },
        operationReach: { urban: false, rural: false, tribal: false, coastal: false },
        primaryDistricts: [] as string[],

        // NEW: Step 8 - Focus Themes
        primaryFocus: "",
        secondaryFocus: [] as string[],
        targetBeneficiaries: {
            ruralPop: false, urbanSlums: false, tribal: false, bpl: false,
            physicallyChallenged: false, lgbtq: false, refugees: false, unemployed: false
        }
    });

    const handleNext = async () => {
        if (currentStep < 8) {
            setCurrentStep(c => c + 1);
        } else {
            // Submit Form
            setIsSubmitting(true);
            try {
                const result = await registerNGO(formData);
                if (result.success) {
                    toast.success("NGO Registered Successfully", {
                        description: "The organization has been added and pending verification."
                    });
                    // Small delay to let the toast show
                    setTimeout(() => {
                        router.push("/admin/ngos");
                    }, 1500);
                } else {
                    toast.error("Registration Failed", {
                        description: result.error
                    });
                }
            } catch (error) {
                toast.error("An unexpected error occurred");
                console.error(error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(c => c - 1);
    };

    const toggleDistrict = (district: string) => {
        setFormData(prev => ({
            ...prev,
            primaryDistricts: prev.primaryDistricts.includes(district)
                ? prev.primaryDistricts.filter(d => d !== district)
                : [...prev.primaryDistricts, district]
        }));
    };

    const toggleSecondaryFocus = (focus: string) => {
        setFormData(prev => ({
            ...prev,
            secondaryFocus: prev.secondaryFocus.includes(focus)
                ? prev.secondaryFocus.filter(f => f !== focus)
                : [...prev.secondaryFocus, focus]
        }));
    };

    const updateDemographics = (category: 'staff' | 'members' | 'beneficiaries', field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [category]: { ...prev[category], [field]: parseInt(value) || 0 }
        }));
    };

    const calculateTotal = (category: 'staff' | 'members' | 'beneficiaries') => {
        const { male, female, transgender, other } = formData[category];
        return male + female + transgender + other;
    };

    const primaryFocusOptions = [
        { id: "health", label: "Health", icon: Heart },
        { id: "education", label: "Education", icon: GraduationCap },
        { id: "environment", label: "Environment", icon: Leaf },
        { id: "disaster", label: "Disaster Relief", icon: AlertTriangle },
        { id: "women", label: "Women Empowerment", icon: Users },
        { id: "child", label: "Child Welfare", icon: Baby },
        { id: "rural", label: "Rural Development", icon: Tractor },
        { id: "mental", label: "Mental Health", icon: Brain },
    ];

    const secondaryFocusOptions = [
        "Elderly Care", "Vocational Training", "Clean Water", "Animal Welfare", "Arts & Culture", "Livelihood Support"
    ];

    const keralaDistricts = [
        "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", "Idukki",
        "Ernakulam", "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
    ];

    return (
        <div className="min-h-screen bg-background pb-8 font-sans transition-all duration-300">

            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm">
                <div className="flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-semibold">NGO Onboarding</h1>
                            <p className="text-[10px] text-muted-foreground hidden sm:block">Step-by-step registration for Samooham Kart.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="h-8 text-sm border-blue-600/20 text-blue-700 hover:bg-blue-50">Save Draft</Button>
                        {currentStep === 8 ? (
                            <Button size="sm" onClick={handleNext} className="h-8 text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm">Review & Finalize</Button>
                        ) : (
                            <Button size="sm" onClick={handleNext} className="h-8 text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm">Submit</Button>
                        )}
                    </div>
                </div>

                {/* Stepper Tabs */}
                <div className="flex overflow-x-auto border-b bg-muted/20 px-4 scrollbar-hide">
                    {STEPS.map((step) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <button
                                key={step.id}
                                onClick={() => setCurrentStep(step.id)}
                                className={cn(
                                    "flex items-center gap-4 border-b-2 px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap",
                                    isActive
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Icon className={cn("h-3.5 w-3.5", isActive && "text-blue-600")} />
                                {step.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Area - Updated spacing and width for minimal gaps */}
            <div className="w-full max-w-[98%] mx-auto py-4 px-2 sm:px-4 mt-1">

                {/* Step Content */}
                <div className="space-y-4">

                    {/* STEP 1: BASIC DETAILS */}
                    {currentStep === 1 && (
                        <div className="space-y-4 animate-in fade-in-50 duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h2 className="text-lg font-semibold leading-none">Basic Organization Details</h2>
                                    <p className="text-xs text-muted-foreground mt-1">CORE REGISTRATION AND IDENTITY INFORMATION</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">Organization Name</Label>
                                    <Input placeholder="Enter full legal name" value={formData.orgName} onChange={e => setFormData({ ...formData, orgName: e.target.value })} className="h-9 bg-muted/30 focus:bg-background transition-colors" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">Date of Establishment</Label>
                                    <Input type="date" value={formData.estDate} onChange={e => setFormData({ ...formData, estDate: e.target.value })} className="h-9 bg-muted/30" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">Legal Classification</Label>
                                    <Select>
                                        <SelectTrigger className="h-9 bg-muted/30"><SelectValue placeholder="Select classification" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="trust">Charitable Trust</SelectItem>
                                            <SelectItem value="society">Society</SelectItem>
                                            <SelectItem value="company">Section 8 Company</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">NGO ID</Label>
                                    <Input placeholder="SM/202X/XXXXXXX" value={formData.darpanId} onChange={e => setFormData({ ...formData, darpanId: e.target.value })} className="h-9 bg-muted/30" />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">Mission & Vision Statement</Label>
                                <Textarea placeholder="Briefly describe the primary mission and future vision..." className="min-h-[80px] bg-muted/30" value={formData.mission} onChange={e => setFormData({ ...formData, mission: e.target.value })} />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">About Us / Description</Label>
                                <Textarea placeholder="Detailed overview of the organization..." className="min-h-[120px] bg-muted/30" value={formData.about} onChange={e => setFormData({ ...formData, about: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4 animate-in fade-in-50 duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <ImageIcon className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold leading-none">Branding & Media</h2>
                                    <p className="text-xs text-muted-foreground mt-1">APP DISPLAY AND WEB PRESENCE</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">Organization Logo (1:1 Ratio)</Label>
                                    <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl h-40 flex flex-col items-center justify-center gap-2 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer group">
                                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform"><Upload className="h-4 w-4 text-muted-foreground" /></div>
                                        <div className="text-center"><p className="font-medium text-xs">Drag & Drop Logo</p><p className="text-[10px] text-muted-foreground">PNG/JPG, max 2MB</p></div>
                                        <Button variant="secondary" size="sm" className="h-7 text-xs">Browse Files</Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">Cover Image / Banner (16:9 Ratio)</Label>
                                    <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl h-40 flex flex-col items-center justify-center gap-2 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer group">
                                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform"><ImageIcon className="h-4 w-4 text-muted-foreground" /></div>
                                        <div className="text-center"><p className="font-medium text-xs">Drag & Drop Banner</p><p className="text-[10px] text-muted-foreground">1920x1080px</p></div>
                                        <Button variant="secondary" size="sm" className="h-7 text-xs">Browse Files</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">Website URL</Label>
                                <Input placeholder="https://www.organization.org" className="h-9 bg-muted/30" />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">Social Media Links</Label>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <div className="relative"><Facebook className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Facebook Profile URL" className="h-9 pl-9 bg-muted/30" /></div>
                                    <div className="relative"><Instagram className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="Instagram Profile URL" className="h-9 pl-9 bg-muted/30" /></div>
                                    <div className="relative"><Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="LinkedIn Company URL" className="h-9 pl-9 bg-muted/30" /></div>
                                    <div className="relative"><Youtube className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="YouTube Channel URL" className="h-9 pl-9 bg-muted/30" /></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-4 animate-in fade-in-50 duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <MapPin className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold leading-none">Contact & Location</h2>
                                    <p className="text-xs text-muted-foreground mt-1">OFFICIAL ADDRESS AND COMMUNICATION DETAILS</p>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-primary font-medium border-b pb-1 text-sm"><Building className="h-3.5 w-3.5" /> Registered Address</div>
                                    <div className="space-y-1.5"><Label className="text-[10px] font-semibold text-muted-foreground">STREET ADDRESS</Label><Input placeholder="Door No, Building Name, Street" className="h-9 bg-muted/30" /></div>
                                    <div className="grid grid-cols-2 gap-3"><div className="space-y-1.5"><Label className="text-[10px] font-semibold text-muted-foreground">CITY / TOWN</Label><Input placeholder="City" className="h-9 bg-muted/30" /></div><div className="space-y-1.5"><Label className="text-[10px] font-semibold text-muted-foreground">ZIP CODE</Label><Input placeholder="682001" className="h-9 bg-muted/30" /></div></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] font-semibold text-muted-foreground">STATE</Label><Select defaultValue="kerala"><SelectTrigger className="h-9 bg-muted/30"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="kerala">Kerala</SelectItem></SelectContent></Select></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between border-b pb-1"><div className="flex items-center gap-2 text-primary font-medium text-sm"><MapPin className="h-3.5 w-3.5" /> Office Address</div><div className="flex items-center space-x-2"><Checkbox id="same-as-reg" className="h-3.5 w-3.5" /><label htmlFor="same-as-reg" className="text-[10px] font-medium leading-none">SAME AS REGISTERED</label></div></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] font-semibold text-muted-foreground">STREET ADDRESS</Label><Input placeholder="Door No, Building Name, Street" className="h-9 bg-muted/30" /></div>
                                    <div className="grid grid-cols-2 gap-3"><div className="space-y-1.5"><Label className="text-[10px] font-semibold text-muted-foreground">CITY / TOWN</Label><Input placeholder="City" className="h-9 bg-muted/30" /></div><div className="space-y-1.5"><Label className="text-[10px] font-semibold text-muted-foreground">ZIP CODE</Label><Input placeholder="682001" className="h-9 bg-muted/30" /></div></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] font-semibold text-muted-foreground">GOOGLE MAPS LOCATION LINK</Label><div className="relative"><MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="https://maps.app.goo.gl/..." className="h-9 pl-9 bg-muted/30" /></div></div>
                                </div>
                            </div>
                            <div className="space-y-3 pt-3 border-t">
                                <div className="flex items-center gap-2 text-primary font-medium text-sm"><Mail className="h-3.5 w-3.5" /> Official Communication</div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5"><Label className="text-[10px] font-semibold text-muted-foreground">OFFICIAL EMAIL ID</Label><div className="relative"><Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="contact@organization.org" className="h-9 pl-9 bg-muted/30" /></div></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] font-semibold text-muted-foreground">OFFICIAL PHONE NUMBER</Label><div className="relative"><Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" /><Input placeholder="+91 0000 000 000" className="h-9 pl-9 bg-muted/30" /></div></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-4 animate-in fade-in-50 duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <User className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold leading-none">Key People & Leadership</h2>
                                    <p className="text-xs text-muted-foreground mt-1">MANAGEMENT AND OFFICIAL CONTACT PERSONS</p>
                                </div>
                            </div>
                            <div className="rounded-lg border bg-muted/10 p-4 space-y-3">
                                <div className="flex items-center gap-2 text-primary font-medium text-sm"><User className="h-3.5 w-3.5" /> CEO / HEAD OF ORGANIZATION</div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">Full Name</Label><Input placeholder="John Doe" className="h-9 bg-background" /></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">Phone Number</Label><Input placeholder="+91 98765 43210" className="h-9 bg-background" /></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">Email ID</Label><Input placeholder="ceo@organization.org" className="h-9 bg-background" /></div>
                                </div>
                            </div>
                            <div className="rounded-lg border bg-muted/10 p-4 space-y-3">
                                <div className="flex items-center gap-2 text-primary font-medium text-sm"><User className="h-3.5 w-3.5" /> MANAGEMENT TRUSTEE</div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">Full Name</Label><Input placeholder="Jane Smith" className="h-9 bg-background" /></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">Phone Number</Label><Input placeholder="+91 98765 43211" className="h-9 bg-background" /></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">Email ID</Label><Input placeholder="trustee@organization.org" className="h-9 bg-background" /></div>
                                </div>
                            </div>
                            <div className="rounded-lg border bg-muted/10 p-4 space-y-3">
                                <div className="flex items-center gap-2 text-primary font-medium text-sm"><User className="h-3.5 w-3.5" /> ADDITIONAL CONTACT PERSONS</div>
                                <div className="grid md:grid-cols-4 gap-3">
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground">Full Name</Label><Input placeholder="Name" className="h-9 bg-background" /></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground">Designation</Label><Input placeholder="e.g. Secretary" className="h-9 bg-background" /></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground">Phone</Label><Input placeholder="+91" className="h-9 bg-background" /></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground">Email</Label><Input placeholder="email@org.org" className="h-9 bg-background" /></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 5 && (
                        <div className="space-y-4 animate-in fade-in-50 duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold leading-none">Legal & Compliance</h2>
                                    <p className="text-xs text-muted-foreground mt-1">REGULATORY DOCUMENTS AND TAX EXEMPTIONS</p>
                                </div>
                            </div>
                            <div className="rounded-lg border bg-muted/10 p-4 space-y-4">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2"><FileText className="h-3.5 w-3.5" /> General Registration</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">REGISTRATION AUTHORITY</Label><Select><SelectTrigger className="h-9 bg-background"><SelectValue placeholder="Registrar of Societies" /></SelectTrigger><SelectContent><SelectItem value="registrar">Registrar of Societies</SelectItem></SelectContent></Select></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">REGISTRATION NUMBER</Label><Input placeholder="e.g. SM/2023/12345" className="h-9 bg-background" /></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">REGISTRATION CERTIFICATE</Label><div className="flex gap-2"><Input placeholder="PDF, JPG" readOnly className="h-9 bg-background text-xs" /><Button variant="outline" className="h-9 px-3">Upload</Button></div></div>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">CIN NUMBER (IF SECTION 8)</Label><Input placeholder="21-digit CIN" className="h-9 bg-background" /></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">NGO PAN NUMBER</Label><Input placeholder="ABCDE1234F" className="h-9 bg-background" /></div>
                                    <div className="space-y-1.5"><Label className="text-[10px] uppercase text-muted-foreground font-semibold">PAN CARD UPLOAD</Label><div className="flex gap-2"><Input placeholder="Select File" readOnly className="h-9 bg-background text-xs" /><Button variant="outline" className="h-9 px-3">Upload</Button></div></div>
                                </div>
                            </div>
                            <div className="rounded-lg border bg-muted/10 p-4 space-y-4">
                                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2"><Building className="h-3.5 w-3.5" /> Tax Exemptions (12A & 80G)</h3>
                                <div className="rounded-md border border-muted-foreground/20 p-3 bg-background/50">
                                    <div className="flex items-center justify-between mb-3"><Label className="font-semibold text-xs">12A Registration Status</Label><Switch className="scale-75" /></div>
                                    <div className="grid md:grid-cols-3 gap-3">
                                        <div className="md:col-span-3 space-y-1.5"><Label className="text-[10px] text-muted-foreground">12A REGISTRATION NUMBER</Label><Input placeholder="Registration No." className="h-8" /></div>
                                        <div className="space-y-1.5"><Label className="text-[10px] text-muted-foreground">VALIDITY DATE</Label><Input type="date" className="h-8" /></div>
                                        <div className="md:col-span-2 space-y-1.5"><Label className="text-[10px] text-muted-foreground">CERTIFICATE</Label><div className="flex gap-2"><Input placeholder="Required *" className="h-8" /><Button variant="ghost" size="sm" className="h-8 border">UPLOAD</Button></div></div>
                                    </div>
                                </div>
                                <div className="rounded-md border border-muted-foreground/20 p-3 bg-background/50">
                                    <div className="flex items-center justify-between mb-3"><Label className="font-semibold text-xs">80G Registration Status</Label><Switch className="scale-75" /></div>
                                    <div className="grid md:grid-cols-3 gap-3">
                                        <div className="md:col-span-3 space-y-1.5"><Label className="text-[10px] text-muted-foreground">80G REGISTRATION NUMBER</Label><Input placeholder="Registration No." className="h-8" /></div>
                                        <div className="space-y-1.5"><Label className="text-[10px] text-muted-foreground">VALIDITY DATE</Label><Input type="date" className="h-8" /></div>
                                        <div className="md:col-span-2 space-y-1.5"><Label className="text-[10px] text-muted-foreground">CERTIFICATE</Label><div className="flex gap-2"><Input placeholder="Select File" className="h-8" /><Button variant="ghost" size="sm" className="h-8 border">UPLOAD</Button></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 6: BANKING */}
                    {currentStep === 6 && (
                        <div className="space-y-4 animate-in fade-in-50 duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Landmark className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold leading-none">Banking Details</h2>
                                    <p className="text-xs text-muted-foreground mt-1">MANDATORY PAYMENT GATEWAY AND SETTLEMENT INFORMATION</p>
                                </div>
                            </div>

                            <div className="rounded-lg border bg-muted/10 p-4 space-y-4">
                                <div className="flex items-center gap-2 text-blue-600 font-medium tracking-wide text-xs uppercase">
                                    <FileText className="h-3.5 w-3.5" /> Account Information
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Bank Name</Label>
                                        <Input placeholder="e.g. State Bank of India" className="h-9 bg-background border-muted-foreground/20" value={formData.bankName} onChange={e => setFormData({ ...formData, bankName: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Branch Name</Label>
                                        <Input placeholder="e.g. Trivandrum Main" className="h-9 bg-background border-muted-foreground/20" value={formData.branchName} onChange={e => setFormData({ ...formData, branchName: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Account Type</Label>
                                        <Select value={formData.accountType} onValueChange={(val) => setFormData({ ...formData, accountType: val })}>
                                            <SelectTrigger className="h-9 bg-background border-muted-foreground/20"><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="current">Current Account</SelectItem>
                                                <SelectItem value="savings">Savings Account</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2 space-y-1.5">
                                        <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Account Holder Name</Label>
                                        <Input placeholder="Official Registered NGO Name" className="h-9 bg-background border-muted-foreground/20" value={formData.accountHolder} onChange={e => setFormData({ ...formData, accountHolder: e.target.value })} />
                                        <p className="text-[10px] text-blue-600/80 italic">Note: Must match NGO Name exactly as per Registration</p>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">IFSC Code</Label>
                                        <Input placeholder="SBIN00XXXXX" className="h-9 bg-background border-muted-foreground/20 uppercase" value={formData.ifsc} onChange={e => setFormData({ ...formData, ifsc: e.target.value })} />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Account Number</Label>
                                        <Input placeholder="Enter Full Account Number" className="h-9 bg-background border-muted-foreground/20" value={formData.accountNumber} onChange={e => setFormData({ ...formData, accountNumber: e.target.value })} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Confirm Account Number</Label>
                                        <Input placeholder="Re-enter Account Number" className="h-9 bg-background border-muted-foreground/20" value={formData.confirmAccountNumber} onChange={e => setFormData({ ...formData, confirmAccountNumber: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border bg-muted/10 p-4 space-y-4">
                                <div className="flex items-center gap-2 text-blue-600 font-medium tracking-wide text-xs uppercase">
                                    <FileText className="h-3.5 w-3.5" /> Verification Documents
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Cancelled Cheque Copy</Label>
                                    <div className="border-2 border-dashed border-blue-600/20 rounded-xl bg-blue-500/5 h-32 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-500/10 transition-colors group">
                                        <div className="h-8 w-8 rounded-full bg-blue-100/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                            <Upload className="h-4 w-4 text-blue-700" />
                                        </div>
                                        <h4 className="font-semibold text-sm text-blue-900">Upload Cancelled Cheque</h4>
                                        <p className="text-[10px] text-muted-foreground mt-0.5">PDF, PNG or JPG (Max 10MB)</p>
                                    </div>
                                </div>
                                <div className="bg-blue-900/40 rounded-lg p-3 flex items-start gap-3 border border-blue-500/20">
                                    <Info className="h-3.5 w-3.5 text-white mt-0.5" />
                                    <p className="text-[10px] text-white leading-relaxed">Ensure that the NGO Name, Account Number, and IFSC code are clearly visible on the cheque. This will be used to verify your bank details before processing settlements.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 7: CAPACITY */}
                    {currentStep === 7 && (
                        <div className="space-y-4 animate-in fade-in-50 duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Users className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold leading-none">Capacity & Demographics Details</h2>
                                    <p className="text-xs text-muted-foreground mt-1">WORKFORCE AND BENEFICIARY REACH BREAKDOWN</p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="grid grid-cols-6 gap-3 mb-1 px-2">
                                    <div className="col-span-2 text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Category</div>
                                    <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider text-center">Male</div>
                                    <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider text-center">Female</div>
                                    <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider text-center">Transgender</div>
                                    <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider text-center">Total</div>
                                </div>

                                <div className="rounded-lg border bg-muted/10 p-3 space-y-3">
                                    {[
                                        { id: 'staff', label: 'Staff Count', sub: 'Permanent and contract employees' },
                                        { id: 'members', label: 'Member Count', sub: 'Active board/general members' },
                                        { id: 'beneficiaries', label: 'Beneficiary Capacity', sub: 'Total people reached annually' }
                                    ].map((row) => (
                                        <div key={row.id} className="grid grid-cols-6 gap-3 items-center">
                                            <div className="col-span-2">
                                                <Label className="font-semibold text-xs">{row.label}</Label>
                                                <p className="text-[9px] text-muted-foreground">{row.sub}</p>
                                            </div>
                                            {(['male', 'female', 'transgender'] as const).map(gender => (
                                                <Input
                                                    key={gender}
                                                    type="number"
                                                    className="h-8 bg-background text-center text-xs"
                                                    placeholder="0"
                                                    value={formData[row.id as 'staff' | 'members' | 'beneficiaries'][gender] || ''}
                                                    onChange={e => updateDemographics(row.id as any, gender, e.target.value)}
                                                />
                                            ))}
                                            <div className="bg-muted-foreground/10 rounded-md h-8 flex items-center justify-center font-bold text-xs">
                                                {calculateTotal(row.id as any)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 pt-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold">Operational Reach</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            { id: 'urban', label: 'Urban' }, { id: 'rural', label: 'Rural' },
                                            { id: 'tribal', label: 'Tribal Areas' }, { id: 'coastal', label: 'Coastal Areas' }
                                        ].map(area => (
                                            <div key={area.id} className="flex items-center space-x-2 border rounded-md p-2 bg-muted/10">
                                                <Checkbox
                                                    id={area.id}
                                                    className="h-3.5 w-3.5"
                                                    checked={formData.operationReach[area.id as keyof typeof formData.operationReach]}
                                                    onCheckedChange={(c) => setFormData({ ...formData, operationReach: { ...formData.operationReach, [area.id]: !!c } })}
                                                />
                                                <label htmlFor={area.id} className="text-xs font-medium leading-none cursor-pointer">{area.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold">Primary Districts of Operation</Label>
                                    <div className="border rounded-md bg-muted/10 h-[140px] overflow-y-auto p-1.5">
                                        <div className="space-y-0.5">
                                            {keralaDistricts.map(district => (
                                                <div
                                                    key={district}
                                                    className={cn(
                                                        "flex items-center px-2 py-1.5 rounded-md text-xs cursor-pointer transition-colors",
                                                        formData.primaryDistricts.includes(district) ? "bg-blue-100 text-blue-900" : "hover:bg-muted/50"
                                                    )}
                                                    onClick={() => toggleDistrict(district)}
                                                >
                                                    <div className={cn("h-3.5 w-3.5 mr-2 border rounded flex items-center justify-center", formData.primaryDistricts.includes(district) ? "bg-blue-600 border-blue-600 text-white" : "border-muted-foreground")}>
                                                        {formData.primaryDistricts.includes(district) && <CheckCircle2 className="h-2.5 w-2.5" />}
                                                    </div>
                                                    {district}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-muted-foreground uppercase text-right">Hold Ctrl/Cmd to select multiple</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 8: FOCUS THEMES */}
                    {currentStep === 8 && (
                        <div className="space-y-6 animate-in fade-in-50 duration-500">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <LayoutGrid className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold leading-none">Themes & Focus Areas</h2>
                                    <p className="text-xs text-muted-foreground mt-1">PRIMARY AND SECONDARY CATEGORIES OF OPERATION</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="flex items-center gap-2 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                                    <div className="h-3.5 w-3.5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[9px]">★</div>
                                    Primary Focus Area
                                </Label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {primaryFocusOptions.map((option) => {
                                        const Icon = option.icon;
                                        const isSelected = formData.primaryFocus === option.id;

                                        return (
                                            <div
                                                key={option.id}
                                                onClick={() => setFormData({ ...formData, primaryFocus: option.id })}
                                                className={cn(
                                                    "cursor-pointer flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                                                    isSelected
                                                        ? "border-blue-500 bg-blue-500/10 shadow-sm"
                                                        : "border-muted-foreground/10 bg-muted/5 hover:border-blue-500/50 hover:bg-muted/10"
                                                )}
                                            >
                                                <div className={cn("h-8 w-8 rounded-full flex items-center justify-center transition-colors", isSelected ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground")}>
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <span className={cn("text-xs font-medium text-center", isSelected ? "text-blue-700" : "text-muted-foreground")}>{option.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-3 pt-3 border-t">
                                <Label className="flex items-center gap-2 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                                    <div className="h-3.5 w-3.5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-[9px]">+</div>
                                    Secondary Focus Areas
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                    {secondaryFocusOptions.map(focus => {
                                        const isSelected = formData.secondaryFocus.includes(focus);
                                        return (
                                            <div
                                                key={focus}
                                                onClick={() => toggleSecondaryFocus(focus)}
                                                className={cn(
                                                    "rounded-full px-3 py-1 text-[10px] font-medium border cursor-pointer transition-all flex items-center gap-1.5",
                                                    isSelected
                                                        ? "bg-blue-900 text-blue-100 border-blue-700 shadow-sm"
                                                        : "bg-muted/10 border-muted-foreground/20 text-muted-foreground hover:border-blue-500/50"
                                                )}
                                            >
                                                {focus}
                                                {isSelected ? <X className="h-2.5 w-2.5" /> : <div className="h-2.5 w-2.5 flex items-center justify-center">+</div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="rounded-xl border bg-muted/10 p-4 space-y-3">
                                <Label className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-wider">
                                    <Users className="h-3.5 w-3.5" /> Target Beneficiaries
                                </Label>
                                <div className="grid md:grid-cols-4 gap-3">
                                    {[
                                        { id: 'ruralPop', label: 'Rural Population' }, { id: 'urbanSlums', label: 'Urban Slums' },
                                        { id: 'tribal', label: 'Tribal Communities' }, { id: 'bpl', label: 'Below Poverty Line' },
                                        { id: 'physicallyChallenged', label: 'Physically Challenged' }, { id: 'lgbtq', label: 'LGBTQ+ Community' },
                                        { id: 'refugees', label: 'Refugees' }, { id: 'unemployed', label: 'Unemployed Youth' }
                                    ].map(item => (
                                        <div key={item.id} className="flex items-center space-x-2 border rounded-md p-2.5 bg-background/50">
                                            <Checkbox
                                                id={item.id}
                                                className="h-3.5 w-3.5"
                                                checked={formData.targetBeneficiaries[item.id as keyof typeof formData.targetBeneficiaries]}
                                                onCheckedChange={(c) => setFormData({ ...formData, targetBeneficiaries: { ...formData.targetBeneficiaries, [item.id]: !!c } })}
                                            />
                                            <label htmlFor={item.id} className="text-[10px] font-medium leading-none cursor-pointer">{item.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Navigation - Compact */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <Button variant="outline" size="sm" onClick={handleBack} disabled={currentStep === 1} className={cn("h-8 text-xs", currentStep === 1 && "opacity-0 invisible")}>
                        <ChevronLeft className="mr-1 h-3 w-3" /> Back
                    </Button>

                    <div className="text-[10px] text-muted-foreground font-medium">
                        Step {currentStep} of 8
                    </div>

                    {currentStep === 8 ? (
                        <Button
                            size="sm"
                            onClick={handleNext}
                            disabled={isSubmitting}
                            className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                        >
                            {isSubmitting ? "Finalizing..." : "Finalize"}
                            {!isSubmitting && <CheckCircle2 className="ml-1.5 h-3.5 w-3.5" />}
                        </Button>
                    ) : (
                        <Button size="sm" onClick={handleNext} className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]">
                            Next <ChevronLeft className="ml-1.5 h-3.5 w-3.5 rotate-180" />
                        </Button>
                    )}
                </div>

                {/* Progress Bar */}
                <div className="mt-4 bg-muted rounded-full h-1 w-full max-w-xs mx-auto overflow-hidden">
                    <div className="bg-blue-500 h-full transition-all duration-300 ease-in-out" style={{ width: `${(currentStep / 8) * 100}%` }}></div>
                </div>

            </div>
        </div>
    );
}
