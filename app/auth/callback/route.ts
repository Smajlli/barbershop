import { createClient } from "@/app/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get("code");

    if(code) {
        const supabase = createClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(requestUrl.origin);
};
