"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function OutputSelection() {
  return (
    <div className="flex-1 flex flex-col max-w-xl">
      <div className="grid grid-cols-2 my-4">
        <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1">
          <CardHeader>
            <CardTitle>First Option</CardTitle>
            <CardDescription>What this card does</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Text of the LLM output</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1">
          <CardHeader>
            <CardTitle>Option</CardTitle>
            <CardDescription>What this card does</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Text of the LLM output</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-2 my-4">
        <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1">
          <CardHeader>
            <CardTitle>Option</CardTitle>
            <CardDescription>What this card does</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Text of the LLM output</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700 active:translate-y-1">
          <CardHeader>
            <CardTitle>Option</CardTitle>
            <CardDescription>What this card does</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Text of the LLM output</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <Button onClick={async () => console.log("hello")}>Submit</Button>
    </div>
  );
}
