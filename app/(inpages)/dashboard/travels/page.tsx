"use client";

import Travel from "@/app/api/travels/types";
import { useEffect, useState } from "react";

export default function TravelsPage() {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    price: 0,
    originalPrice: 0,
    duration: "",
    rating: 0,
    reviews: 0,
    image: "",
    category: "",
    groupSize: "",
  });

  // Fetch travels
  const fetchTravels = async () => {
    const res = await fetch("/api/travels");
    const data = await res.json();
    setTravels(data);
  };

  useEffect(() => {
    fetchTravels();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/travels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    fetchTravels(); // refresh list
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Travels</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            type={typeof form[key as keyof typeof form] === "number" ? "number" : "text"}
            onChange={handleChange}
          />
        ))}
        <button type="submit">Add Travel</button>
      </form>

      <hr />

      {/* List */}
      {travels.map((travel) => (
        <div key={travel.id}>
          <h3>{travel.title}</h3>
          <p>{travel.location}</p>
          <p>${travel.price}</p>
        </div>
      ))}
    </div>
  );
}
