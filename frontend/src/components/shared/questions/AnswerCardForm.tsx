import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnswerType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircleReply } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type AnswerCardFormProps = {
    questionId: number;
    onCancel: () => void;
    onSubmitted?: (answer: AnswerType) => void;
}

const formAnswerSchema = z.object({
    user_name: z.string().optional(),
    answer: z.string().min(1, "Answer is required."),
})

export default function AnswerCardForm({ questionId, onCancel, onSubmitted }: AnswerCardFormProps) {
    const form = useForm<z.infer<typeof formAnswerSchema>>({
            resolver: zodResolver(formAnswerSchema),
            defaultValues: {
                answer: ""
            }
    })

    const onSubmit = async (values: z.infer<typeof formAnswerSchema>) => {
        try {
            const response = await fetch(`http://localhost:8080/api/questions/${questionId}/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_name: values.user_name,
                    answer: values.answer,
                })
            })

            const data = await response.json();

            toast.success("Your answer has been submitted!");
            form.reset();
            onCancel();
            onSubmitted?.(data.answer);
        } catch (error) {
            console.error("Error submitting answer:", error);
        }
    }
    return (
        <Card className="mt-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="user_name"
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
                            name="answer"
                            render={({ field }) => (
                            <FormItem>
                            <FormLabel>Your Reply</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Type your reply..." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </CardContent>
                    <CardFooter className='flex justify-end gap-2 mt-4'>
                        <Button className="cursor-pointer" type="submit">
                            <MessageCircleReply />
                            Reply
                        </Button>
                        <Button variant="destructive" className="cursor-pointer" onClick={onCancel}>
                            Cancel
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}