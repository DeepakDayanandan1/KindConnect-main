"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ExternalLink, Calendar as CalendarIcon, Utensils, ShoppingBasket, Banknote, FileText, Video, Image as ImageIcon, GraduationCap, Search, Filter, History as HistoryIcon, Clock } from "lucide-react";
import { verificationRequests } from "@/lib/mock-data";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function VerificationPage() {
    // -------------------------------------------------------------------------
    // STATE
    // -------------------------------------------------------------------------
    const [requests, setRequests] = useState(verificationRequests || []);
    const [selectedReq, setSelectedReq] = useState<any>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    // Filters & Search
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | "Approved" | "Rejected">("All");

    // -------------------------------------------------------------------------
    // HANDLERS
    // -------------------------------------------------------------------------

    const handleOpenDetails = (req: any) => {
        // Deep copy to allow "Cancel" to revert changes if we were editing in place
        // For this demo, we just set it. In a real app, strict form state management is better.
        setSelectedReq(JSON.parse(JSON.stringify(req)));
        setSheetOpen(true);
    };

    const handleApprove = (isEdited: boolean) => {
        if (!selectedReq) return;
        updateRequestStatus(selectedReq.id, isEdited ? "Approved (Edited)" : "Approved", selectedReq);
    };

    const handleReject = () => {
        if (!selectedReq) return;
        updateRequestStatus(selectedReq.id, "Rejected", selectedReq);
    };

    const updateRequestStatus = (id: string, newStatus: string, updatedData: any) => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...updatedData, status: newStatus } : req
        ));
        setSheetOpen(false);
    };

    // -------------------------------------------------------------------------
    // HELPERS
    // -------------------------------------------------------------------------
    const getIcon = (type: string) => {
        switch (type) {
            case 'Meal': return <Utensils className="h-4 w-4" />;
            case 'Grocery': return <ShoppingBasket className="h-4 w-4" />;
            case 'Fund': return <Banknote className="h-4 w-4" />;
            case 'StudentSponsorship': return <GraduationCap className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Pending': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Pending Review</Badge>;
            case 'Approved': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Approved</Badge>;
            case 'Approved (Edited)': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Approved (Edited)</Badge>;
            case 'Rejected': return <Badge variant="destructive">Rejected</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    // -------------------------------------------------------------------------
    // FILTERED LISTS
    // -------------------------------------------------------------------------
    const filteredRequests = useMemo(() => {
        // Filter out Meal requirements entirely
        const noMealRequests = requests.map(req => ({
            ...req,
            requirements: req.requirements.filter((r: any) => r.type !== 'Meal')
        })).filter(req => req.requirements.length > 0);

        return noMealRequests.filter(req =>
            req.ngoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [requests, searchQuery]);

    const pendingRequests = filteredRequests.filter(r => r.status === 'Pending');

    const historyRequests = filteredRequests.filter(r => {
        if (r.status === 'Pending') return false;
        if (statusFilter === 'All') return true;
        if (statusFilter === 'Approved') return r.status.includes('Approved');
        if (statusFilter === 'Rejected') return r.status === 'Rejected';
        return true;
    });

    return (
        <div className="space-y-6 pb-12 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Request Verification</h1>
                <p className="text-muted-foreground">Verify and manage NGO fundraising requirements.</p>
            </div>

            <Tabs defaultValue="pending" className="w-full space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                    <TabsList>
                        <TabsTrigger value="pending" className="gap-2">
                            Pending Reviews
                            <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1">{pendingRequests.length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="history" className="gap-2">
                            Published / History
                            <HistoryIcon className="h-3.5 w-3.5" />
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search NGO or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    </div>
                </div>

                <TabsContent value="pending" className="space-y-4">
                    {pendingRequests.length === 0 ? (
                        <EmptyState message="No pending requests to review." />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {pendingRequests.map(req => (
                                <RequestCard
                                    key={req.id}
                                    req={req}
                                    onView={() => handleOpenDetails(req)}
                                    getIcon={getIcon}
                                    getStatusBadge={getStatusBadge}
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Filter Status:</span>
                            <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
                                <SelectTrigger className="w-[180px] h-8">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All History</SelectItem>
                                    <SelectItem value="Approved">Approved Only</SelectItem>
                                    <SelectItem value="Rejected">Rejected Only</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <span className="text-xs text-muted-foreground">Showing {historyRequests.length} results</span>
                    </div>

                    {historyRequests.length === 0 ? (
                        <EmptyState message="No history found matching your filters." />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {historyRequests.map(req => (
                                <RequestCard
                                    key={req.id}
                                    req={req}
                                    onView={() => handleOpenDetails(req)}
                                    getIcon={getIcon}
                                    getStatusBadge={getStatusBadge}
                                    isHistory
                                />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* DETAILS SHEET POPUP */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="sm:max-w-2xl w-[90vw] p-0 flex flex-col gap-0 bg-background/95 backdrop-blur-sm">
                    {selectedReq && (
                        <VerificationDetails
                            req={selectedReq}
                            setReq={setSelectedReq}
                            onApprove={() => handleApprove(false)}
                            onApproveEdited={() => handleApprove(true)}
                            onReject={handleReject}
                            getIcon={getIcon}
                            onClose={() => setSheetOpen(false)}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}

// -------------------------------------------------------------------------
// SUB-COMPONENTS
// -------------------------------------------------------------------------


function RequestCard({ req, onView, getIcon, getStatusBadge }: any) {
    return (
        <Card className="overflow-hidden hover:border-primary/50 transition-colors">
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
                    <p className="text-xs text-muted-foreground">{req.id} • {req.date}</p>
                </div>
                <div className="text-right">
                    {getStatusBadge(req.status)}
                </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1">
                    {req.requirements.map((r: any, i: number) => (
                        <li key={i}>
                            {r.type === 'Grocery' && `Grocery list (${r.items.length} items)`}
                            {r.type === 'Fund' && `Fund: ₹${r.amount?.toLocaleString()}`}
                            {r.type === 'StudentSponsorship' && `Sponsoring ${r.students.length} student(s)`}
                            {/* Fallback for others */}
                            {r.type !== 'Grocery' && r.type !== 'Fund' && r.type !== 'StudentSponsorship' && `${r.type} Requirement`}
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
                    onClick={onView}
                >
                    Review & Edit <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
            </CardFooter>
        </Card>
    )
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-muted/10 text-muted-foreground gap-2">
            <Search className="h-8 w-8 opacity-20" />
            <p>{message}</p>
        </div>
    )
}


function VerificationDetails({ req, setReq, onApprove, onApproveEdited, onReject, getIcon, onClose }: any) {
    const isPending = req.status === "Pending";

    const updateRequirement = (reqIndex: number, field: string, value: any) => {
        const newReqs = [...req.requirements];
        newReqs[reqIndex] = { ...newReqs[reqIndex], [field]: value };
        setReq({ ...req, requirements: newReqs });
    };

    // Helper for nested updates (e.g., Grocery items, Student list)
    // path: ['items', index, 'quantity']
    const updateNestedRequirement = (reqIndex: number, path: (string | number)[], value: any) => {
        const newReqs = [...req.requirements];
        let current: any = newReqs[reqIndex];
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        setReq({ ...req, requirements: newReqs });
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <SheetHeader className="px-8 py-6 border-b sticky top-0 bg-background z-10">
                <div className="flex items-center justify-between mb-1">
                    <SheetTitle className="text-2xl font-bold">{req.ngoName}</SheetTitle>
                    <Badge variant="outline" className="text-muted-foreground">{req.id}</Badge>
                </div>
                <SheetDescription className="text-base">
                    Reviewing {req.requirements.length} requirement(s) • Posted on {req.date}
                </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
                {req.requirements.map((r: any, rIdx: number) => {
                    if (r.type === 'Meal') return null; // Double check to hide meal

                    return (
                        <div key={rIdx} className="space-y-6">
                            <Card className="border shadow-sm overflow-hidden border-l-4 border-l-blue-600">
                                <CardHeader className="bg-transparent pb-0 pt-6 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-full">
                                            {getIcon(r.type)}
                                        </div>
                                        <h3 className="font-bold text-xl tracking-tight">{r.type} Requirement</h3>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {r.type === 'Fund' && (
                                        <div className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label className="text-muted-foreground">Amount Requested (₹)</Label>
                                                    <Input
                                                        type="number"
                                                        className="text-lg font-semibold h-11"
                                                        value={r.amount}
                                                        onChange={(e) => updateRequirement(rIdx, 'amount', parseFloat(e.target.value))}
                                                        disabled={!isPending}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-muted-foreground">Purpose</Label>
                                                    <Input
                                                        className="h-11"
                                                        value={r.purpose}
                                                        onChange={(e) => updateRequirement(rIdx, 'purpose', e.target.value)}
                                                        disabled={!isPending}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-muted-foreground">Description</Label>
                                                <Textarea
                                                    className="min-h-[120px] resize-none"
                                                    value={r.description}
                                                    onChange={(e) => updateRequirement(rIdx, 'description', e.target.value)}
                                                    disabled={!isPending}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {r.type === 'Grocery' && (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-base font-semibold">Requirement List</Label>
                                                {isPending && <Button size="sm" variant="outline" className="h-8"><Utensils className="mr-2 h-3 w-3" /> Add Item</Button>}
                                            </div>
                                            <div className="rounded-lg border bg-muted/5 overflow-hidden">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                                                            <TableHead className="w-[40%]">Item Name</TableHead>
                                                            <TableHead>Quantity</TableHead>
                                                            <TableHead className="text-right">Est. Price</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {r.items.map((item: any, i: number) => (
                                                            <TableRow key={i} className="hover:bg-transparent">
                                                                <TableCell className="py-3">
                                                                    <div className="flex flex-col">
                                                                        <span className="font-medium">{item.name}</span>
                                                                        <span className="text-xs text-muted-foreground">Standard quality</span>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="py-3">
                                                                    <Input
                                                                        className="w-32 h-9 bg-background"
                                                                        defaultValue={item.quantity}
                                                                        disabled={!isPending}
                                                                    // Note: In real app, bind this using updateNestedRequirement
                                                                    />
                                                                </TableCell>
                                                                <TableCell className="text-right font-medium py-3">₹{item.price}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    )}

                                    {r.type === 'StudentSponsorship' && (
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-base font-semibold">Sponsor a Student's Future</Label>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {r.students.map((student: any, idx: number) => (
                                                    <div key={idx} className="flex flex-col items-center text-center p-6 gap-4 border rounded-xl bg-card hover:bg-muted/5 transition-colors">
                                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-muted">
                                                            <Image
                                                                src={student.image}
                                                                alt={student.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="space-y-2 w-full">
                                                            <h3 className="font-bold text-lg">{student.name}</h3>
                                                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                                                {student.description}
                                                            </p>
                                                        </div>
                                                        <div className="mt-auto w-full pt-2">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <span className="text-sm font-medium text-muted-foreground">Sponsorship:</span>
                                                                <div className="relative">
                                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                                                                    <Input
                                                                        className="w-24 pl-6 h-9 font-bold text-center"
                                                                        defaultValue={student.amount}
                                                                        disabled={!isPending}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )
                })}

                {/* Common Sections */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Media & Proofs</Label>
                    <Card className="border-dashed bg-muted/5 text-muted-foreground">
                        <CardContent className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {req.documents.length > 0 ? req.documents.map((doc: any, i: number) => (
                                <div key={i} className="aspect-square rounded-xl border flex flex-col items-center justify-center p-4 bg-background hover:border-primary/50 hover:text-primary transition-all cursor-pointer gap-3 shadow-sm">
                                    <div className={cn("p-3 rounded-full", doc.type === 'video' ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600")}>
                                        {doc.type === 'video' ? <Video className="h-6 w-6" /> : <ImageIcon className="h-6 w-6" />}
                                    </div>
                                    <span className="text-xs font-medium text-center truncate w-full">{doc.name || `Proof ${i + 1}`}</span>
                                </div>
                            )) : (
                                <div className="col-span-full py-8 text-center text-sm">No proof documents attached</div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-3">
                    <Label className="text-lg font-semibold">Admin Remarks</Label>
                    <Textarea
                        placeholder="Add notes for the NGO or internal team..."
                        className="min-h-[100px] resize-none text-base"
                    />
                </div>
            </div>

            {/* Footer with Actions */}
            <div className="p-6 border-t bg-background mt-auto sticky bottom-0 z-10 w-full flex justify-end gap-3 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)]">
                {isPending ? (
                    <>
                        <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-white px-6" onClick={onReject}>
                            Reject Request
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 px-8" onClick={onApproveEdited}>
                            Update & Approve
                        </Button>
                    </>
                ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <span>Status:</span>
                        {req.status === 'Approved' && <Badge className="bg-green-100 text-green-800 border-green-200">Published</Badge>}
                        {req.status === 'Rejected' && <Badge variant="destructive">Rejected</Badge>}
                        <Button variant="outline" onClick={onClose}>Close</Button>
                    </div>
                )}
            </div>
        </div>
    );
}

