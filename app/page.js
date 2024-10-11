"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button} from 'react-bootstrap'

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.debug("API_BASE", API_BASE);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [customers, setCustomers] = useState([]);
  const [editmode, setEditMode] = useState(false)
  const [editID, setEditID] = useState(null)

  async function fetchCustomers() {
    const data = await fetch(`${API_BASE}/customer`);
    // const data = await fetch(`http://localhost:3000/product`);
    const p = await data.json();
    setCustomers(p);
    console.log(p)
  }


  const createCustomer = async(data) => {
    if(editmode){
      await fetch(`${API_BASE}/customer/${editID}`,{
        method:"PUT",
        headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
        setEditMode(false)
        setEditID(null)
    }else{
    await fetch(`${API_BASE}/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }
  fetchCustomers()
  reset();
};

  const editCustomer = (id) => async()=>{
    const data = await fetch(`${API_BASE}/customer/${id}`);
      const pData = await data.json()

      setValue("memberNumber", pData.memberNumber);
      setValue("name", pData.name);
      setValue("dob", pData.dob);
      setValue("interest", pData.interest);

      setEditMode(true)
      setEditID(id)    
  }

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;
    
    await fetch(`${API_BASE}/customer/${id}`, {
      method: "DELETE",
    });
    
    fetchCustomers();
  }

  useEffect(() => {
    fetchCustomers();
  }, []);


  return (
    <main className="container my-5">
      <div className="w-full h-full my-10 mx-10">
        <h1 className="font-bold text-xl">Customer Management</h1>

        <form onSubmit={handleSubmit(createCustomer)} className="mb-4">
          <div className="form-group mb-3">
            <label>Member Number</label>
            <input
              type="text"
              className="form-control"
              {...register("memberNumber")}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              {...register("name")}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Date of Birth</label>
            <input
              type="date"
              className="form-control"
              {...register("dob")}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Interest</label>
            <input
              type="text"
              className="form-control"
              {...register("interest")}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {editmode ? "Update Customer" : "Add Customer"}
          </button>
        </form>

        <h2>Customer List</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Member Number</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.memberNumber}</td>
                <td><Link href={`/${customer._id}`} className="font-bold">
                {customer.name}
                </Link> {" "}
                </td>
                <td>
                  <Button
                    className="btn btn-warning btn-sm me-2"
                    onClick={editCustomer(customer._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={deleteById(customer._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </main>
  );
}