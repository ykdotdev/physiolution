import React, { Suspense } from 'react'
import CheckoutClient from './CheckoutClient'
import { supabaseServer } from '@/lib/supabaseServer';
import Loading from '../loading';

const page = async ({ searchParams }) => {
  const params = await searchParams;
  const product_id = params.p_id;
  const { data: product } = await supabaseServer
    .from("products")
    .select("*")
    .eq("id", product_id)
    .maybeSingle();
  // console.log("product", product);

  return <>{product ? <CheckoutClient product={product} /> : <Loading />}</>;
};

export default page
