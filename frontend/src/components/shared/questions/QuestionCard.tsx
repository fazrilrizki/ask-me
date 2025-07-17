import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageCirclePlus, Star, ThumbsDown } from "lucide-react";
import AnswerCardForm from "./AnswerCardForm";
import { useState } from "react";
import Answers from "../answers/Answers";
import { AnswerType } from "@/types";

export default function QuestionCard({
    user_name, question_id, question, answers
}: {user_name : string, question_id: number, question : string, answers: AnswerType[]}) 
{
    const [isAnswering, setIsAnswering] = useState(false);
    const [newAnswer, handleNewAnswer] = useState(answers);

    const handleAnswerButtonClick = () => {
        setIsAnswering(!isAnswering);
    }

    const handleAnswerSubmitted = (newAnswer: AnswerType) => {
        handleNewAnswer((prev) => [newAnswer, ...prev]);
      };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{user_name ? user_name : 'Guest'}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <p>{question}</p>
                {isAnswering && <AnswerCardForm questionId={question_id} 
                onCancel={() => setIsAnswering(false)}
                onSubmitted={handleAnswerSubmitted}/>}
                <Answers answers={newAnswer}/>
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