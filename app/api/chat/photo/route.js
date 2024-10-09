 
import prodia from '@api/prodia';
import { v2 as cloudinary } from 'cloudinary';
import { Client } from "@gradio/client";
 
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

  
    const output = await checkJobStatus(jobId);

   
    if (prompt.includes("Booty")) {
      const cloudinaryResponse = await cloudinary.uploader.upload(output, {
        format: 'jpg', // Customize the format if necessary
      });
       
      return new Response(JSON.stringify(  cloudinaryResponse), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {

      const response_0 = await fetch(source);
      const sourceImage = await response_0.blob();
console.log("source",sourceImage,  output);
      const response_1 = await fetch(output);
      const targetImage = await response_1.blob();
console.log("target",targetImage);
      const app = await Client.connect("Arivmta19/nsfw-face-swap");
      const faceSwapResponse = await app.predict("/predict", {
       
        source_file: sourceImage, 	 
        target_file: targetImage,  		
        doFaceEnhancer: false, 
        });
 
    
      if (!faceSwapResponse ) {
        throw new Error('Face swap failed');
      }
      const cloudinaryResponse = await cloudinary.uploader.upload(faceSwapResponse?.data[0]?.url, {
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
