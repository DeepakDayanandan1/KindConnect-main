import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <span className="text-xl font-bold tracking-tight">KindConnect</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Connecting needs with generosity. A smart marketplace for direct and transparent charitable giving across India.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/ngos" className="hover:text-primary">Find NGOs</Link></li>
              <li><Link href="/medical" className="hover:text-primary">Medical Needs</Link></li>
              <li><Link href="/education" className="hover:text-primary">Education Support</Link></li>
              <li><Link href="/meals" className="hover:text-primary">Meal Booking</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">NGOs</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/register-ngo" className="hover:text-primary">Register as NGO</Link></li>
              <li><Link href="/ngo-app" className="hover:text-primary">NGO Mobile App</Link></li>
              <li><Link href="/guidelines" className="hover:text-primary">NGO Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Email: support@kindconnect.org</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: Mumbai, Maharashtra, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} KindConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
