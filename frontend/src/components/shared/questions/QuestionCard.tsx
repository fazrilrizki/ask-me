import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageCirclePlus, Star, ThumbsDown } from "lucide-react";
import AnswerCardForm from "./AnswerCardForm";
import { useState } from "react";
import Answers from "../answers/Answers";

export default function QuestionCard({
    user_name, question_id, question
}: {user_name : string, question_id: number, question : string}) 
{
    const [isAnswering, setIsAnswering] = useState(false);

    const handleAnswerButtonClick = () => {
        setIsAnswering(!isAnswering);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{user_name ? user_name : 'Guest'}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <p>{question}</p>
                {isAnswering && <AnswerCardForm questionId={question_id} onCancel={() => setIsAnswering(false)}/>}
                <Answers/>
            </CardContent>
            <CardFooter className='flex justify-end gap-2'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className='rounded-lg border-2 border-black p-1 cursor-pointer' onClick={handleAnswerButtonClick}>
                            <MessageCirclePlus size={16}/>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        Answer
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className='rounded-lg border-2 border-black p-1 cursor-pointer'>
                            <Star size={16} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        Favourite
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className='rounded-lg border-2 border-black p-1 cursor-pointer'>
                            <ThumbsDown size={16} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        Dislike
                    </TooltipContent>
                </Tooltip>
            </CardFooter>
        </Card>
    )
}