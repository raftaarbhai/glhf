import { NextResponse } from "next/server";

export async function POST(req) {
  const json = await req.json();
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Pinned to a specific version of Stable Diffusion
      // See https://replicate.com/stability-ai/sdxl
      version:
        "b84f4c074b807211cd75e3e8b1589b6399052125b4c27106e43d47189e8415ad",

      // This is the text prompt that will be submitted by a form on the frontend
      input: { prompt: json.prompt },
    }),
  });

  if (response.status !== 201 && response.status !== 200) {
    let error = await response.json();
    return NextResponse.json({ detail: error.detail });
  }

  const prediction = await response.json();
  return NextResponse.json(prediction);
}
