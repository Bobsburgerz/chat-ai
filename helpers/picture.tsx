import axios from 'axios';

const GeneratePicture = async (opt: string, img: string | undefined) => {
  try {
 
    if (!img) {
      throw new Error("Image file URL is required.");
    }

    const response = await axios.post('https://pythonapi-s7fm.onrender.com/generate', {"prompt": opt,
      "source_image":img
      
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Access the output from the response
    const data = response.data;

    if (!DataTransferItemList) {
      throw new Error("No output returned from the API.");
    }

    console.log("Generated output:", data); // Log the output
    return data.face_swap_result.secure_url;
  } catch (error) {
    console.error("Error generating picture:");
    // Optional: rethrow the error if you want to handle it further up the chain
    throw error;  
  }
};

export default GeneratePicture;
