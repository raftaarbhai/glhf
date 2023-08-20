"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import EditableScroll from "@/components/turk/editableScroll";
import {zbd} from '@zbd/node'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const supabase = createClientComponentClient()
const ZBD = new zbd(process.env.ZBD_API_KEY)

export default function OutputSelection() {
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [promptGenerated, setPromptGenerated] = useState(false)
    const [textContent, setTextContent] = useState("")
    const [isResponseGenerating, setIsResponseGenerating] = useState(false)
    const [selectedCardIndex, setSelectedCardIndex] = useState(0)

    async function cardOneClicked(){
        setSelectedCardIndex(1)
    }
    async function cardTwoClicked(){
        setSelectedCardIndex(2)
    }
    async function cardThreeClicked(){
        setSelectedCardIndex(3)
    }
    async function cardFourClicked(){
        setSelectedCardIndex(4)
    }

    async function generatePrompts(e) {
        e.preventDefault();
        setIsResponseGenerating(true)
        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: textContent,
            }),
        });
        let prediction = await response.json();
        if (response.status !== 201 && response.status !== 200) {
            setError(prediction.detail);
            return;
        }
        setPrediction(prediction);

        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
        ) {
            await sleep(1000);
            console.log(prediction);
            const response = await fetch("/api/predictions/" + prediction.id);
            console.log("the response is ")
            console.log(response)
            prediction = await response.json();
            if (response.status !== 200) {
                setError(prediction.detail);
                return;
            }
            setPrediction(prediction.output);
        }
        setIsResponseGenerating(false)
        setPromptGenerated(!promptGenerated)
    }

    const handleSubmit = async (e) => {
        const { data: { user } } = await supabase.auth.getUser()
        if(!user) {
            throw "no valid user found"
        }
        console.log(user)
        // Save to database
        const { error } = await supabase
            .from('data')
          .insert({ prompt: textContent, "response_one": prediction, "response_two": prediction, "response_three": prediction, "response_four": prediction, selected: "prompt", category: "rlhf", user_id: user.id  })
        console.log(error)
      setPromptGenerated(!promptGenerated)
        // Make payout via lightning network. We use Gamertag as that's exposed for use on their test network.
        // Can swap to sendPayment to lightning address if on prod
        const payload = {
            amount: '3000',
            // This is a test gamertag.
            gamertag: 'f53f9214',
            description: 'Sending to ZBD Gamertag',
        }
        const data = await ZBD.sendGamertagPayment(payload);

    };

    return (
        <>
            <EditableScroll promptGenerated={promptGenerated} generatePrompts={generatePrompts} textContent={textContent} setTextContent={setTextContent} isResponseGenerating={isResponseGenerating}/>

            {promptGenerated && <div className="flex-1 flex flex-col max-w-xl">
                <div className="grid grid-cols-2 my-4">
                    <Card className={selectedCardIndex == 1 ? "bg-red-400": "mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1"} onClick={cardOneClicked}>
                        <CardHeader>
                            <CardTitle>First Option</CardTitle>
                        </CardHeader>
                        <CardContent>{prediction}</CardContent>
                    </Card>
                    <Card className={selectedCardIndex == 2 ? "bg-red-400": "mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1"} onClick={cardTwoClicked}>
                        <CardHeader>
                            <CardTitle>Second Option</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{prediction}</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-2 my-4">
                    <Card className={selectedCardIndex == 3 ? "bg-red-400": "mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1"} onClick={cardThreeClicked}>

                        <CardHeader>
                            <CardTitle>Third Option</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{prediction}</p>
                        </CardContent>

                    </Card>
                    <Card className={selectedCardIndex == 4 ? "bg-red-400": "mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1"} onClick={cardFourClicked}>
                        <CardHeader>
                            <CardTitle>Fourth Option</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{prediction}</p>
                        </CardContent>
                    </Card>
                </div>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
            }
        </>
    );
}
