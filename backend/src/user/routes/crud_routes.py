
from fastapi import APIRouter, Cookie, Response
from typing import Union
from src.workflow_manager import WorkflowManager

router = APIRouter()

@router.get("/create_or_auth") 
def create_or_auth(response: Response, jwt_token: Union[str, None] = Cookie(None)):
    """
    Create a new link.
    """
    # create link manager
    manager = WorkflowManager()

    # auth
    user = manager.auth_or_create(jwt_token)

    # set cookie
    response.set_cookie(key="jwt_token", value=manager.encode_user(user), httponly=True, samesite = 'none')

    return user