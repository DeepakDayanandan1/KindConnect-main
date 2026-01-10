"use client";

import { use, useState } from "react";
import { ngos } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function NgoDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const ngo = ngos.find(n => n.id === resolvedParams.id);

    const [adminNotes, setAdminNotes] = useState(ngo ? ngo.adminNotes || "" : "");
    const [status, setStatus] = useState(ngo ? ngo.status || "Pending" : "Pending");

    if (!ngo) {
        return <div className="p-8 text-center text-muted-foreground">NGO not found</div>;
    }

    return (
        <div className="space-y-4 w-full mx-auto pb-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">{ngo.name}</h1>
                <div className="text-sm font-medium text-muted-foreground">ID: {ngo.id}</div>
            </div>

            {/* NGO Summary Section */}
            <Card className="border-border/40 shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-medium">NGO Profile</CardTitle>
                    <p className="text-sm text-muted-foreground">Details of the NGO organization.</p>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact Person</label>
                            <Input defaultValue={ngo.contactPerson} className="font-medium" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</label>
                            <Input defaultValue={ngo.phone} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                            <Input defaultValue={ngo.email} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Address</label>
                            <Textarea defaultValue={ngo.address} className="min-h-[80px]" />
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</label>
                        <Textarea defaultValue={ngo.description} className="min-h-[100px]" />
                    </div>
                </CardContent>
            </Card>

            {/* Media Uploads Section */}
            <Card className="border-border/40 shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-medium">NGO Documents</CardTitle>
                    <p className="text-sm text-muted-foreground">Attach relevant certificates, images, or legal files for this NGO.</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Placeholder Upload Buttons matching the reference image style */}
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer bg-muted/10">
                            <div className="p-3 rounded-full bg-muted">
                                <Plus className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">Add Document</span>
                        </div>

                        {ngo.documents && ngo.documents.length > 0 ? (
                            ngo.documents.map((doc: any, i: number) => (
                                <div key={i} className="border rounded-lg p-4 flex flex-col items-center justify-center gap-2 relative group overflow-hidden">
                                    <div className="h-20 w-20 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
                                        {doc.type === 'image' ? (
                                            <Image src="/placeholder.svg" width={40} height={40} alt="doc" className="opacity-50" />
                                        ) : (
                                            "PDF"
                                        )}
                                    </div>
                                    <span className="text-xs font-medium truncate w-full text-center">{doc.name}</span>
                                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))
                        ) : null}
                    </div>
                </CardContent>
            </Card>

            {/* Remarks Section */}
            <Card className="border-border/40 shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-medium">Admin Notes</CardTitle>
                    <p className="text-sm text-muted-foreground">Add any private notes or details about this NGO.</p>
                </CardHeader>
                <CardContent>
                    <Textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="Enter any additional remarks here..."
                        className="min-h-[150px] resize-none"
                    />
                </CardContent>
            </Card>

            {/* Sticky Footer for Actions */}
            <div className="sticky bottom-4 mx-auto w-full">
                <Card className="border-border/40 shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold">Status:</span>
                            <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' :
                                status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                    'bg-gray-100 text-gray-700 border-gray-200'
                                }`}>
                                {status || 'Unknown'}
                            </div>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <Button variant="outline" className="flex-1 sm:flex-none">Discard</Button>
                            <Button className="flex-1 sm:flex-none bg-primary hover:bg-primary/90">Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
