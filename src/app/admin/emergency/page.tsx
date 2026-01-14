"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit, Eye, X, Save, Upload, CreditCard, QrCode, FileText, ArrowLeft, Clock, Search, Filter } from "lucide-react";
import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Utils
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

// Placeholder data with new case
const initialEmergencies = [
    {
        id: "1",
        caseId: "#EK-2023-842",
        title: "Urgent Medical Appeal: Save Aarav Sharma's Life",
        location: "Delhi, India",
        status: "LIVE", // LIVE, REVIEW, CLOSED
        category: "Medical",
        targetAmount: 1750000,
        raisedAmount: 350000, // approx 20%
        image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1ef4d?q=80&w=800", // New Child image
        date: "2024-01-14",
        story: "Aarav Sharma, a bright 2-year old from Delhi is battling a severe liver condition that requires a urgent transplant. His family has exhausted all their savings on the immediate surgery, but chances for a healthy future are thinning rapidly. The procedure, along with post-operative care, comes with a significant financial burden that the family, already struggling, cannot bear alone. Every contribution, big or small, brings us closer to saving Aarav.",
        recentUpdates: [
            {
                id: "u1",
                text: "His parents deeply moved have dedicated every penny possible to help. They have sold their assets and borrowed from relatives but the sum required is far beyond their means. Aarav deserves a second chance at life.",
                date: "2024-01-14T10:00:00"
            },
            {
                id: "u2",
                text: "Aarav has been admitted to the ICU for stabilization before the planned surgery. Doctors are monitoring his vitals closely.",
                date: "2024-01-13T14:30:00"
            }
        ],
        bankDetails: {
            accountName: "Aarav Sharma Fund",
            accountNumber: "919292929292",
            ifsc: "HDFC0001234",
            bankName: "HDFC Bank"
        },
        upiId: "aarav.help@upi",
        documents: [
            { name: "Medical Diagnosis Report", type: "pdf", url: "#" },
            { name: "Hospital Estimate", type: "image", url: "#" }
        ]
    }
];

export default function EmergencyPage() {
    const [emergencies, setEmergencies] = useState(initialEmergencies);
    const [viewingId, setViewingId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUpdate, setSelectedUpdate] = useState<{ id: string, text: string, date: string } | null>(null);
    const [newUpdateText, setNewUpdateText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    // For editing
    const [editData, setEditData] = useState<any>(null);

    const activeCase = emergencies.find(e => e.id === viewingId);

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this emergency case?")) {
            setEmergencies(emergencies.filter(e => e.id !== id));
            if (viewingId === id) setViewingId(null);
        }
    };

    const handleView = (id: string) => {
        setViewingId(id);
        const caseToView = emergencies.find(e => e.id === id);
        if (caseToView) setEditData(caseToView);
        setIsEditing(false);
    };

    const handleCreate = () => {
        const newId = (Math.random() * 10000).toString();
        const year = new Date().getFullYear();
        const randomNum = Math.floor(Math.random() * 900) + 100;

        const newCase = {
            id: newId,
            caseId: `#EK-${year}-${randomNum}`,
            title: "",
            location: "",
            status: "DRAFT",
            category: "Medical",
            targetAmount: 0,
            raisedAmount: 0,
            image: "",
            date: new Date().toISOString().split('T')[0],
            story: "",
            recentUpdates: [],
            bankDetails: {
                accountName: "",
                accountNumber: "",
                ifsc: "",
                bankName: ""
            },
            upiId: "",
            documents: []
        };
        setEditData(newCase);
        setViewingId(newId); // Open sheet with this temp ID
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!editData) return;

        // If saving a draft/new case, set to LIVE by default or keep existing status
        const statusToSave = editData.status === "DRAFT" ? "LIVE" : editData.status;
        const dataToSave = { ...editData, status: statusToSave };

        setEmergencies(prev => {
            const exists = prev.find(e => e.id === dataToSave.id);
            if (exists) {
                return prev.map(e => e.id === dataToSave.id ? dataToSave : e);
            } else {
                return [dataToSave, ...prev];
            }
        });
        setIsEditing(false);
        setViewingId(dataToSave.id);
    };

    const updateEditField = (field: string, value: any) => {
        setEditData({ ...editData, [field]: value });
    };

    const updateBankField = (field: string, value: any) => {
        setEditData({ ...editData, bankDetails: { ...editData.bankDetails, [field]: value } });
    };

    const addUpdate = () => {
        if (!newUpdateText.trim()) return;
        const newUpdate = {
            id: Date.now().toString(),
            text: newUpdateText,
            date: new Date().toISOString()
        };
        const updatedList = [newUpdate, ...(editData.recentUpdates || [])];
        updateEditField('recentUpdates', updatedList);
        setNewUpdateText("");
    };

    const deleteUpdate = (updateId: string) => {
        const updatedList = (editData.recentUpdates || []).filter((u: any) => u.id !== updateId);
        updateEditField('recentUpdates', updatedList);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "LIVE": return "bg-green-500/15 text-green-700 hover:bg-green-500/25 border-green-200";
            case "REVIEW": return "bg-yellow-500/15 text-yellow-700 hover:bg-yellow-500/25 border-yellow-200";
            case "CLOSED": return "bg-gray-500/15 text-gray-700 hover:bg-gray-500/25 border-gray-200";
            case "DRAFT": return "bg-slate-500/15 text-slate-700 hover:bg-slate-500/25 border-slate-200";
            default: return "bg-primary/10 text-primary hover:bg-primary/20";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Emergency Requirements</h1>
                    <p className="text-muted-foreground">Manage urgent fund appeals displayed on the home page.</p>
                </div>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Case
                </Button>
            </div>

            {/* Filter/Search Bar */}
            <div className="flex items-center gap-4 bg-muted/40 p-4 rounded-lg border">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or ID..."
                        className="pl-8 bg-background border-muted-foreground/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px] bg-background">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="oldest">Oldest First</SelectItem>
                            <SelectItem value="amount-high">Goal: High to Low</SelectItem>
                            <SelectItem value="amount-low">Goal: Low to High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* List View Table */}
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[100px]">CASE ID</TableHead>
                            <TableHead className="min-w-[200px]">PATIENT/CASE NAME</TableHead>
                            <TableHead>CATEGORY</TableHead>
                            <TableHead>GOAL AMOUNT</TableHead>
                            <TableHead>CURRENT AMOUNT</TableHead>
                            <TableHead className="min-w-[150px]">PROGRESS</TableHead>
                            <TableHead>STATUS</TableHead>
                            <TableHead className="text-right">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {emergencies
                            .filter(item =>
                                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.caseId.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .sort((a, b) => {
                                if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
                                if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
                                if (sortBy === 'amount-high') return b.targetAmount - a.targetAmount;
                                if (sortBy === 'amount-low') return a.targetAmount - b.targetAmount;
                                return 0;
                            })
                            .map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="cursor-pointer hover:bg-muted/30 transition-colors group"
                                    onClick={() => handleView(item.id)}
                                >
                                    <TableCell className="font-medium text-primary">{item.caseId}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-foreground">{item.title || "Untitled Case"}</span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                {item.location || "Location not specified"}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="font-medium rounded-md px-2.5 py-0.5 text-xs bg-blue-500/10 text-blue-700 hover:bg-blue-500/20 border-blue-100">
                                            {item.category.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{formatCurrency(item.targetAmount)}</TableCell>
                                    <TableCell className="text-green-600 font-medium">{formatCurrency(item.raisedAmount)}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1.5 w-[80%]">
                                            <div className="flex justify-between text-xs">
                                                <span className="font-medium text-muted-foreground">
                                                    {item.targetAmount > 0
                                                        ? Math.round((item.raisedAmount / item.targetAmount) * 100)
                                                        : 0}%
                                                </span>
                                            </div>
                                            <Progress
                                                value={item.targetAmount > 0 ? (item.raisedAmount / item.targetAmount) * 100 : 0}
                                                className="h-1.5"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`rounded-md px-2.5 py-0.5 text-xs font-semibold uppercase ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive transition-colors hover:bg-destructive/10"
                                            onClick={(e) => handleDelete(item.id, e)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {emergencies.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                                    No emergency cases found. Create one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Detailed View Sheet */}
            <Sheet open={!!viewingId} onOpenChange={(open) => !open && setViewingId(null)}>
                <SheetContent className="w-full max-w-full sm:max-w-full p-0 flex flex-col bg-background overflow-hidden data-[state=open]:duration-0 data-[state=closed]:duration-0">
                    {editData && (
                        <>
                            {/* Header with Edit Button */}
                            <div className="flex items-center justify-between px-6 py-4 border-b bg-background sticky top-0 z-10 gap-4">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => { setViewingId(null); setIsEditing(false); }}>
                                        <ArrowLeft className="h-5 w-5" />
                                    </Button>
                                    <SheetTitle className="text-xl font-semibold">
                                        {activeCase ? `Case Details: ${editData.caseId}` : "New Emergency Case"}
                                    </SheetTitle>
                                </div>
                                <Button
                                    size="sm"
                                    variant={isEditing ? "default" : "outline"}
                                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                    className="gap-2"
                                >
                                    {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                                    {isEditing ? "Save & Publish" : "Edit Case"}
                                </Button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
                                <div className="space-y-8 container max-w-7xl mx-auto">

                                    {/* Header Section (Title & Category) */}
                                    <div className="space-y-4">
                                        {isEditing ? (
                                            <div className="space-y-3">
                                                <Input
                                                    value={editData.title}
                                                    placeholder="Emergency Case Title"
                                                    onChange={(e) => updateEditField('title', e.target.value)}
                                                    className="text-2xl font-bold h-auto py-2"
                                                />
                                                <div className="flex gap-4">
                                                    <div className="w-1/3 space-y-2">
                                                        <Label>Category</Label>
                                                        <Input
                                                            value={editData.category}
                                                            placeholder="Category (e.g. Medical)"
                                                            onChange={(e) => updateEditField('category', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="w-1/3 space-y-2">
                                                        <Label>Location</Label>
                                                        <Input
                                                            value={editData.location}
                                                            placeholder="State, City"
                                                            onChange={(e) => updateEditField('location', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="w-1/3 space-y-2">
                                                        <Label>Status</Label>
                                                        <select
                                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                            value={editData.status}
                                                            onChange={(e) => updateEditField('status', e.target.value)}
                                                        >
                                                            <option value="DRAFT">Draft</option>
                                                            <option value="LIVE">Live</option>
                                                            <option value="REVIEW">Review</option>
                                                            <option value="CLOSED">Closed</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline" className={getStatusColor(editData.status)}>
                                                        {editData.status}
                                                    </Badge>
                                                    <span className="text-sm text-muted-foreground">
                                                        {editData.location}
                                                    </span>
                                                </div>
                                                <h1 className="text-3xl font-bold leading-tight mb-2">{editData.title || "Untitled Case"}</h1>
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 uppercase tracking-wider">
                                                    {editData.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-8 items-start">

                                        {/* Left Column: Updates, Story & Content */}
                                        <div className="md:col-span-2 space-y-8">

                                            {/* Recent Updates - MOVED TO TOP */}
                                            <div className="space-y-3">
                                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    Recent Updates
                                                </h3>

                                                {isEditing ? (
                                                    <div className="space-y-4">
                                                        <div className="flex gap-2">
                                                            <Textarea
                                                                value={newUpdateText}
                                                                onChange={(e) => setNewUpdateText(e.target.value)}
                                                                placeholder="Add a new update status..."
                                                                className="min-h-[80px]"
                                                            />
                                                            <Button onClick={addUpdate} className="self-end">Add</Button>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {(editData.recentUpdates || []).map((update: any) => (
                                                                <div key={update.id} className="flex justify-between items-start p-3 bg-muted rounded-md text-sm">
                                                                    <div>
                                                                        <span className="text-xs text-muted-foreground block mb-1">{formatDate(update.date)}</span>
                                                                        <p>{update.text}</p>
                                                                    </div>
                                                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => deleteUpdate(update.id)}>
                                                                        <X className="h-3 w-3" />
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3">
                                                        {(editData.recentUpdates || []).length > 0 ? (
                                                            (editData.recentUpdates || [])
                                                                .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                                                .map((update: any) => (
                                                                    <div
                                                                        key={update.id}
                                                                        className="group relative pl-4 border-l-2 border-primary/20 hover:border-primary transition-colors cursor-pointer py-1"
                                                                        onClick={() => setSelectedUpdate(update)}
                                                                    >
                                                                        <div className="flex justify-between items-center mb-1">
                                                                            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                                                                {formatDate(update.date)}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-sm text-foreground/90 truncate pr-4">
                                                                            {update.text}
                                                                        </p>
                                                                        <div className="absolute inset-0 bg-transparent" /> {/* Click overlay */}
                                                                    </div>
                                                                ))
                                                        ) : (
                                                            <p className="text-sm text-muted-foreground italic">No updates available yet.</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <Separator />

                                            {/* Story */}
                                            <div className="space-y-3">
                                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                                    About the Cause
                                                </h3>
                                                {isEditing ? (
                                                    <Textarea
                                                        value={editData.story}
                                                        onChange={(e) => updateEditField('story', e.target.value)}
                                                        className="min-h-[200px] text-base leading-relaxed"
                                                        placeholder="Write the detailed story here..."
                                                    />
                                                ) : (
                                                    <div className="prose max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                                        {editData.story || "No story description provided."}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Documents */}
                                            <div className="space-y-4">
                                                <h3 className="font-semibold text-lg">Documents & Proofs</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {editData.documents?.map((doc: any, i: number) => (
                                                        <div key={i} className="aspect-[4/3] rounded-lg border bg-muted/50 flex flex-col items-center justify-center p-3 gap-2 cursor-pointer hover:border-primary/50 transition-colors">
                                                            <FileText className="h-6 w-6 text-muted-foreground" />
                                                            <span className="text-xs text-center text-muted-foreground line-clamp-2">{doc.name}</span>
                                                        </div>
                                                    ))}
                                                    {isEditing && (
                                                        <div className="aspect-[4/3] rounded-lg border border-dashed flex flex-col items-center justify-center p-3 gap-2 cursor-pointer hover:bg-muted/50 text-muted-foreground hover:text-primary transition-colors">
                                                            <Upload className="h-5 w-5" />
                                                            <span className="text-xs">Add</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Column: Media, Funding, Bank Inputs */}
                                        <div className="space-y-6">

                                            {/* Image Card */}
                                            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                                                <div className="relative h-48 w-full bg-muted group cursor-pointer">
                                                    {editData.image ? (
                                                        <Image
                                                            src={editData.image}
                                                            alt={editData.title}
                                                            fill
                                                            className="object-cover transition-opacity group-hover:opacity-75"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                                            <FileText className="h-10 w-10 opacity-20" />
                                                        </div>
                                                    )}
                                                    {isEditing && (
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                                            <div className="bg-background/90 text-foreground rounded-full p-2 shadow-sm">
                                                                <Upload className="h-4 w-4" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-4 space-y-4">
                                                    <div className="space-y-1">
                                                        <div className="flex justify-between text-sm font-medium">
                                                            <span className="text-primary">{formatCurrency(editData.raisedAmount)}</span>
                                                            <span className="text-muted-foreground">of {formatCurrency(editData.targetAmount || 0)}</span>
                                                        </div>
                                                        <Progress value={editData.targetAmount ? (editData.raisedAmount / editData.targetAmount) * 100 : 0} className="h-2" />
                                                    </div>

                                                    {isEditing && (
                                                        <div className="space-y-2 pt-2 border-t">
                                                            <Label className="text-xs">Target Goal (₹)</Label>
                                                            <Input
                                                                type="number"
                                                                value={editData.targetAmount}
                                                                onChange={(e) => updateEditField('targetAmount', parseFloat(e.target.value))}
                                                            />

                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Bank & UPI */}
                                            <div className="space-y-4 rounded-xl border p-4 bg-muted/10">
                                                <div className="flex items-center gap-2 font-semibold">
                                                    <CreditCard className="h-4 w-4" /> Banking Info
                                                </div>
                                                {isEditing ? (
                                                    <div className="space-y-3">
                                                        <Input placeholder="Acct Name" value={editData.bankDetails?.accountName} onChange={(e) => updateBankField('accountName', e.target.value)} />
                                                        <Input placeholder="Acct Number" value={editData.bankDetails?.accountNumber} onChange={(e) => updateBankField('accountNumber', e.target.value)} />
                                                        <Input placeholder="IFSC" value={editData.bankDetails?.ifsc} onChange={(e) => updateBankField('ifsc', e.target.value)} />
                                                        <Input placeholder="UPI ID" value={editData.upiId} onChange={(e) => updateEditField('upiId', e.target.value)} />

                                                        <div className="pt-2">
                                                            <Label className="text-xs mb-2 block">Payment QR Code</Label>
                                                            <div className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-center cursor-pointer bg-muted/30 group">
                                                                <div className="h-8 w-8 bg-background rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                                    <QrCode className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                                                </div>
                                                                <p className="text-[10px] text-muted-foreground">Upload QR Code</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3 text-sm">
                                                        <div className="grid grid-cols-3 gap-1">
                                                            <span className="text-muted-foreground col-span-1">Details:</span>
                                                            <span className="font-medium col-span-2 text-right">{editData.bankDetails?.accountName || "--"}<br />{editData.bankDetails?.accountNumber}<br />{editData.bankDetails?.ifsc}</span>
                                                        </div>
                                                        <Separator />
                                                        <div className="grid grid-cols-3 gap-1 items-center">
                                                            <span className="text-muted-foreground col-span-1">UPI:</span>
                                                            <span className="font-medium col-span-2 text-right break-all bg-background px-2 py-1 rounded border">{editData.upiId || "--"}</span>
                                                        </div>

                                                        {editData.upiId && (
                                                            <div className="pt-2 flex justify-center">
                                                                <div className="relative h-32 w-32 bg-white rounded-lg border shadow-sm p-2 flex items-center justify-center">
                                                                    <Image
                                                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${editData.upiId}&pn=${encodeURIComponent(editData.bankDetails?.accountName || 'Beneficiary')}`}
                                                                        alt="Payment QR Code"
                                                                        width={120}
                                                                        height={120}
                                                                        className="object-contain"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>

            {/* Updates Detail Dialog */}
            <Dialog open={!!selectedUpdate} onOpenChange={(open) => !open && setSelectedUpdate(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Update Details</DialogTitle>
                        <DialogDescription>
                            {selectedUpdate && formatDate(selectedUpdate.date)}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="rounded-md bg-muted p-4 text-sm leading-relaxed">
                            {selectedUpdate?.text}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
