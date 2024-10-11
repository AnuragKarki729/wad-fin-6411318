import Customer from "@/models/Customer";

export async function GET() {
  return Response.json(await Customer.find());
}

export async function POST(request) {
  const body = await request.json();
  console.log(body)
  const customer = new Customer(body);
  await customer.save();
  return Response.json(customer);
}

