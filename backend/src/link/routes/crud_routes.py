from typing import List, Union
from fastapi import APIRouter, Body, Cookie

from backend.src.link.workflow_manager import WorkflowManager
router = APIRouter()

@router.post("/create") 
def create_link(url: str = Body(...), description: str = Body(...), jwt_token: str = Cookie(...)):
    """
    Create a new link.
    """
    # create link manager
    manager = WorkflowManager()

    # auth
    user = manager.auth(jwt_token)

    # create
    link = manager.create_link(url, description, user.user_id)

    return link

@router.get("/get_all_user/{user_id}")
def get_all_user_links(jwt_token: str = Cookie(...)):
    """
    Get all links for a user.
    """
    # create link manager
    manager = WorkflowManager()

    # auth
    user = manager.auth(jwt_token)

    # get links
    links = manager.get_links(user.user_id)

    return links

@router.put("/update")
def update_link(link_id: str = Body(...), url: Union[str, None] = Body(...), description: Union[str, None] = Body(...), jwt_token: str = Cookie(...)):
    """
    Update a link.
    """
    # create link manager
    manager = WorkflowManager()

    # auth
    user = manager.auth(jwt_token)

    # update link
    link = manager.update_link(link_id, url, description, user.user_id)

    return link

@router.delete("/delete")
def delete_link(link_id: str = Body(...), jwt_token: str = Cookie(...)):
    """
    Delete a link.
    """
    # create link manager
    manager = WorkflowManager()

    # auth
    user = manager.auth(jwt_token)

    # delete link
    manager.delete_link(link_id, user.user_id)

    return {"message": "Link deleted."}
