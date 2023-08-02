import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export const dynamic = 'force-dynamic'

export default async function ProtectedRoute() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect('/login')
  }

  const signOut = async () => {
    'use server'
    const supabase = createServerActionClient({ cookies })
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="flex-1 flex flex-col max-w-3xl mt-24">
      <h1 className="text-2xl mb-2 flex justify-between">
        <span className="sr-only">Supabase and Next.js Starter Template</span>
      </h1>
      <div className="grid grid-cols-2 my-4">
        <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700">
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
        <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700">
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
      </div>
      <div className="grid grid-cols-2 my-4">
        <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700">
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
        <Card className="mx-4 hover:bg-blue-400 hover:text-white py-2 px-4 border-b-4 border-blue-700">
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
      </div>
      <Button>Click me</Button>
    </div>
  )
}
