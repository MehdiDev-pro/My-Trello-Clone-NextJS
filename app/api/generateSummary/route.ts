import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // todos in the body of POST req
  const { todos } = await request.json();

  // communicate with openAI GPT
  const messages = [
    {
      role: "system",
      content: "When responding, welcome the user always as Mr.Mehdi and say welcome to the My Trello app! Limit the response to 200 characters",
    },
    {
      role: "user",
      content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here is the data: ${JSON.stringify(todos)}`,
    },
  ];
  const response = await openai.completions.create({
    model: "text-davinci-003",
    prompt: messages.map((message) => `${message.role}: ${message.content}`).join("\n"),
    max_tokens: 100,
  });

  const { choices } = response;
  return NextResponse.json(choices[0].text);
}
