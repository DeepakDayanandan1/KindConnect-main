"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ShieldCheck, CheckCircle2, ArrowRight, Smartphone } from "lucide-react";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Step = "details" | "otp" | "payment" | "success";

export function DonationModal({
  isOpen,
  onClose,
  itemTitle,
  amount,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  amount: number;
  onSuccess?: () => void;
}) {
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState({ name: "", email: "", whatsapp: "" });
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.name || !details.email || !details.whatsapp) {
      toast.error("Please fill in all details");
      return;
    }
    setStep("otp");
    toast.success("OTP sent to your WhatsApp!");
  };

  const handleOtpSubmit = () => {
    if (otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setIsSubmitting(true);
    // Simulate verification
    setTimeout(() => {
      setStep("payment");
      setIsSubmitting(false);
    }, 1500);
  };

  const handlePayment = () => {
    setIsSubmitting(true);
    // Simulate payment and DB update
    setTimeout(() => {
      setStep("success");
      setIsSubmitting(false);
      onSuccess?.();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden rounded-3xl p-0">
        <div className="bg-emerald-600 px-6 py-8 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Supporting {itemTitle}</DialogTitle>
            <DialogDescription className="text-emerald-100">
              Your contribution of <span className="font-bold text-white text-lg">₹{amount.toLocaleString()}</span> makes a real difference.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8">
          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={details.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails({...details, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    value={details.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails({...details, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input 
                    id="whatsapp" 
                    placeholder="+91 98765 43210" 
                    value={details.whatsapp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetails({...details, whatsapp: e.target.value})}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-emerald-600 font-bold hover:bg-emerald-700">
                Continue to Verify <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          {step === "otp" && (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Smartphone className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Verify OTP</h3>
                <p className="text-sm text-muted-foreground">We've sent a 6-digit code to {details.whatsapp}</p>
              </div>
              
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button 
                onClick={handleOtpSubmit} 
                className="w-full bg-emerald-600 font-bold hover:bg-emerald-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify & Continue"}
              </Button>
              <button className="text-sm font-medium text-emerald-600 hover:underline">Resend OTP</button>
            </div>
          )}

          {step === "payment" && (
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border bg-muted/30 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Item:</span>
                  <span className="font-bold">{itemTitle}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold text-emerald-600 text-lg">₹{amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold">Select Payment Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center gap-2 rounded-xl border p-4 transition-all hover:border-emerald-500 hover:bg-emerald-50">
                    <div className="font-bold">UPI</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">GPay, PhonePe</div>
                  </button>
                  <button className="flex flex-col items-center gap-2 rounded-xl border p-4 transition-all hover:border-emerald-500 hover:bg-emerald-50">
                    <div className="font-bold">Card</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Credit / Debit</div>
                  </button>
                </div>
              </div>

              <Button 
                onClick={handlePayment} 
                className="w-full bg-emerald-600 py-6 text-lg font-bold hover:bg-emerald-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : `Pay ₹${amount.toLocaleString()}`}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3 w-3" /> Secure SSL Encrypted Payment
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Donation Successful!</h3>
                <p className="mt-2 text-muted-foreground">
                  Thank you for your generosity, <span className="font-bold text-emerald-600">{details.name}</span>. 
                  You've successfully funded {itemTitle}.
                </p>
              </div>
              <div className="w-full rounded-2xl bg-emerald-50 p-6 dark:bg-emerald-950/20">
                <div className="mb-4 flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <Heart className="h-4 w-4 fill-current" />
                  <span className="text-sm font-bold">Impact Tracker</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  An account has been created for you. You'll receive proof of impact via WhatsApp within 48 hours.
                </p>
              </div>
              <Button onClick={onClose} className="w-full bg-emerald-600 font-bold hover:bg-emerald-700">
                Return to NGO Page
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
