import { Client } from "@gradio/client";

// Function to convert a WebP image to a PNG Blob
async function convertWebPToPNG(webpBlob) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Export the canvas as a PNG Blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to convert image to PNG"));
        }
      }, "image/png");
    };

    img.onerror = function () {
      reject(new Error("Failed to load the image"));
    };
    
    // Convert blob to URL and set as the image source
    img.src = URL.createObjectURL(webpBlob);
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { imageFile } = body;

    // Fetch the WebP target image
    const targetImageUrl = "https://arivmta19-enhanceaiteam-flux-uncensored.hf.space/file=/tmp/gradio/697e951971d673b54752bb9f2f78162d74053c62c1375014f384009dcf74a32e/image.webp";
    const targetWebPBlob = await fetch(targetImageUrl).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch target image");
      return res.blob();
    });

    // Convert the WebP image to PNG
    const targetPngBlob = await convertWebPToPNG(targetWebPBlob);

    // Fetch the source image (from the user's provided imageFile) as a Blob
    const sourceImageBlob = await fetch(imageFile).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch source image");
      return res.blob();
    });

    // Connect to the Felix Rosberg's face-swap model on Gradio
    const faceSwapClient = await Client.connect("felixrosberg/face-swap");

    // Call the face swap API with the PNG target image and source image
    const faceSwapResult = await faceSwapClient.predict("/run_inference", [
      targetPngBlob,     // Target image as PNG blob (converted from WebP)
      sourceImageBlob,   // Source image blob (provided by the user)
      0,                 // Anonymization ratio (0-100%)
      0,                 // Adversarial defense ratio (0-100%)
      ["Compare"]        // Mode (Compare for visualization)
    ]);

    // Return the face swap result
    return new Response(JSON.stringify({ faceSwapResult }), { status: 200 });
  } catch (error) {
    console.error("Error running Gradio model:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
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
