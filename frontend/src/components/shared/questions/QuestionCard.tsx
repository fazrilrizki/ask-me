import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ThumbsDown } from "lucide-react";

export default function QuestionCard({
    user_name, question
}: {user_name : string, question : string}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{user_name ? user_name : 'Guest'}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{question}</p>
            </CardContent>
            <CardFooter className='flex justify-end gap-2'>
                <div className='rounded-lg border-2 border-black p-1 cursor-pointer'>
                    <Star size={16} />
                </div>
                <div className='rounded-lg border-2 border-black p-1 cursor-pointer'>
                    <ThumbsDown size={16} />
                </div>
            </CardFooter>
        </Card>
    )
}