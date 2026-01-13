"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Plus, Trash2, Edit, Eye, X, Save, Upload, CreditCard, QrCode, FileText, ArrowLeft } from "lucide-react";
import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Placeholder data with new case
const initialEmergencies = [
    {
        id: "1",
        title: "Urgent Medical Appeal: Save Aarav Sharma's Life",
        category: "Medical - Liver Transplant",
        targetAmount: 1750000,
        raisedAmount: 350000, // approx 20%
        image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1ef4d?q=80&w=800", // New Child image
        date: "2024-01-14",
        story: "Aarav Sharma, a bright 2-year old from Delhi is battling a severe liver condition that requires a urgent transplant. His family has exhausted all their savings on the immediate surgery, but chances for a healthy future are thinning rapidly. The procedure, along with post-operative care, comes with a significant financial burden that the family, already struggling, cannot bear alone. Every contribution, big or small, brings us closer to saving Aarav.",
        recentUpdates: "His parents deeply moved have dedicated every penny possible to help. They have sold their assets and borrowed from relatives but the sum required is far beyond their means. Aarav deserves a second chance at life.",
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

    // For editing
    const [editData, setEditData] = useState<any>(null);

    const activeCase = emergencies.find(e => e.id === viewingId);

    const handleDelete = (id: string) => {
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
        const newCase = {
            id: newId,
            title: "",
            category: "Medical",
            targetAmount: 0,
            raisedAmount: 0,
            image: "",
            date: new Date().toISOString().split('T')[0],
            story: "",
            recentUpdates: "",
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

        setEmergencies(prev => {
            const exists = prev.find(e => e.id === editData.id);
            if (exists) {
                return prev.map(e => e.id === editData.id ? editData : e);
            } else {
                return [editData, ...prev];
            }
        });
        setIsEditing(false);
        // Keep viewing the new/edited case, but in read mode
        setViewingId(editData.id);
        // We need to ensure 'activeCase' in render can find it. 
        // Since we updated state, re-render will match 'viewingId' to the new item in 'emergencies'.
    };

    const updateEditField = (field: string, value: any) => {
        setEditData({ ...editData, [field]: value });
    };

    const updateBankField = (field: string, value: any) => {
        setEditData({ ...editData, bankDetails: { ...editData.bankDetails, [field]: value } });
    };

    // We need to handle the case where 'activeCase' is undefined immediately after clicking Create
    // because viewingId is set but emergencies state hasn't updated yet with the new ID.
    // Actually, for "Create", we should mainly rely on 'editData' for rendering the form.
    // The Sheet content logic currently relies on 'activeCase && editData'. 
    // We should change that to just 'editData' if we are in creating mode, or ensure activeCase fallback.
    // Better strategy: For "New", strictly use editData. 
    // Let's refine the Sheet render condition.

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

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {emergencies.map((item) => (
                    <Card key={item.id} className="overflow-hidden flex flex-col group hover:shadow-lg transition-shadow">
                        <div className="relative h-48 w-full bg-muted">
                            {item.image ? (
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-100 text-muted-foreground">
                                    <FileText className="h-10 w-10 opacity-20" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="secondary" onClick={() => handleView(item.id)}>
                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                </Button>
                            </div>
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{item.category}</p>
                                    <CardTitle className="text-lg font-bold leading-tight mt-1 line-clamp-2">{item.title || "Untitled Case"}</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-2 flex-grow">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Raised: ₹{(item.raisedAmount / 100000).toFixed(2)} Lakhs</span>
                                        <span className="text-muted-foreground">Goal: ₹{(item.targetAmount / 100000).toFixed(2)} Lakhs</span>
                                    </div>
                                    <Progress value={item.targetAmount > 0 ? (item.raisedAmount / item.targetAmount) * 100 : 0} className="h-2" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2 border-t pt-4 bg-muted/20">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleView(item.id)}>
                                <Eye className="mr-2 h-4 w-4" /> View
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:bg-destructive hover:text-white"
                                onClick={() => handleDelete(item.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

                {emergencies.length === 0 && (
                    <div className="col-span-full h-40 flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
                        No emergency cases found. Create one to get started.
                    </div>
                )}
            </div>

            {/* Detailed View Sheet */}
            <Sheet open={!!viewingId} onOpenChange={(open) => !open && setViewingId(null)}>
                <SheetContent className="w-full max-w-full sm:max-w-full p-0 flex flex-col bg-background overflow-hidden data-[state=open]:duration-0 data-[state=closed]:duration-0">
                    {/* Only render if we have data to show. 
                        If activeCase is missing (new item not yet in list), allow render if editData is present 
                        implied by viewingId match or just simply check editData if in editing mode.
                    */}
                    {editData && (
                        <>
                            {/* Header with Edit Button */}
                            <div className="flex items-center justify-between px-6 py-4 border-b bg-background sticky top-0 z-10 gap-4">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => { setViewingId(null); setIsEditing(false); }}>
                                        <ArrowLeft className="h-5 w-5" />
                                    </Button>
                                    <SheetTitle className="text-xl font-semibold">
                                        {activeCase ? "Case Details" : "New Emergency Case"}
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
                                                    <Input
                                                        value={editData.category}
                                                        placeholder="Category (e.g. Medical)"
                                                        onChange={(e) => updateEditField('category', e.target.value)}
                                                        className="max-w-xs"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <h1 className="text-3xl font-bold leading-tight mb-2">{editData.title || "Untitled Case"}</h1>
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 uppercase tracking-wider">
                                                    {editData.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-8 items-start">

                                        {/* Left Column: Story & Content */}
                                        <div className="md:col-span-2 space-y-8">

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

                                            <Separator />

                                            {/* Updates */}
                                            <div className="space-y-3">
                                                <h3 className="font-semibold text-lg">Recent Updates</h3>
                                                {isEditing ? (
                                                    <Textarea
                                                        value={editData.recentUpdates}
                                                        onChange={(e) => updateEditField('recentUpdates', e.target.value)}
                                                        className="min-h-[100px]"
                                                        placeholder="Add any recent updates..."
                                                    />
                                                ) : (
                                                    <div className="p-4 bg-muted/30 rounded-lg border border-l-4 border-l-primary/50">
                                                        <p className="text-sm text-foreground/80 italic">
                                                            "{editData.recentUpdates || "No updates yet."}"
                                                        </p>
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
                                                            <span className="text-primary">₹{(editData.raisedAmount || 0).toLocaleString()}</span>
                                                            <span className="text-muted-foreground">of ₹{(editData.targetAmount || 0).toLocaleString()}</span>
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
        </div>
    );
}
