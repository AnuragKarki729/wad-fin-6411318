import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const customer = await Customer.findById(id);
  console.log( {customer} );
  return NextResponse.json(customer);
}

export async function DELETE(request, { params }) {
  const id = params.id;
  console.log(id)
  return NextResponse.json(await Customer.findByIdAndDelete(id));
}

export async function PUT(request, {params}){
  const id = params.id
  const data = await request.json()
  const customer = await Customer.findByIdAndUpdate(id, data, {new: true})
  return NextResponse.json(customer)
  
}