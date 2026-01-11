"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ImageIcon, Mic, ArrowRight, Send, Search, Filter } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Enhanced Mock Data
const donations = [
    {
        id: "DON-20230412-001",
        ngo_id: "NGO-1",
        ngo_name: "Hope Foundation",
        donor_name: "Alice Wonderland",
        amount: 550.00,
        date: "2023-10-25",
        status: "completed",
        donorDetails: {
            email: "alice.w@example.com",
            phone: "+1 (555) 123-4567",
            notes: "Frequent donor, prefers email communication. Interested in children's welfare."
        },
        recipientDetails: {
            name: "Sunshine Kids Orphanage",
            contact: "Mr. David Lee",
            address: "123 Hope Lane, Cityville, CA 90210",
            phone: "+1 (555) 987-6543",
            email: "contact@sunshinekids.org"
        },
        items: [
            { name: "Children's Books (various)", quantity: 50, value: 200.00 },
            { name: "Educational Toys", quantity: 15, value: 150.00 },
            { name: "Winter Jackets (new)", quantity: 20, value: 200.00 }
        ],
        proofs: ["#", "#"], // Mock URLs
        feedback: "Thank you for the prompt delivery. The kids loved the books!"
    },
    {
        id: "DON-002",
        ngo_id: "NGO-2",
        ngo_name: "Green Earth",
        donor_name: "Bob Jones",
        amount: 50.00,
        date: "2023-10-26",
        status: "pending",
        donorDetails: {
            email: "bob.j@example.com",
            phone: "+1 (555) 456-7890",
            notes: "Anonymous donor."
        },
        recipientDetails: {
            name: "Green Earth HQ",
            contact: "Ms. Sarah Green",
            address: "456 Tree St, Forestview, WA 98001",
            phone: "+1 (555) 654-3210",
            email: "info@greenearth.org"
        },
        items: [
            { name: "Tree Saplings", quantity: 50, value: 50.00 }
        ],
        proofs: [],
        feedback: ""
    }
];

export default function DonationHistoryPage() {
    const [selectedDonation, setSelectedDonation] = useState<any>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    // Filter & Search State
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateSort, setDateSort] = useState("newest");

    const openDetails = (donation: any) => {
        setSelectedDonation(donation);
        setSheetOpen(true);
    };

    // Filter Logic
    const filteredDonations = donations.filter(donation => {
        const matchesSearch = donation.donor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || donation.status === statusFilter;
        return matchesSearch && matchesStatus;
    }).sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateSort === "newest" ? dateB - dateA : dateA - dateB;
    });

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Donation History</h1>
                    <p className="text-muted-foreground">View and manage all donations made through the platform.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search donor name or ID..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[140px]">
                                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={dateSort} onValueChange={setDateSort}>
                            <SelectTrigger className="w-[170px]">
                                <SelectValue placeholder="Sort by Date" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest to Oldest</SelectItem>
                                <SelectItem value="oldest">Oldest to Newest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Donor</TableHead>
                            <TableHead>NGO</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDonations.length > 0 ? (
                            filteredDonations.map((donation) => (
                                <TableRow key={donation.id}>
                                    <TableCell className="font-medium">{donation.id}</TableCell>
                                    <TableCell>{donation.donor_name}</TableCell>
                                    <TableCell>{donation.ngo_name}</TableCell>
                                    <TableCell>{donation.date}</TableCell>
                                    <TableCell>${donation.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            donation.status === "completed" ? "default" :
                                                donation.status === "pending" ? "secondary" : "destructive"
                                        }>
                                            {donation.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => openDetails(donation)}>
                                            <ExternalLink className="h-4 w-4 mr-2" /> View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No donations found matching your filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="sm:max-w-[50vw] sm:w-[50vw] overflow-y-auto p-0 gap-0 bg-muted/10">
                    {selectedDonation && (
                        <div className="h-full flex flex-col bg-background">
                            <SheetHeader className="p-4 border-b bg-background sticky top-0 z-10">
                                <div className="flex items-center justify-between">
                                    <SheetTitle className="text-xl font-mono">Donation: {selectedDonation.id}</SheetTitle>
                                    <Badge variant="outline">{selectedDonation.status}</Badge>
                                </div>
                            </SheetHeader>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">

                                {/* PHASE 1: Incoming from Donor */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                        {/*  <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>*/}
                                        Donor Information
                                    </h3>

                                    <div className="grid grid-cols-2 gap-1">
                                        {/* Donor Information */}
                                        <Card className="rounded-sm shadow-sm border-2">
                                            <CardHeader className="py-0.5 px-2 bg-muted/5">
                                                <div className="flex justify-between items-center">
                                                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Donor Details</CardTitle>
                                                    <span className="text-[10px] text-muted-foreground font-mono">ID: {selectedDonation.id.split('-')[1] || selectedDonation.id}</span>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-0 pb-2 px-2 grid gap-1">
                                                <div>
                                                    <p className="font-medium text-sm">{selectedDonation.donor_name}</p>
                                                    <p className="text-xs text-muted-foreground">{selectedDonation.donorDetails.email}</p>
                                                    <p className="text-xs text-muted-foreground">{selectedDonation.donorDetails.phone}</p>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Feedback */}
                                        <Card className="rounded-sm shadow-sm border-2">
                                            <CardHeader className="py-0.5 px-2 bg-muted/5">
                                                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Donor Feedback</CardTitle>
                                            </CardHeader>
                                            <CardContent className="pt-0 pb-2 px-2 h-full">
                                                <p className="text-sm italic text-muted-foreground">
                                                    "{selectedDonation.feedback || "No feedback provided yet."}"
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Donated Items */}
                                    <Card className="rounded-sm shadow-sm border-2">
                                        <CardHeader className="py-0.5 px-2 bg-muted/5">
                                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Items & Funds Received</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-0 pb-2 px-2">
                                            <Table>
                                                <TableHeader className="bg-transparent">
                                                    <TableRow className="border-b-2 hover:bg-transparent">
                                                        <TableHead className="pl-0 h-8 text-xs font-bold text-black">Item Description</TableHead>
                                                        <TableHead className="h-8 text-xs font-bold text-black text-center">Qty</TableHead>
                                                        <TableHead className="pr-0 h-8 text-xs font-bold text-black text-right">Value</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {selectedDonation.items.map((item: any, i: number) => (
                                                        <TableRow key={i} className="border-b hover:bg-transparent text-xs">
                                                            <TableCell className="pl-0 py-2">{item.name}</TableCell>
                                                            <TableCell className="py-2 text-center">{item.quantity}</TableCell>
                                                            <TableCell className="pr-0 py-2 text-right">${item.value.toFixed(2)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <TableRow className="bg-muted/10 font-bold hover:bg-muted/10 border-0 text-xs">
                                                        <TableCell className="pl-0 py-2 text-blue-600">Total Funds Collected</TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell className="pr-0 py-2 text-right text-blue-600">${selectedDonation.amount.toFixed(2)}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* ACTION 1: Transfer */}
                                <div className="flex justify-center py-2 relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-dashed border-gray-300" />
                                    </div>
                                    <Button className="relative z-10 rounded-full px-8 bg-blue-600 hover:bg-blue-700 shadow-md">
                                        Transfer Funds to NGO <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>

                                {/* PHASE 2: Outgoing to NGO */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                        {/* <span className="bg-orange-100 text-orange-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> */}
                                        Recipient NGO Details
                                    </h3>

                                    {/* Recipient Information */}
                                    <Card className="rounded-sm shadow-sm border-2">
                                        <CardHeader className="py-0.5 px-2 bg-muted/5">
                                            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recipient NGO</CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-0 pb-2 px-2 grid grid-cols-2 gap-1">
                                            <div>
                                                <p className="font-medium text-sm">{selectedDonation.recipientDetails.name}</p>
                                                <p className="text-xs text-muted-foreground">{selectedDonation.recipientDetails.contact}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-muted-foreground">{selectedDonation.recipientDetails.email}</p>
                                                <p className="text-xs text-muted-foreground">{selectedDonation.recipientDetails.phone}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{selectedDonation.recipientDetails.address}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Proofs */}
                                    <div className="grid grid-cols-2 gap-1">
                                        <Card className="rounded-sm shadow-sm border-2">
                                            <CardHeader className="py-0.5 px-2 bg-muted/5 flex flex-row items-center justify-between">
                                                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Proof of Usage</CardTitle>
                                                <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 border-blue-200 text-blue-600 hover:bg-blue-50">approve</Button>
                                            </CardHeader>
                                            <CardContent className="pt-0 pb-2 px-2 flex gap-3">
                                                <div className="h-20 w-20 bg-muted rounded-md flex items-center justify-center border-2 border-dashed">
                                                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div className="h-20 w-20 bg-muted rounded-md flex items-center justify-center border-2 border-dashed">
                                                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* NGO Note */}
                                        <Card className="rounded-sm shadow-sm border-2">
                                            <CardHeader className="py-0.5 px-2 bg-muted/5 flex flex-row items-center justify-between">
                                                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Founder's Note</CardTitle>
                                                <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 border-blue-200 text-blue-600 hover:bg-blue-50">submit</Button>
                                            </CardHeader>
                                            <CardContent className="pt-0 pb-2 px-2 flex items-center gap-4">
                                                <div className="p-2 bg-muted rounded-full">
                                                    <Mic className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-medium">Audio Note</p>
                                                    <div className="h-1 bg-muted w-full mt-2 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary w-1/3"></div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>

                                {/* ACTION 2: Closing */}
                                <div className="border-t pt-4 mt-4 flex flex-col items-center gap-4">
                                    <Button className="w-full max-w-sm bg-green-600 hover:bg-green-700 h-12 text-base font-semibold shadow-md">
                                        Send Report to Donor <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>

                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
