import { NextResponse } from "next/server";
export async function GET(request: Request, { params }: { params: { id: string } }) {

  console.log(params.id)
  const response = await fetch(
    "https://api.replicate.com/v1/predictions/" + params.id,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (response.status !== 200) {
    let error = await response.json();
    return NextResponse.json({ detail: error.detail });
  }

  const prediction = await response.json();
  return NextResponse.json(prediction);
}
