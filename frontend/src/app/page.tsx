  // app/page.tsx
  "use client";
  import QuestionCard from '@/components/shared/questions/QuestionCard';
  import { Button } from '@/components/ui/button';
  import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
  import { Textarea } from '@/components/ui/textarea';
  import { MessageCirclePlusIcon, Send, Star, ThumbsDown } from 'lucide-react';
  import { useEffect, useState } from 'react';

  type Question = {
    id: number,
    question: string,
  }

  export default function Home() {
    const [message, setMessage] = useState('Loading...');
    const [isAsking, setIsAsking] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleAskNowClick = () => {
      setIsAsking(!isAsking);
    }

    useEffect(() => {
      async function fetchQuestions() {
        try {
          const response = await fetch('http://localhost:8080/api/questions');
          const data = await response.json();

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          setQuestions(data.questions);
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      }

      fetchQuestions();
    }, [])

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
            {questions.map((q, index) => (
              <QuestionCard question={q.question} key={q.id || index} />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }