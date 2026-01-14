"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Upload, Key, MapPin, Building2, FileText, ImageIcon } from "lucide-react";

export default function AddNGOPage() {
    const router = useRouter();

    return (
        <div className="space-y-4 pb-10">
            <div className="flex items-center gap-4">
                <Link href="/admin/ngos">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Register NGO</h1>
                    <p className="text-muted-foreground">
                        Enter the legal details and set up credentials for a new partner NGO.
                    </p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button onClick={() => router.push("/admin/ngos")}>Submit Registration</Button>
                </div>
            </div>

            <div className="space-y-4">
                {/* Basic Identity */}
                <Card id="section-1">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Basic Identity</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <div className="grid gap-2">
                            <Label htmlFor="ngo-name">NGO Name</Label>
                            <Input id="ngo-name" placeholder="Full legal name of the organization" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Primary Focus Area</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Focus Area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="education">Education</SelectItem>
                                        <SelectItem value="health">Health</SelectItem>
                                        <SelectItem value="environment">Environment</SelectItem>
                                        <SelectItem value="social">Social Welfare</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="reg-number">Registration Number</Label>
                                <Input id="reg-number" placeholder="e.g. KER/123/2023" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Brief Description</Label>
                            <Textarea id="description" placeholder="Tell us about the NGO's mission..." className="min-h-[100px]" />
                        </div>
                    </CardContent>
                </Card>

                {/* Location Details */}
                <Card id="section-2">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Location Details</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label>State</Label>
                                <Select defaultValue="kerala">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select State" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="kerala">Kerala</SelectItem>
                                        <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                                        <SelectItem value="karnataka">Karnataka</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>District</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select District" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tvm">Thiruvananthapuram</SelectItem>
                                        <SelectItem value="kochi">Kochi</SelectItem>
                                        <SelectItem value="kozhikode">Kozhikode</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>City / Village</Label>
                                <Input placeholder="Enter locality" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Office Address</Label>
                            <Input placeholder="Building name, Street, Landmark" />
                        </div>
                    </CardContent>
                </Card>

                {/* Compliance Documentation */}
                <Card id="section-3">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Compliance Documentation</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <div className="grid gap-2">
                            <Label>NGO Registration Proof</Label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">PDF, JPG or PNG (MAX. 5MB) - Multiple allowed</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" multiple />
                                </label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Branding */}
                <Card id="section-4">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Branding</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-6">
                            <div className="h-24 w-24 rounded-lg border bg-muted flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <Label>Official NGO Photo/Logo</Label>
                                <p className="text-sm text-muted-foreground">This will be displayed on the public fundraising pages and the mobile app.</p>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Upload New</Button>
                                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Remove</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Mobile App Access */}
                <Card id="section-5">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                            <Key className="h-5 w-5 text-muted-foreground" />
                            <CardTitle>Mobile App Access</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                        <div className="rounded-md bg-blue-50/50 p-4 text-sm text-blue-900 dark:bg-blue-900/20 dark:text-blue-200">
                            <p>These credentials will allow the NGO staff to log in to the Kerala Connect Mobile App to manage their on-ground operations.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Unique Username</Label>
                                <Input placeholder="@ngo_kerala_2024" />
                            </div>
                            <div className="grid gap-2">
                                <Label>System Password</Label>
                                <Input type="password" placeholder="•••••••••••••" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
