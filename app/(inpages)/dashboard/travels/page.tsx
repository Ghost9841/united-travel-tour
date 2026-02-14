'use client';
import Travel from '@/app/api/travels/types';
import React, { useEffect, useState } from 'react'

export type ApiResponse = {
  success : boolean;
  data : Travel[];
}

const TravelsAdminPage = () => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const fetchTravels = async () => {
      try {
      const res = await fetch("api/travels");
      const data: ApiResponse = await res.json();
      setLoading(true)
      if(data.success){
        setTravels(data.data);
      }
    } catch (error){
      console.error("Failed to fetch data",error);
    } finally {
      setLoading(false);
    }
  }
  fetchTravels();
  },[]);
  return (
    <main>
      <h1>Admin Travels</h1>
      {travels.map(travel => (
        <div key={travel.id}>
          <h3>{travel.title}</h3>
          <p>{travel.description}</p>
          <p>{travel.price}</p>
        </div>
      ))}
      </main>
  )
}

export default TravelsAdminPage
