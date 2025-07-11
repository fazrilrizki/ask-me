import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, MessageCircleReply } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

type AnswerCardProps = {
    onCancel: () => void;
}

const formAnswerSchema = z.object({
    answer: z.string().min(1, "Answer is required."),
})

export default function AnswerCard({ onCancel }: AnswerCardProps) {
    const form = useForm<z.infer<typeof formAnswerSchema>>({
            resolver: zodResolver(formAnswerSchema),
            defaultValues: {
                answer: ""
            }
    })

    const onSubmit = async (values: z.infer<typeof formAnswerSchema>) => {
        alert("submit answer")
    }
    return (
        <Card className="mt-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
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