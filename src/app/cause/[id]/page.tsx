"use client";

import { use } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ngos } from "@/lib/mock-data";
import { Copy, Share2, ShieldCheck, MapPin, ChevronRight, Download } from "lucide-react";
import Link from "next/link";

export default function CauseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);

    // Find requirement across all NGOs
    let requirement: any = null;
    let parentNgo: any = null;

    for (const ngo of ngos) {
        const found = ngo.requirements.find(r => r.id === resolvedParams.id);
        if (found) {
            requirement = found;
            parentNgo = ngo;
            break;
        }
    }

    if (!requirement) {
        return <div className="p-20 text-center">Cause not found</div>;
    }

    const percentage = Math.min(100, (requirement.raised / requirement.target) * 100);

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Breadcrumb / Top Nav Placeholder */}
            <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Home</Link> <ChevronRight className="inline h-3 w-3" />
                <span className="text-foreground font-medium"> {requirement.item}</span>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                {/* 1. Hero / Main Info Section */}
                <div className="grid lg:grid-cols-2 gap-10 mb-16">
                    {/* Left: Image */}
                    <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg border">
                        <Image
                            src={requirement.image || "/placeholder.svg"}
                            alt={requirement.item}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-semibold text-sm shadow-md">
                            Tax Benefits Available
                        </div>
                    </div>

                    {/* Right: Details & Ask */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center border">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold">{parentNgo.name}</h3>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" /> {parentNgo.address.split(',')[1]}
                                </p>
                            </div>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                            {requirement.item}: Help us reach our goal
                        </h1>

                        <p className="text-muted-foreground mb-8 text-lg">
                            This cause is urgent. Your contribution supports {parentNgo.name} in providing immediate relief for {requirement.category.toLowerCase()} needs. Every donation brings us closer to the target.
                        </p>

                        <div className="bg-muted/30 p-6 rounded-2xl border mb-8">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <span className="text-3xl font-bold text-primary">₹{requirement.raised.toLocaleString()}</span>
                                    <span className="text-sm text-muted-foreground ml-2">raised of ₹{requirement.target.toLocaleString()} goal</span>
                                </div>
                                <span className="font-bold text-primary">{Math.round(percentage)}%</span>
                            </div>
                            <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-1000"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground text-right">
                                124 supporters have donated
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button className="flex-1 h-14 text-lg font-bold shadow-md">
                                Donate Now
                            </Button>
                            <Button variant="outline" className="h-14 px-6">
                                <Share2 className="h-5 w-5 mr-2" /> Share
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 2. Donation Methods (Bank + QR) */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-8">How You Can Donate</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Wrapper for visual separation */}
                        <div className="bg-card border rounded-2xl p-8 shadow-sm h-full">
                            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                Bank Transfer Details
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between py-2 border-b border-dashed">
                                    <span className="text-muted-foreground">Account Name</span>
                                    <span className="font-medium select-all">{parentNgo.name} Trust</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-dashed">
                                    <span className="text-muted-foreground">Account Number</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium select-all">3452 1234 9876 0001</span>
                                        <Copy className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-primary" />
                                    </div>
                                </div>
                                <div className="flex justify-between py-2 border-b border-dashed">
                                    <span className="text-muted-foreground">IFSC Code</span>
                                    <span className="font-medium select-all">HDFC0001234</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-dashed">
                                    <span className="text-muted-foreground">Bank Name</span>
                                    <span className="font-medium">HDFC Bank, Mumbai Branch</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full mt-6">
                                Copy Account Details
                            </Button>
                        </div>

                        <div className="bg-card border rounded-2xl p-8 shadow-sm h-full flex flex-col items-center text-center">
                            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2 self-start w-full">
                                <span className="bg-primary/10 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                UPI / QR Code
                            </h3>
                            <div className="bg-white p-4 rounded-xl border-2 mb-4 w-64 h-64 flex items-center justify-center relative">
                                {/* Placeholder QR */}
                                <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-cover bg-center" />
                                <span className="text-muted-foreground font-medium">Scan to Pay</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Scan using GPay, PhonePe, Paytm or any UPI app
                            </p>
                            <div className="bg-muted px-3 py-1 rounded-md text-xs font-mono select-all">
                                {parentNgo.id.toLowerCase()}@okhdfcbank
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Proofs & Documents */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-6">Medical Proof & Documents</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl">
                        Transparency is key. Here are the official documents verifying the urgency and authenticity of this requirement.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group relative aspect-[4/3] bg-muted rounded-xl overflow-hidden border cursor-pointer hover:ring-2 ring-primary transition-all">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 text-sm font-medium">
                                    Document Preview {i}
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Button size="sm" variant="secondary">View Full <Download className="ml-2 h-3 w-3" /></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Story Section */}
                <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold mb-6">The Story</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                            <p>
                                {parentNgo.description}
                            </p>
                            <p>
                                We are currently facing a critical shortage of <strong>{requirement.item}</strong>.
                                The situation is urgent as our current supplies will only last for another week.
                                Your support at this crucial time can make a massive difference in the lives of those we serve.
                            </p>
                            <p>
                                Every rupee counts. By contributing, you are ensuring that we can continue our operations without interruption.
                                We promise complete transparency and will share updates on how your funds are utilized.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar / Recent Updates using existing activity history */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Recent Updates</h3>
                        <div className="border rounded-xl p-6 bg-card space-y-6">
                            {parentNgo.activityHistory && parentNgo.activityHistory.length > 0 ? (
                                parentNgo.activityHistory.map((activity: string, idx: number) => (
                                    <div key={idx} className="relative pl-6 pb-2 border-l border-primary/20 last:border-0">
                                        <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
                                        <p className="text-sm text-foreground">{activity}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No recent updates available.</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
