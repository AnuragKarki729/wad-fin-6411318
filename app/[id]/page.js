
import { Box } from "@mui/material";

import 'bootstrap/dist/css/bootstrap.min.css';

export default async function Home({ params }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(`${API_BASE}/customer/${params.id}`, { cache: "no-store" });
  const customer = await data.json();
  console.log({ customer });
  // const id = params.id;
  return (
    <>
    <Box component="section" className="border border-gray-800 m-5 text-center">
    <ul>
          <li><a href="/">Customer Management Page</a></li>
    </ul>
      </Box>
    <div className="m-4">
      <h1>Customer</h1>
      <p className="font-bold text-xl text-blue-800">{customer.name}</p>
      <p>Member Number: {customer.memberNumber}</p>
      <p>Date of Birth: {new Date(customer.dob).toLocaleDateString()}</p>
      <p>Interest(s): {customer.interest}</p>
    </div>
    </>
  );
}
