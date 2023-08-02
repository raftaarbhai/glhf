import { NextResponse } from 'next/server';
export async function POST(req) {
    const reqJSON = await req.json()
    console.log(reqJSON)
  const response = await fetch(
    "https://api.replicate.com/v1/predictions/" + reqJSON.query.id,
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status !== 200) {
    let error = await response.json();
    return NextResponse.json({detail: error.detail})
  }

  const prediction = await response.json();
  return NextResponse.json(prediction);
}
