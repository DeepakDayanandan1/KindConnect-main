"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function registerNGO(formData: any) {
    try {
        // 1. Basic Validation
        if (!formData.orgName || !formData.officialEmail) {
            return { success: false, error: "Organization name and email are required." };
        }

        // 2. Map Form Data to Database Schema
        // We assume standard columns exist, and pack the rest into a 'details' JSON column
        const dbPayload = {
            name: formData.orgName,
            type: formData.legalClassification, // e.g., 'trust', 'society'
            location: formData.regAddress.city || "Kerala", // Fallback location
            description: formData.about || formData.mission,
            phone: formData.officialPhone,
            email: formData.officialEmail,
            website: formData.website,
            // image_url: formData.logoUrl, // TODO: Handle file uploads separately/later

            // Store all wizard data for full record keeping
            details: formData,

            // Default status
            status: "pending_verification",
            created_at: new Date().toISOString(),
        };

        // 3. Insert into Supabase
        const { data, error } = await supabase
            .from("ngos")
            .insert([dbPayload])
            .select()
            .single();

        if (error) {
            console.error("Supabase Error:", error);
            throw new Error(error.message);
        }

        // 4. Revalidate cache
        revalidatePath("/admin/ngos");
        revalidatePath("/ngos");

        return { success: true, data };
    } catch (error: any) {
        return { success: false, error: error.message || "Failed to register NGO" };
    }
}
