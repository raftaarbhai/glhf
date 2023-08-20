"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import EditableScroll from "@/components/turk/editableScroll";

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

export default function OutputSelection() {
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [promptGenerated, setPromptGenerated] = useState(false)

  const handleSubmit = async (e) => {
      /* e.preventDefault();
       * const response = await fetch("/api/predictions", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify({
       *       prompt: '// javascript function that returns the meaning of life',
       *   }),
       * });
       *   let prediction = await response.json();
       * if (response.status !== 201 && response.status !== 200) {
       *   setError(prediction.detail);
       *   return;
       * }
       * setPrediction(prediction);
       * console.log(prediction);

       * while (
       *   prediction.status !== "succeeded" &&
       *   prediction.status !== "failed"
       * ) {
       *   await sleep(1000);
       *   console.log(prediction);
       *   const response = await fetch("/api/predictions/" + prediction.id);
       *   prediction = await response.json();
       *   if (response.status !== 200) {
       *     setError(prediction.detail);
       *     return;
       *   }
       *   setPrediction(prediction);
       * } */
      const { error } = await supabase
          .from('data')
          .insert({ prompt: 'some prompt', "response-1":'test', "response-2": "another-test", category: "food" })

      setPromptGenerated(!promptGenerated)
      // Save to database and make payout
  };

  return (
    <>
      <EditableScroll promptGenerated={promptGenerated} setPromptGenerated={setPromptGenerated}/>

   {promptGenerated && <div className="flex-1 flex flex-col max-w-xl">
      <div className="grid grid-cols-2 my-4">
          <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1">
            <CardHeader>
              <CardTitle>First Option</CardTitle>
              <CardDescription>Status: {'status'}</CardDescription>
            </CardHeader>
            <CardContent>{'status'}</CardContent>

          </Card>
        <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1">
          <CardHeader>
            <CardTitle>Second Option</CardTitle>
            <CardDescription>What this card does</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Text of the LLM output</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 my-4">
        <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1">
          <CardHeader>
            <CardTitle>Third Option</CardTitle>
            <CardDescription>What this card does</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Text of the LLM output</p>
          </CardContent>

        </Card>
        <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1">
          <CardHeader>
            <CardTitle>Fourth Option</CardTitle>
            <CardDescription>What this card does</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Text of the LLM output</p>
          </CardContent>
        </Card>
      </div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
   }
      </>
  );
}
