const GeneratePicture = async (opt: string, img: string | undefined) => {
  try {
    // Check if image URL is provided
    if (!img) {
      throw new Error("Image file URL is required.");
    }

    const response = await fetch('https://ominous-trout-wrgv77796qrpcg67r-3000.app.github.dev/api/chat/photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `${opt}, no face, only body, body pics, cropped, faceless, below face`,
        imageFile: img,
      }),
    });

  
    if (!response.ok) {
      const errorBody = await response.json();  
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${JSON.stringify(errorBody)}`);
    }

  
    const data = await response.json();

 
    if (!data.output) {
      throw new Error("No output returned from the API.");
    }

    console.log("Generated output:", data.output); // Log the output
    return data.output;  
  } catch (error) {
    console.error("Error generating picture:", error);
    // Optional: rethrow the error if you want to handle it further up the chain
    throw error;  
  }
};

export default GeneratePicture;
