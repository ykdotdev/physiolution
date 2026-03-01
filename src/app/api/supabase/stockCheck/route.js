import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const qty=1;
    const body = await req.json();
    const {product_id} =
      body;

    // check if stock>=qty
    const { data: data, error } = await supabase
      .from("products")
      .select("current_stock", "1")
      .eq("id", product_id)
      .maybeSingle();
    console.log("STOCK CHECK LOG",data, error?.message)
    if (error) throw error;
    
    return NextResponse.json({ success: data.current_stock >= qty });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
