import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageCirclePlus, Star, ThumbsDown } from "lucide-react";
import AnswerCardForm from "./AnswerCardForm";
import { useState } from "react";
import Answers from "../answers/Answers";
import { AnswerType } from "@/types";
import { v4 as uuidv4 } from 'uuid'; // Install: npm install uuid

// --- Helper untuk mendapatkan/membuat Visitor ID ---
const getVisitorId = (): string => {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
        visitorId = uuidv4(); // Buat ID unik jika belum ada
        localStorage.setItem('visitor_id', visitorId);
    }
    return visitorId;
}


// --- Update Props ---
export default function QuestionCard({
    user_name, 
    question_id, 
    question, 
    answers,
    favorite_count, // TAMBAHKAN INI
    dislike_count   // TAMBAHKAN INI
}: {
    user_name: string,
    question_id: number,
    question: string,
    answers: AnswerType[],
    favorite_count: number, // TAMBAHKAN INI
    dislike_count: number   // TAMBAHKAN INI
}) {
    const [isAnswering, setIsAnswering] = useState(false);
    const [currentAnswers, setCurrentAnswers] = useState(answers);

    // --- State lokal untuk vote count (Optimistic UI) ---
    const [favCount, setFavCount] = useState(favorite_count);
    const [dislikeCount, setDislikeCount] = useState(dislike_count);

    const handleAnswerButtonClick = () => {
        setIsAnswering(!isAnswering);
    }

    const handleAnswerSubmitted = (newAnswer: AnswerType) => {
        // Pastikan 'newAnswer' tidak null, dan 'prev' adalah array
        setCurrentAnswers((prev) => [newAnswer, ...(prev || [])]);
        setIsAnswering(false); // Tutup form setelah submit
    };

    // --- Fungsi untuk menangani Vote ---
    const handleVote = async (voteType: 'up' | 'down') => {
        const visitorId = getVisitorId();

        // --- Optimistic Update (contoh sederhana) ---
        // Logika ini perlu disempurnakan jika Anda ingin menampilkan 
        // status "sudah vote" (misal: tombol jadi kuning).
        // Untuk sekarang, kita hanya update count berdasarkan respons server.

        try {
            const response = await fetch(`/api/questions/${question_id}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    visitor_id: visitorId,
                    vote_type: voteType,
                }),
            });

            if (!response.ok) {
                throw new Error('Vote failed');
            }

            const data = await response.json();

            // Update state dengan data baru dari server
            setFavCount(data.favorite_count);
            setDislikeCount(data.dislike_count);

        } catch (error) {
            console.error("Failed to submit vote:", error);
            // TODO: Kembalikan state jika API gagal (rollback optimistic update)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{user_name ? user_name : 'Guest'}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <p>{question}</p>
                {isAnswering && <AnswerCardForm questionId={question_id}
                    onCancel={() => setIsAnswering(false)}
                    onSubmitted={handleAnswerSubmitted} />}
                
                {/* Gunakan state 'currentAnswers' */}
                <Answers answers={currentAnswers} />
            </CardContent>
            <CardFooter className='flex justify-end gap-2 items-center'> {/* Tambah items-center */}
                
                {/* --- Tombol Answer --- */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className='rounded-lg border-2 border-black p-1 cursor-pointer' onClick={handleAnswerButtonClick}>
                            <MessageCirclePlus size={16} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>Answer</TooltipContent>
                </Tooltip>
                
                {/* --- Tombol Favorite --- */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        {/* TAMBAHKAN onClick */}
                        <div className='rounded-lg border-2 border-black p-1 cursor-pointer' onClick={() => handleVote('up')}>
                            <Star size={16} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>Favourite</TooltipContent>
                </Tooltip>
                {/* Tampilkan count */}
                <span className="text-sm font-medium">{favCount}</span> 

                {/* --- Tombol Dislike --- */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        {/* TAMBAHKAN onClick */}
                        <div className='rounded-lg border-2 border-black p-1 cursor-pointer' onClick={() => handleVote('down')}>
                            <ThumbsDown size={16} />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>Dislike</TooltipContent>
                </Tooltip>
                {/* Tampilkan count */}
                <span className="text-sm font-medium">{dislikeCount}</span>

            </CardFooter>
        </Card>
    )
}