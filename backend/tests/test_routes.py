from uuid import uuid4
from src.main import app
from fastapi.testclient import TestClient
from src.db.db import db
import pytest

client = TestClient(app)

class TestRoutes:

    @pytest.fixture(autouse=True)
    def clear_db(self):
        # Clear db after every test
        db.clear_db()

    def test_ping(self):
        
        response = client.get("/")
        assert response.status_code == 200


    def test_create_or_auth(self):
        
        response = client.get("/user/create_or_auth")
        assert response.status_code == 200
        assert response.cookies["jwt_token"]

    def test_create_link(self):

        # given 
        jwt_token = client.get("/user/create_or_auth").cookies["jwt_token"]
        url = "https://www.google.com"
        description = "Google"
        
        # when 
        response = client.post("/link/create", json={"url": url, "description": description}, cookies={"jwt_token": jwt_token})


        # then    
        assert response.status_code == 200
        assert response.json()["url"] == url
        assert response.json()["description"] == description

    def test_get_all_user_links(self):

        # given 
        # jwt
        jwt_token = client.get("/user/create_or_auth").cookies["jwt_token"]

        # create links
        num_samples = 4
        sample_links = [str(uuid4) for i in range(num_samples)]
        sample_descriptions = [str(uuid4) for i in range(num_samples)]
        for i in range(num_samples):
            response = client.post("/link/create", json={"url": sample_links[i], "description": sample_descriptions[i]}, cookies={"jwt_token": jwt_token})
            assert response.status_code == 200

        # when 
        response = client.get("/link/get_all_user", cookies={"jwt_token": jwt_token})

        # then    
        assert response.status_code == 200
        assert len(response.json()) == num_samples
        for i in range(num_samples):
            # ith sample is inside 
            assert any([response.json()[i]["url"] == sample_links[i] and response.json()[i]["description"] == sample_descriptions[i] for i in range(num_samples)])
    
    def test_update_link(self):

        # given 
        # jwt
        jwt_token = client.get("/user/create_or_auth").cookies["jwt_token"]

        # create link
        url = "https://www.google.com"
        description = "Google"
        response = client.post("/link/create", json={"url": url, "description": description}, cookies={"jwt_token": jwt_token})
        link_id = response.json()["link_id"]
        assert response.status_code == 200

        # when 
        new_url = "https://www.youtube.com"
        new_description = "Youtube"
        response = client.put("/link/update", json={"link_id": link_id, "url": new_url, "description": new_description}, cookies={"jwt_token": jwt_token})

        # then    
        assert response.status_code == 200
        assert response.json()["url"] == new_url
        assert response.json()["description"] == new_description

    def test_delete_link(self):
            
        # given 
        # jwt
        jwt_token = client.get("/user/create_or_auth").cookies["jwt_token"]

        # create link
        url = "https://www.google.com"
        description = "Google"
        response = client.post("/link/create", json={"url": url, "description": description}, cookies={"jwt_token": jwt_token})
        link_id = response.json()["link_id"]
        assert response.status_code == 200

        # when 
        response = client.delete(f"/link/delete/{link_id}", cookies={"jwt_token": jwt_token})

        # then    
        assert response.status_code == 200

    