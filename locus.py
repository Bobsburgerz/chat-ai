from locust import HttpUser, task, between

class APIUser(HttpUser):
    wait_time = between(1, 3)  # Wait time between each request (in seconds)
    
    @task
    def test_generate_endpoint(self):
        self.client.post("/generate", json={
            "prompt": "A photo of an asian sexy woman, sexy tits, breasts, boobs, naked, nice body, full body, black hair, short hair, realistic, best quality, HD ,background of a nice bedroom, NSFW",
          
         "source_image":"https://res.cloudinary.com/dgyn6qakv/image/upload/v1724287629/00192-1281232486-DPM_2M_Karras-majicmixRealistic_v4-None_gxpfks.png"
        })
