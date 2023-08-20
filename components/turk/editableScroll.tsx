"use client"
import { Textarea } from "@/components/ui/textarea"

import {useState} from "react"
import { Button } from "@/components/ui/button";
export default function EditableScroll() {
    const [textContent, setTextContent] = useState("")
    const [promptGenerated, setPromptGenerated] = useState(false)
    const handleTextContentChange = event => {
    // 👇️ access textarea value
    setTextContent(event.target.value);
    };

    async function generatePrompts() {
        setPromptGenerated(!promptGenerated)
    }

    return (
        <>
        <div className="flex justify-center">
            <Textarea className="h-[198px] w-[496px] rounded-md border p-10 my-11" onChange={handleTextContentChange} value={textContent} placeholder={'Enter your prompt'}>
                {textContent}
            </Textarea>

        </div>
        {!promptGenerated &&
         <Button onClick={generatePrompts}> Generate Prompt </Button>}
        </>
    )
}
