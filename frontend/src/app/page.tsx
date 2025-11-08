// app/page.tsx
"use client";
import QuestionCard from "@/components/shared/questions/QuestionCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; // ADDED
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnswerType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCirclePlusIcon, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import z from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Question = {
  id: number;
  user_name: string;
  question: string;
  answers: AnswerType[];
};

// MODIFIED: Added 'isAnonymous' to the schema
const formSchema = z.object({
  name: z.string().optional(),
  question: z.string().min(1, "Question is required."),
  isAnonymous: z.boolean().default(false).optional(), // ADDED
});

export default function Home() {
  const [isAsking, setIsAsking] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      question: "",
      isAnonymous: false, // ADDED
    },
  });

  // ADDED: Watch the value of the checkbox
  const isAnonymous = form.watch("isAnonymous");

  const handleAskNowClick = () => {
    setIsAsking(!isAsking);
  };

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:8080/api/questions");
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, []);

  const onSubmit = () => {
    // Logika fetch (try...catch) dihapus
    
    // Tampilkan modal
    setIsModalOpen(true);

    // Reset form dan sembunyikan panel seperti logika Anda sebelumnya
    form.reset();
    setIsAsking(false);
  }

  // Comment dulu untuk di production
  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     const response = await fetch("http://localhost:8080/api/questions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         // 'values.name' akan berisi "Anonymous" jika checkbox dicentang
  //         user_name: values.name,
  //         question: values.question,
  //       }),
  //     });

  //     const data = await response.json();

  //     setQuestions([data.question, ...questions]);
  //     form.reset();
  //     setIsAsking(false);
  //     toast.success("Your question has been submitted!");
  //   } catch (error) {
  //     console.error("Error submitting question:", error);
  //   }
  // };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Hello, ask me anything!</CardTitle>
          <CardAction className="flex gap-1">
            <Button className="cursor-pointer" onClick={handleAskNowClick}>
              <MessageCirclePlusIcon />
              Ask now
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          <Card
            id="card-form-ask"
            className={`col-span-full ${!isAsking ? "hidden" : ""}`}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="flex flex-col gap-y-4 mb-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Type your name..."
                            {...field}
                            disabled={isAnonymous} // MODIFIED: now disabled based on state
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* ADDED: Checkbox field for 'isAnonymous' */}
                  <FormField
                    control={form.control}
                    name="isAnonymous"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked: boolean) => {
                              field.onChange(checked); // 1. Update state 'isAnonymous'
                              if (checked) {
                                // 2. Set name to "Anonymous"
                                form.setValue("name", "Anonymous");
                              } else {
                                // 3. Clear name if it was "Anonymous"
                                if (form.getValues("name") === "Anonymous") {
                                  form.setValue("name", "");
                                }
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium !mt-0">
                          Ask as Anonymous
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="gap-1">
                          Question
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Type what you want to ask..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" className="cursor-pointer">
                    <Send />
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
          {/* Hapus jika production sudah terhubung dengan backend */}
          <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Maaf!</AlertDialogTitle>
                <AlertDialogDescription>
                  Maaf yaaa, fitur submit belum tersedia saat ini! Mohon ditunggu seperti beli mie gacoan :p.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {questions.map((q, index) => (
            <QuestionCard
              user_name={q.user_name}
              question={q.question}
              question_id={q.id}
              answers={q.answers}
              key={q.id || index}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}