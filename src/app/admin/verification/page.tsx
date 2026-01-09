"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ExternalLink, Calendar as CalendarIcon, Utensils, ShoppingBasket, Banknote, Clock, FileText, Video, Mic, Image as ImageIcon } from "lucide-react";
import { verificationRequests } from "@/lib/mock-data";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";

export default function VerificationPage() {
    // Check if verificationRequests exists, fallback to empty array if not defined yet (hot reload safety)
    const [requests, setRequests] = useState(verificationRequests || []);
    const [selectedReq, setSelectedReq] = useState<any>(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(new Date()); // Mock date for calendar

    const handleAction = (id: string, action: 'accept' | 'reject') => {
        console.log(`${action}ing request`, id);
        setRequests(requests.filter(r => r.id !== id));
        setSheetOpen(false);
    };

    const openDetails = (req: any) => {
        setSelectedReq(req);
        setSheetOpen(true);
        // Reset/Set generic state if needed
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'Meal': return <Utensils className="h-4 w-4" />;
            case 'Grocery': return <ShoppingBasket className="h-4 w-4" />;
            case 'Fund': return <Banknote className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Request Verification</h1>
                <p className="text-muted-foreground">Manage and approve incoming requests for meals, supplies, and funds.</p>
            </div>

            <div className="grid gap-6">
                {requests.length === 0 ? (
                    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-muted-foreground bg-muted/10">
                        No pending requests.
                    </div>
                ) : (
                    requests.map((req) => (
                        <Card key={req.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <Badge variant="outline" className="w-fit flex gap-1 items-center mb-2">
                                        {getIcon(req.type)} {req.type} Request
                                    </Badge>
                                    <CardTitle className="text-lg font-semibold">{req.ngoName}</CardTitle>
                                    <p className="text-xs text-muted-foreground">ID: {req.id} • {req.date}</p>
                                </div>
                                <div className="text-right">
                                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Pending</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                {req.type === 'Meal' && <span>Requested meals for dates around {req.details.date}.</span>}
                                {req.type === 'Grocery' && <span>Request list containing {req.items.length} items.</span>}
                                {req.type === 'Fund' && <span>Financial assistance request of ₹{req.amount.toLocaleString()}.</span>}
                            </CardContent>
                            <CardFooter className="bg-muted/30 p-3 px-6 flex justify-between items-center text-xs text-muted-foreground">
                                <span>Action Required</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-0 text-primary hover:text-primary/80 font-semibold"
                                    onClick={() => openDetails(req)}
                                >
                                    Review & Edit <ExternalLink className="ml-1 h-3 w-3" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="sm:max-w-3xl overflow-y-auto w-[90vw] p-0 gap-0 bg-muted/10">
                    {selectedReq && (
                        <div className="h-full flex flex-col bg-background">
                            <SheetHeader className="p-6 border-b bg-background sticky top-0 z-10">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <SheetTitle className="text-2xl">{selectedReq.ngoName}</SheetTitle>
                                        <SheetDescription>
                                            Editing {selectedReq.type} Request details
                                        </SheetDescription>
                                    </div>
                                    <Badge variant="secondary" className="text-sm px-3 py-1 h-7">
                                        {selectedReq.id}
                                    </Badge>
                                </div>
                            </SheetHeader>

                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                {/* Dynamic Content based on Type */}
                                {selectedReq.type === 'Meal' && (
                                    <div className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <Card className="border-0 shadow-none bg-transparent">
                                                <div className="font-semibold mb-4 flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4" /> Select Meal Date
                                                </div>
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    className="rounded-md border bg-background shadow-sm w-fit mx-auto md:mx-0"
                                                />
                                            </Card>
                                            <div className="space-y-6">
                                                <div>
                                                    <Label className="text-base font-semibold mb-3 block">Meal Slots for 21/11/2025</Label>
                                                    <div className="flex gap-2 mb-6">
                                                        <Button variant="default" size="sm" className="rounded-full px-6">Breakfast</Button>
                                                        <Button variant="outline" size="sm" className="rounded-full px-6">Lunch</Button>
                                                        <Button variant="outline" size="sm" className="rounded-full px-6">Dinner</Button>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <Label>Booking Status</Label>
                                                    <Select defaultValue="processing">
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="processing">Processing</SelectItem>
                                                            <SelectItem value="approved">Approved</SelectItem>
                                                            <SelectItem value="rejected">Rejected</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-3">
                                                    <Label>Dietary Notes</Label>
                                                    <Input defaultValue={selectedReq.details.dietaryRestrictions} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedReq.type === 'Grocery' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-lg font-semibold">Requirement List</Label>
                                            <Button size="sm" variant="outline"><Utensils className="mr-2 h-3 w-3" /> Add Item</Button>
                                        </div>
                                        <div className="rounded-md border bg-background overflow-hidden">
                                            <Table>
                                                <TableHeader className="bg-muted/50">
                                                    <TableRow>
                                                        <TableHead className="w-[50%]">Item Name</TableHead>
                                                        <TableHead>Quantity</TableHead>
                                                        <TableHead className="text-right">Est. Price</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {selectedReq.items.map((item: any, i: number) => (
                                                        <TableRow key={i}>
                                                            <TableCell className="font-medium">
                                                                <div className="flex flex-col">
                                                                    <span>{item.name}</span>
                                                                    <span className="text-xs text-muted-foreground">Standard quality</span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Input className="w-24 h-8" defaultValue={item.quantity} />
                                                            </TableCell>
                                                            <TableCell className="text-right font-medium">₹{item.price}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                )}

                                {selectedReq.type === 'Fund' && (
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Amount Requested (₹)</Label>
                                            <Input defaultValue={selectedReq.amount} className="text-lg font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Purpose</Label>
                                            <Input defaultValue={selectedReq.purpose} />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <Label>Description</Label>
                                            <Textarea defaultValue="Urgent funds required for immediate repairs." className="min-h-[100px]" />
                                        </div>
                                    </div>
                                )}

                                {/* Common Sections */}
                                <Card>
                                    <CardHeader className="pb-3 bg-muted/20">
                                        <CardTitle className="text-base font-medium">Media & Proofs</CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-4 bg-muted/5 gap-2 hover:bg-muted/10">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><Video className="h-5 w-5" /></div>
                                            <span className="text-[10px] text-muted-foreground">Proof Video</span>
                                        </div>
                                        <div className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-4 bg-muted/5 gap-2 hover:bg-muted/10">
                                            <div className="p-2 bg-green-50 text-green-600 rounded-full"><ImageIcon className="h-5 w-5" /></div>
                                            <span className="text-[10px] text-muted-foreground">Image 1</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-2">
                                    <Label>Admin Remarks</Label>
                                    <Textarea placeholder="Add notes for the NGO or internal team..." className="min-h-[100px]" />
                                </div>
                            </div>

                            <div className="p-6 border-t bg-background mt-auto flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" /> Last updated: Today
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="text-destructive hover:bg-destructive hover:text-white" onClick={() => handleAction(selectedReq.id, 'reject')}>
                                        Reject Request
                                    </Button>
                                    <Button className="bg-primary hover:bg-primary/90" onClick={() => handleAction(selectedReq.id, 'accept')}>
                                        Update & Approve
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
