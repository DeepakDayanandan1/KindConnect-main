"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, X, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateEmergencyCase() {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    // In a real app, this would be a file upload handler
    const handleImageUpload = () => {
        // Mock upload - just adding a placeholder
        setImages([...images, "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=300"]);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would submit data to backend
        alert("Emergency case created successfully!");
        router.push("/admin/emergency");
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-12">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Emergency Case</h1>
                <p className="text-muted-foreground">Add a new urgent fundraising appeal.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Hero Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Case Details</CardTitle>
                        <CardDescription>Basic information about the beneficiary and the urgency.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Campaign Title</Label>
                            <Input id="title" placeholder="e.g. Urgent Medical Appeal: Save Aarav Sharma's Life" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category / Subtitle</Label>
                                <Input id="category" placeholder="e.g. Urgent Liver Transplant" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="beneficiary">Beneficiary Name</Label>
                                <Input id="beneficiary" placeholder="e.g. Aarav Sharma" required />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Cover Image</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-muted/10 transition-colors cursor-pointer bg-muted/5">
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">Click to upload cover image</span>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="story">The Story</Label>
                            <Textarea id="story" placeholder="Tell the detailed story..." className="min-h-[200px]" required />
                        </div>
                    </CardContent>
                </Card>

                {/* Financials */}
                <Card>
                    <CardHeader>
                        <CardTitle>Fundraising Goal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="target">Target Amount (₹)</Label>
                                <Input id="target" type="number" placeholder="5000000" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="raised">Already Raised (₹)</Label>
                                <Input id="raised" type="number" defaultValue={0} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Donation Methods */}
                <Card>
                    <CardHeader>
                        <CardTitle>Donation Methods</CardTitle>
                        <CardDescription>Bank details and UPI information for direct transfers.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium uppercase text-muted-foreground">Bank Transfer Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="bankName">Bank Name</Label>
                                    <Input id="bankName" placeholder="e.g. State Bank of India" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="accountNo">Account Number</Label>
                                    <Input id="accountNo" placeholder="XXXXXXXXXXXX" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="ifsc">IFSC Code</Label>
                                    <Input id="ifsc" placeholder="SBIN0000001" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="holder">Account Holder Name</Label>
                                    <Input id="holder" placeholder="Name on account" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium uppercase text-muted-foreground">UPI / QR Code</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="upi">UPI ID</Label>
                                    <Input id="upi" placeholder="username@upi" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>QR Code Image</Label>
                                    <div className="border-2 border-dashed rounded-lg h-32 flex flex-col items-center justify-center gap-2 hover:bg-muted/10 transition-colors cursor-pointer bg-muted/5">
                                        <Upload className="h-6 w-6 text-muted-foreground" />
                                        <span className="text-xs font-medium text-muted-foreground">Upload QR Code</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Medical Proofs */}
                <Card>
                    <CardHeader>
                        <CardTitle>Medical Proofs & Documents</CardTitle>
                        <CardDescription>Upload reports, prescriptions, and cost estimates.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div
                                onClick={handleImageUpload}
                                className="aspect-[3/4] rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-4 gap-2 hover:bg-muted/10 transition-colors cursor-pointer bg-muted/5"
                            >
                                <Plus className="h-6 w-6 text-muted-foreground" />
                                <span className="text-xs font-medium text-muted-foreground text-center">Add Document</span>
                            </div>

                            {images.map((img, idx) => (
                                <div key={idx} className="aspect-[3/4] rounded-lg border overflow-hidden relative group">
                                    <Image src={img} alt="doc" fill className="object-cover" />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => removeImage(idx)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] p-1 text-center truncate">
                                        Medical Report {idx + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/emergency">
                        <Button variant="outline" type="button">Cancel</Button>
                    </Link>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">Create Emergency Case</Button>
                </div>
            </form>
        </div>
    );
}
