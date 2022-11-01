from uuid import uuid1
import requests

def lambda_handler(event: dict, context):

    url = event["url"]
    token = "r2FRw6_cxOj-698bOxDO0Bcm5xy-xvyJtIvOGVtOigCrsyOSFVh-Ptmny8Czvdy-"
    qr_code_generator_api = f"https://api.qr-code-generator.com/v1/create?access-token={token}"
    
    # ping dataforseo 
    response = requests.post(qr_code_generator_api, {
        "qr_code_text": url,
        "image_format": "SVG",
        "qr_code_logo": "scan-me-square"
    })
    

    # if not 200, return empty result with error
    return response.content



