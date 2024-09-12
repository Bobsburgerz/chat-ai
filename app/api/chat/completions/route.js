 
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import mongoose from 'mongoose';

const groq = new Groq({ apiKey: process.env.GROQ_KEY });
const convoSchema = new mongoose.Schema({
  model: { type: String, required: true },
  user: { type: String, required: true },
  messages: [
    {
      content: { type: String },
      role: { type: String },
    },
  ],
});

const Convo = mongoose.models.Convo || mongoose.model('Convo', convoSchema);

export async function POST(request) {
  const { messages, _id } = await request.json();

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: 'mixtral-8x7b-32768',
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || '';
    const updatedMessages = [...messages, { role: "assistant", content: responseContent }];

   
    const updatedConvo = await Convo.findByIdAndUpdate(
      _id,
      { $set: { messages: updatedMessages } },  
      { new: true }  
    );
    if (!updatedConvo) {
      return new Response(JSON.stringify({ error: 'Conversation not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return NextResponse.json({ message: responseContent, convo: updatedConvo });
  } catch (error) {
    console.error(error.message);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
