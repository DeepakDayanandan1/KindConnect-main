"use client";

import { use, useState } from "react";
import { donors } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Handshake, DollarSign, Package, Mail, Phone, MapPin, User, FileText, Send, Save } from "lucide-react";

export default function DonorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params
    const resolvedParams = use(params);
    const donor = donors.find(d => d.id === resolvedParams.id);

    // State for interactive elements (visual only for demo)
    const [notes, setNotes] = useState(donor ? donor.notes : "");
    const [message, setMessage] = useState("");

    if (!donor) {
        return <div className="p-8 text-center text-muted-foreground">Donor not found</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Donor Profile & History</h1>
            </div>

            {/* Stats Components */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                        <Handshake className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{donor.totalDonations}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${donor.totalAmount.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Items Donated</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{donor.itemsDonated}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Contact Information */}
                <Card className="md:row-span-2">
                    <CardHeader>
                        <CardTitle>Donor Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Donor ID</label>
                            <div className="flex items-center space-x-2 rounded-md border px-3 py-2 bg-muted/50">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{donor.id}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
                            <div className="flex items-center space-x-2 rounded-md border px-3 py-2 bg-muted/50">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{donor.name}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Email</label>
                            <div className="flex items-center space-x-2 rounded-md border px-3 py-2 bg-muted/50">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{donor.email}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Phone</label>
                            <div className="flex items-center space-x-2 rounded-md border px-3 py-2 bg-muted/50">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{donor.phone}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Address</label>
                            <div className="flex items-start space-x-2 rounded-md border px-3 py-2 bg-muted/50">
                                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <span className="text-sm">{donor.address}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Message Donor */}
                <Card>
                    <CardHeader>
                        <CardTitle>Message Donor</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-[100px]"
                        />
                        <div className="flex justify-end">
                            <Button>
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Admin Notes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Admin Notes</CardTitle>
                        <CardDescription>Internal notes about this donor</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            placeholder="Add notes..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="min-h-[100px]"
                        />
                        <div className="flex justify-end">
                            <Button variant="secondary">
                                <Save className="mr-2 h-4 w-4" />
                                Save Notes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Past Donations */}
            <Card>
                <CardHeader>
                    <CardTitle>Past Donations</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Donation ID</TableHead>
                                <TableHead>Welfare Home</TableHead>
                                <TableHead>Amount/Items</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {donor.donations.map((donation) => (
                                <TableRow key={donation.id}>
                                    <TableCell className="font-medium">{donation.id}</TableCell>
                                    <TableCell>{donation.welfareHome}</TableCell>
                                    <TableCell>{donation.amount}</TableCell>
                                    <TableCell>{donation.date}</TableCell>
                                    <TableCell>
                                        <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${donation.status === 'Delivered' ? 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80' :
                                            donation.status === 'Confirmed' ? 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80' :
                                                'text-foreground'
                                            }`}>
                                            {donation.status}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <FileText className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
