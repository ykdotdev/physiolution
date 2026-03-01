import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);

export async function POST(req) {
  try {
    const { order_id, razorpay_payment_id, razorpay_order_id, status } =
      await req.json();

    if (!order_id || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase.rpc("update_order_payment_rpc", {
      p_order_id: order_id,
      p_razorpay_payment_id: razorpay_payment_id || null,
      p_razorpay_order_id: razorpay_order_id || null,
      p_status: status,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
