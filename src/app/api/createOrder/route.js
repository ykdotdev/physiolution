// app/api/createOrder/route.js
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

import { createClient } from "@supabase/supabase-js";

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

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  const { items, shipping_info } = await req.json();

  const { data, error } = await supabase.rpc("create_order_rpc", {
    p_items: items,
    p_shipping: shipping_info,
  });
  console.log("CURRENT ITEM ARRAY: ", items);
  console.log("RPC returned order:", data);

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  const orderData = data[0]; // first (and only) row
  const orderAmount = Number(orderData.total_paise); // paise, integer
  const razorpayOrder = await razorpay.orders.create({
    amount: orderAmount,
    currency: "INR",
    receipt: orderData.id,
  });

  return new Response(JSON.stringify({ order: data, razorpayOrder }), {
    status: 200,
  });
}
