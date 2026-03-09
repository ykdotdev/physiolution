import React, { Suspense } from 'react'
import CheckoutClient from './CheckoutClient'
import { supabaseServer } from '@/lib/supabaseServer';
import Loading from '../loading';

const page = async (
  
  // {searchParams}
) => {
  // const params = await searchParams;
  // const product_id = "c2ffbad8-bc93-45d0-974f-b0009d439426";
  //   const { data: product } = await supabaseServer
  //     .from("products")
  //     .select("*")
  //     .eq("id", product_id)
  //     .maybeSingle();
  // console.log("product", product)

  const product = {
    active_state: true,
    created_at: "2026-02-26T06:53:29.430994+00:00",
    id: "c2ffbad8-bc93-45d0-974f-b0009d439426",
    name: "The BioMechanics Method Corrective Exercise Specialist Course",
    slug: "tbmm-ces",
    price: 48999,
    mrp: 68999,
    current_stock: 99,
    reserved_stock: 0,
  };
  
  return (
    <>
      {product ? (
          <CheckoutClient product={product} />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default page
