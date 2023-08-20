"use client"
import { Textarea } from "@/components/ui/textarea"

import {useState} from "react"
import { Button } from "@/components/ui/button";
export default function EditableScroll(props: {promptGenerated: boolean, generatePrompts: any, textContent: string, setTextContent: any}) {


    const handleTextContentChange = event => {
    props.setTextContent(event.target.value);
    };



    return (
        <>
        <div className="flex justify-center">
            <Textarea className="h-[198px] w-[496px] rounded-md border p-10 my-11" onChange={handleTextContentChange} value={props.textContent} placeholder={'Enter your prompt'}>
                {props.textContent}
            </Textarea>

        </div>
        {!props.promptGenerated &&
         <Button onClick={props.generatePrompts}> Generate Prompt </Button>}
        </>
    )
}
