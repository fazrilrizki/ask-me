import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnswerType } from "@/types";

export default function Answers({ answers }: { answers: AnswerType[] }) {
    return (
        <div className="flex flex-col gap-4">
            {answers?.map((answer) => (
                <Card key={answer.id}>
                    <CardHeader>
                        <CardTitle>{answer.user_name ?? 'Guest'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{answer.answer}</p>
                    </CardContent>
                    <CardFooter className='flex justify-end gap-2'></CardFooter>
                </Card>
            ))}
        </div>
    )
}