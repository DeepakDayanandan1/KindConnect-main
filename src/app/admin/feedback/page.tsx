import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Feedback } from "@/types";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const feedbacks: Feedback[] = [
    {
        id: "FB-001",
        donation_id: "DON-001",
        ngo_id: "NGO-1",
        ngo_name: "Hope Foundation",
        donor_name: "Alice Smith",
        rating: 5,
        comment: "Wonderful experience, glad to see the impact!",
        date: "2023-11-01",
        status: "pending",
    },
    {
        id: "FB-002",
        donation_id: "DON-003",
        ngo_id: "NGO-1",
        ngo_name: "Hope Foundation",
        donor_name: "Charlie Brown",
        rating: 2,
        comment: "Transaction failed initially, but support helped.",
        date: "2023-10-28",
        status: "sent_to_ngo",
    },
];

export default function FeedbackPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Donor Feedback</h1>
                <p className="text-muted-foreground">Collect and manage feedback from donors.</p>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Donor</TableHead>
                            <TableHead>NGO</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="w-[400px]">Comment</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {feedbacks.map((feedback) => (
                            <TableRow key={feedback.id}>
                                <TableCell>{feedback.date}</TableCell>
                                <TableCell>{feedback.donor_name}</TableCell>
                                <TableCell>{feedback.ngo_name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center text-yellow-500">
                                        {feedback.rating} <Star className="ml-1 h-3 w-3 fill-current" />
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-[400px] truncate" title={feedback.comment}>
                                    {feedback.comment}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {feedback.status === 'sent_to_ngo' ? 'Sent to NGO' : 'Pending'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {feedback.status === 'pending' && (
                                        <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                                            <Send className="mr-2 h-3 w-3" />
                                            Forward
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
