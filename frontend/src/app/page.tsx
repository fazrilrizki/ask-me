// app/page.tsx
"use client";
import QuestionCard from '@/components/shared/questions/QuestionCard';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageCirclePlusIcon, Send, Star, ThumbsDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Loading...');
  const [isAsking, setIsAsking] = useState(false);

  const handleAskNowClick = () => {
    setIsAsking(!isAsking);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Hello, ask me anything!</CardTitle>
          <CardAction className='flex gap-1'>
            <Button className='cursor-pointer' onClick={handleAskNowClick}>
              <MessageCirclePlusIcon />
              Ask now
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-4'>
          <Card id='card-form-ask' className={`col-span-full ${!isAsking ? 'hidden' : ''}`}>
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