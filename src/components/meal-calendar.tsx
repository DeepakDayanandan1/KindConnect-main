"use client";

import { useState } from "react";
import { format, addDays, startOfToday } from "date-fns";
import { Coffee, Utensils, Moon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { DonationModal } from "./donation-modal";

interface MealSlot {
  id: string;
  date: string;
  meal_type: string;
  price: number;
  status: string;
}

export function MealCalendar({ initialSlots, ngoId }: { initialSlots: MealSlot[], ngoId: string }) {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<MealSlot | null>(null);
  
  const dates = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));

  const mealTypes = [
    { type: "breakfast", label: "Breakfast", icon: Coffee, time: "8:00 AM" },
    { type: "lunch", label: "Lunch", icon: Utensils, time: "1:00 PM" },
    { type: "dinner", label: "Dinner", icon: Moon, time: "8:00 PM" },
  ];

  const getSlot = (date: Date, type: string) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return initialSlots.find(s => s.date === dateStr && s.meal_type === type);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Date Selector */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {dates.map((date) => {
          const isSelected = format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
          return (
            <button
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "flex min-w-[100px] flex-col items-center gap-1 rounded-2xl border p-4 transition-all hover:border-emerald-500",
                isSelected ? "border-emerald-600 bg-emerald-600 text-white" : "bg-card text-card-foreground"
              )}
            >
              <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                {format(date, "EEE")}
              </span>
              <span className="text-2xl font-bold">{format(date, "d")}</span>
              <span className="text-[10px] font-medium uppercase">{format(date, "MMM")}</span>
            </button>
          );
        })}
      </div>

      {/* Meal Slots */}
      <div className="grid gap-6 md:grid-cols-3">
        {mealTypes.map((meal) => {
          const slot = getSlot(selectedDate, meal.type);
          const isAvailable = slot && slot.status === "available";
          const price = slot?.price || (meal.type === 'breakfast' ? 800 : meal.type === 'lunch' ? 1500 : 2000);
          
          return (
            <div 
              key={meal.type}
              className={cn(
                "group relative overflow-hidden rounded-3xl border p-8 transition-all",
                isAvailable ? "hover:border-emerald-500 hover:shadow-lg" : "bg-muted/50 opacity-60"
              )}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl",
                  isAvailable ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground"
                )}>
                  <meal.icon className="h-6 w-6" />
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-muted-foreground">{meal.time}</div>
                  <div className="text-xl font-bold">₹{price}</div>
                </div>
              </div>

              <h3 className="mb-2 text-xl font-bold">{meal.label}</h3>
              <p className="mb-8 text-sm text-muted-foreground">
                Sponsor a nutritious {meal.label.toLowerCase()} for all residents on this date.
              </p>

              {isAvailable ? (
                <Button 
                  onClick={() => setSelectedSlot(slot!)}
                  className="w-full bg-emerald-600 font-bold hover:bg-emerald-700"
                >
                  Book This Slot
                </Button>
              ) : (
                <div className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-muted text-sm font-bold text-muted-foreground">
                  <Check className="h-4 w-4" /> Already Booked
                </div>
              )}
            </div>
          );
        })}
      </div>

      <DonationModal
        isOpen={!!selectedSlot}
        onClose={() => setSelectedSlot(null)}
        itemTitle={`${selectedSlot?.meal_type.toUpperCase()} Meal on ${selectedSlot?.date}`}
        amount={selectedSlot?.price || 0}
        onSuccess={() => {
          toast.success("Meal booked successfully!");
        }}
      />
    </div>
  );
}

