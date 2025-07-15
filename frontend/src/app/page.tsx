  // app/page.tsx
  "use client";
  import QuestionCard from '@/components/shared/questions/QuestionCard';
  import { Button } from '@/components/ui/button';
  import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
  import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
  import { Input } from '@/components/ui/input';
  import { Textarea } from '@/components/ui/textarea';
  import { AnswerType } from '@/types';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { MessageCirclePlusIcon, Send } from 'lucide-react';
  import { useEffect, useState } from 'react';
  import { useForm } from 'react-hook-form';
  import { toast } from 'sonner';
  import z from 'zod';

  type Question = {
    id: number,
    user_name: string,
    question: string,
    answers: AnswerType[]
  }

  const formSchema = z.object({
      name: z.string().optional(),
      question: z.string().min(1, "Question is required."),
  }) 

  export default function Home() {
    const [isAsking, setIsAsking] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        question: ""
      },
    })

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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        const response = await fetch('http://localhost:8080/api/questions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_name: values.name,
            question: values.question,
          }),
        });

        const data = await response.json();

        setQuestions([data.question, ...questions]);
        form.reset();
        setIsAsking(false);
        toast.success("Your question has been submitted!")
      } catch (error) {
        console.error('Error submitting question:', error);
      }
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className='flex flex-col gap-y-4 mb-4'>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Type your name..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="question"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='gap-1'>
                            Question
                            <span className='text-red-500'>*</span>
                          </FormLabel>
                          <FormControl>
                             <Textarea
                              placeholder='Type what you want to ask...'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className='flex justify-end'>
                    <Button type="submit" className='cursor-pointer'>
                      <Send />
                      Submit
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
            {questions.map((q, index) => (
              <QuestionCard user_name={q.user_name} question={q.question} question_id={q.id} answers={q.answers} key={q.id || index} />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }