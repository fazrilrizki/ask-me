// app/page.tsx
"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  // State to store the message from the backend
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    // Fetch data from your Go backend API
    fetch('http://localhost:8080/api/message')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []); // The empty array ensures this runs only once on component mount

  return (
    <main>
      <h1>Next.js Frontend</h1>
      <p>Message from Go Backend: <strong>{message}</strong></p>
    </main>
  );
}