from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from gradio_client import Client, handle_file
import os
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import requests

 

# Enable CORS
 
app = Flask(__name__)
CORS(app)  # This will allow all origins by default
# Load environment variables from .env file
load_dotenv()

# Cloudinary configuration
cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),  
    api_key=os.getenv('API_KEY'),         
    api_secret=os.getenv('API_SECRET')    
)

# Load Hugging Face token
hf_token = os.getenv('HUGGING_FACE_TOKEN')

@app.route('/generate', methods=['POST'])
def generate_and_swap():
    try:
        # Get parameters from the request
        data = request.json
        prompt = data.get('prompt')
        print(prompt)
        source_image_url = data.get('source_image')  

        if not source_image_url:
            return jsonify({"error": "Source image URL is required."}), 400
     
        client = Client("Arivmta19/Dremmar-nsfw-xl")
        nsfw_result = client.predict(
            param_0=prompt,	
            api_name="/predict"
        )
     
        # Step 3: Perform face swap
        face_swap_client = Client("Arivmta19/nsfw-face-swap")
        face_swap_result = face_swap_client.predict(
            source_file=handle_file(source_image_url),
            target_file=handle_file(nsfw_result),  # Assuming nsfw_result is a file path or object
            doFaceEnhancer=False,
            api_name="/predict"
        )

        # Step 4: Upload the face swap result to Cloudinary
        cloudinary_response = cloudinary.uploader.upload(face_swap_result)  # Assuming face_swap_result returns a valid path or file-like object

        return jsonify({"face_swap_result": cloudinary_response})

    except Exception as error:
        return jsonify({"error": str(error)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)), debug=True)