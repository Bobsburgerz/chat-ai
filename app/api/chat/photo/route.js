

import { Client } from "@gradio/client";

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt } = body;
 console.log(prompt)
    const client = await Client.connect("Arivmta19/enhanceaiteam-Flux-uncensored", {
      hf_token: process.env.HUGGING_FACE_TOKEN,  
    });
    const result = await client.predict("/predict", {
      param_0: prompt || "show boobs",  
    });

    console.log(JSON.stringify({ result }))
   
    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error("Error running Gradio model:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}


{/**
    
    import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt, input_image } = body;

    // Make a request to Replicate API
    const output = await replicate.run(
      "tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
      {
        input: {
          prompt: "A photo of img: A bare naked woman's vagina",
          num_steps: 50,
          style_name: "Photographic (Default)",
          input_image: "https://res.cloudinary.com/dgyn6qakv/image/upload/v1724287635/00101_np1zsl.png",
          num_outputs: 1,
          guidance_scale: 5,
          negative_prompt: "bad anatomy, deformed body, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
          style_strength_ratio: 20,
          disable_safety_checker:true
        },
      }
    );

    return new Response(JSON.stringify({ output }), { status: 200 });
  } catch (error) {
    console.error("Error running Replicate model:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
  }
}



// Import the Gradio client
    
    */}
