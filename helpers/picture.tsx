import { usePutUserMutation } from '@/redux/services/appApi';
import axios from 'axios';
import { useSelector } from 'react-redux';

const GeneratePicture = async (
  opt: string, 
  img: string | undefined, 
  putUser: any,   
  user: any    
) => {
  try {
    if (!img) {
      
      throw new Error("Image file URL is required.");
    }

    if (!user.credits ) {
      const updatedUser = {
        email: user.email,
        credits: 0,
      };
      await putUser(updatedUser);
       throw new Error("No Credits Remaining");
    } else if (user.credits == 0) {
      throw new Error("No Credits Remaining");
    } else if (user.credits < 0) {
      throw new Error("No Credits Remaining");
    }

    

    const response = await axios.post(
      'https://3000-bobsburgerz-chatai-6lsn50cr1ya.ws-us116.gitpod.io/api/chat/photo',
      { "prompt": opt, "source": img },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const data = response.data;

    if (!data.secure_url) {
      throw new Error("No output returned from the API.");
    }

    
    if (user.credits > 0) {
      const updatedUser = {
        email: user.email,
        credits: user?.credits - 1,
      };

     
      const updateResponse = await putUser(updatedUser);

      if (updateResponse.error) {
        console.error("Error updating user credits:", updateResponse.error);
        throw new Error("Failed to update user credits.");
      } else {
        console.log("User credits updated successfully:", updateResponse);
      }
    } else {
      throw new Error("Insufficient credits.");
    }

    console.log("Generated output:", data.secure_url);

    return data.secure_url;
  } catch (error) {
    console.error("Error generating picture:", error);
    throw error;
  }
};

export default GeneratePicture;
