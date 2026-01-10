"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ExternalLink, Calendar as CalendarIcon, Utensils, ShoppingBasket, Banknote, Clock, FileText, Video, Mic, Image as ImageIcon, GraduationCap } from "lucide-react";
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
    const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: new Date(), to: undefined });

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
            case 'Fund': return <Banknote className="h-4 w-4" />;
            case 'StudentSponsorship': return <GraduationCap className="h-4 w-4" />;
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
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {req.requirements.map((r: any, i: number) => (
                                            <Badge key={i} variant="outline" className="w-fit flex gap-1 items-center">
                                                {getIcon(r.type)} {r.type}
                                            </Badge>
                                        ))}
                                    </div>
                                    <CardTitle className="text-lg font-semibold">{req.ngoName}</CardTitle>
                                    <p className="text-xs text-muted-foreground">ID: {req.id} • {req.date}</p>
                                </div>
                                <div className="text-right">
                                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Pending</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <ul className="list-disc list-inside space-y-1">
                                    {req.requirements.map((r: any, i: number) => (
                                        <li key={i}>
                                            {r.type === 'Meal' && `Meals from ${r.details.dateRange.from} to ${r.details.dateRange.to}`}
                                            {r.type === 'Grocery' && `Grocery list (${r.items.length} items)`}
                                            {r.type === 'Fund' && `Fund: ₹${r.amount.toLocaleString()}`}
                                            {r.type === 'StudentSponsorship' && `Sponsoring ${r.students.length} student(s)`}
                                        </li>
                                    ))}
                                </ul>
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
                                            Reviewing {selectedReq.requirements.length} requirement(s)
                                        </SheetDescription>
                                    </div>
                                    <Badge variant="secondary" className="text-sm px-3 py-1 h-7">
                                        {selectedReq.id}
                                    </Badge>
                                </div>
                            </SheetHeader>

                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                {/* Dynamic Content based on Type */}
                                {selectedReq.requirements.map((reqItem: any, index: number) => (
                                    <Card key={index} className="border-l-4 border-l-primary shadow-sm">
                                        <CardHeader className="bg-muted/5 pb-3">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-background rounded-full border shadow-sm">
                                                    {getIcon(reqItem.type)}
                                                </div>
                                                <CardTitle className="text-lg font-semibold">{reqItem.type} Requirement</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-6">
                                            {reqItem.type === 'Meal' && (
                                                <div className="space-y-6">
                                                    <div className="grid md:grid-cols-2 gap-8">
                                                        <Card className="border shadow-none bg-muted/5">
                                                            <CardContent className="pt-6">
                                                                <div className="font-semibold mb-4 flex items-center gap-2">
                                                                    <CalendarIcon className="h-4 w-4" /> Selected Meal Date Range
                                                                </div>
                                                                <div className="flex flex-wrap gap-2">
                                                                    <Badge variant="secondary">From: {reqItem.details.dateRange.from}</Badge>
                                                                    <Badge variant="secondary">To: {reqItem.details.dateRange.to}</Badge>
                                                                </div>
                                                                <Calendar
                                                                    mode="range"
                                                                    selected={{
                                                                        from: new Date(reqItem.details.dateRange.from),
                                                                        to: new Date(reqItem.details.dateRange.to)
                                                                    }}
                                                                    className="rounded-md border bg-background shadow-sm w-fit mx-auto md:mx-0 mt-4"
                                                                />
                                                            </CardContent>
                                                        </Card>
                                                        <div className="space-y-6">
                                                            <div>
                                                                <Label className="text-base font-semibold mb-3 block">Meal Slots</Label>
                                                                <div className="grid gap-4 mb-6">
                                                                    {['Breakfast', 'Lunch', 'Dinner'].map(slot => (
                                                                        <div key={slot} className="flex items-center gap-4 p-3 border rounded-lg bg-background/50">
                                                                            <Button
                                                                                variant={reqItem.details.slots.includes(slot) ? "default" : "outline"}
                                                                                size="sm"
                                                                                className="rounded-full w-24"
                                                                            >
                                                                                {slot}
                                                                            </Button>

                                                                            <div className="flex items-center gap-2">
                                                                                <Label className="text-xs text-muted-foreground whitespace-nowrap">Price (₹)</Label>
                                                                                <Input
                                                                                    className="w-20 h-8"
                                                                                    type="number"
                                                                                    defaultValue={reqItem.details.slotPrices?.[slot] || (slot === 'Breakfast' ? 40 : 80)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="space-y-3">
                                                                <Label>Dietary Notes</Label>
                                                                <Input defaultValue={reqItem.details.dietaryRestrictions} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {reqItem.type === 'Grocery' && (
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
                                                                {reqItem.items.map((item: any, i: number) => (
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

                                            {reqItem.type === 'Fund' && (
                                                <div className="grid gap-6 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label>Amount Requested (₹)</Label>
                                                        <Input defaultValue={reqItem.amount} className="text-lg font-bold" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Purpose</Label>
                                                        <Input defaultValue={reqItem.purpose} />
                                                    </div>
                                                    <div className="col-span-2 space-y-2">
                                                        <Label>Description</Label>
                                                        <Textarea defaultValue={reqItem.description || "Urgent funds required for immediate repairs."} className="min-h-[100px]" />
                                                    </div>
                                                </div>
                                            )}

                                            {reqItem.type === 'StudentSponsorship' && (
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-lg font-semibold">Sponsor a Student's Future</Label>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {reqItem.students.map((student: any, idx: number) => (
                                                            <Card key={idx} className="flex flex-col items-center text-center p-6 gap-4 border shadow-sm">
                                                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
                                                                    <Image
                                                                        src={student.image}
                                                                        alt={student.name}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <h3 className="font-bold text-lg">{student.name}</h3>
                                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                                        {student.description}
                                                                    </p>
                                                                </div>
                                                                <div className="mt-auto w-full space-y-3">
                                                                    <div className="p-2 bg-muted/30 rounded-md font-mono font-bold text-lg border">
                                                                        ₹{student.amount}
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}

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

                            <div className="p-6 border-t bg-background mt-auto flex justify-end items-center">
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
