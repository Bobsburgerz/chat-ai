import axios from "axios";
import prodia from '@api/prodia';
import Replicate from "replicate";
import { v2 as cloudinary } from 'cloudinary';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
 

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt, source } = body;

    if (!prompt) {
      return new Response(JSON.stringify({ message: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Authenticate with Prodia API
    await prodia.auth(`${process.env.PRODIA_API_TOKEN}`);

    // Generate the image with Prodia
    const prodiaResponse = await prodia.generate({
      model: 'dreamshaper_8.safetensors [9d40847d]', 
      negative_prompt: 'bad quality, mishshapen, ugly, deformity, extra limbs, extra fingers, worst quality, unrealistic', 
      prompt: prompt
    });

    // Validate the response and check for jobId
    if (!prodiaResponse ) {
      throw new Error('Failed to generate image or missing jobId');
    }
console.log(prodiaResponse)
    const jobId = prodiaResponse.data.job;

    // Function to check job status with retries
    const checkJobStatus = async (jobId, retries = 4, delay = 12000) => {
      for (let attempt = 1; attempt <= retries; attempt++) {
        console.log(`Checking job status, attempt: ${attempt}`);

        const jobStatusResponse = await prodia.getJob({ jobId });
        const jobStatus = jobStatusResponse.data.status;

        if (jobStatus == 'succeeded') {
          return jobStatusResponse.data.imageUrl;   
        }

        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      throw new Error('Job did not complete after maximum retries.');
    };

    // Await image generation completion
    const output = await checkJobStatus(jobId);

    // If prompt includes "Booty", directly upload the generated image to Cloudinary
    if (prompt.includes("Booty")) {
      const cloudinaryResponse = await cloudinary.uploader.upload(output[0], {
        format: 'jpg', // Customize the format if necessary
      });

      return new Response(JSON.stringify({ url: cloudinaryResponse.secure_url }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // Perform face-swap operation if the prompt does not include "Booty"
      const faceSwapResponse = await replicate.run(
        "omniedgeio/face-swap:1312a036be013a29527a1dffce2fbbd475fb134eb809f295859d435546d5c76b",
        {
          input: {
            swap_image: source,
            target_image: output,
            disable_safety_checker: true,
          },
        }
      );

    
      if (!faceSwapResponse ) {
        throw new Error('Face swap failed');
      }
      const cloudinaryResponse = await cloudinary.uploader.upload(faceSwapResponse, {
        format: 'jpg' 
      });
   
      return new Response(JSON.stringify(  cloudinaryResponse ), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });}
    } catch (error) {
      console.error('Error generating image:', error);
      return new Response(
        JSON.stringify({ message: 'Error generating image', error: error.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }


{/**

  import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

Copy
Run omniedgeio/face-swap using Replicate’s API. Check out the model's schema for an overview of inputs and outputs.

const output = await replicate.run(
  "omniedgeio/face-swap:1312a036be013a29527a1dffce2fbbd475fb134eb809f295859d435546d5c76b",
  {
    input: {
      swap_image: "https://replicate.delivery/pbxt/JoBuzfSVFLb5lBqkf3v9xMnqx3jFCYhM5JcVInFFwab8sLg0/long-trench-coat.png",
      target_image: "https://replicate.delivery/pbxt/JoBuz3wGiVFQ1TDEcsGZbYcNh0bHpvwOi32T1fmxhRujqcu7/9X2.png"
    }
  }
);
console.log(output);
    
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
