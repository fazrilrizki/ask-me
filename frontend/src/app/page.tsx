// app/page.tsx
"use client";
import QuestionCard from '@/components/shared/questions/QuestionCard';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageCirclePlusIcon, Send, Star, ThumbsDown } from 'lucide-react';
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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Hello, ask me anything!</CardTitle>
          <CardAction className='flex gap-1'>
            <Button className='cursor-pointer'>
              <MessageCirclePlusIcon />
              Ask now
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-4'>
          <Card className='col-span-full hidden'>
            <CardContent>
              <Textarea placeholder='Type what you want to ask...'/>
            </CardContent>
            <CardFooter className='flex justify-end'>
              <Button className='cursor-pointer'>
                <Send />
                Submit
              </Button>
            </CardFooter>
          </Card>
          {[...Array(5)].map((_, index) => (
            <QuestionCard key={index} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}