

from typing import List
from src.exceptions import UnauthorizedException
from src.user.interfaces.user import User
from src.user.services.user_services import UserService
from src.link.services.link_services import LinkCrudService
from src.link.interfaces.link import Link


class WorkflowManager: 

    def __init__(self, link_crud_service: LinkCrudService = LinkCrudService(), user_service: UserService = UserService()):
        self.link_crud_service = link_crud_service
        self.user_service = user_service

    def auth(self, token: str) -> User:
        """
        Authenticate a user.
        """
        # decode token
        user = self.user_service.decode_jwt(token)

        # if user is none, raise exception
        if user is None:
            raise UnauthorizedException("Invalid jwt!")

        # else return user id
        return user

    def auth_or_create(self, token: str) -> User:
        """
        If a user is none, create a new user.
        """
        # decode token
        user = self.user_service.decode_jwt(token)

        # if user is none, create a new user
        if user is None:
            return User(user_id=self.user_service.create_user_id())

        # else return user id
        return user

    def encode_user(self, user: User) -> str:
        """
        Encode a user id.
        """
        # encode user id
        token = self.user_service.encode_jwt(user)

        return token

    def create_link(self, url: str, description: str, user_id: str) -> Link:
        """
        Create a new link.
        """
        # create link
        link = self.link_crud_service.create_link(url, description, user_id)

        return link

    def get_links(self, user_id: str) -> List[Link]:
        """
        Get all links.
        """
        # get links
        links = self.link_crud_service.get_links(user_id)

        return links

    def update_link(self, link_id: str, url: str, description: str) -> Link:
        """
        Update a link.
        """
        # update link
        link = self.link_crud_service.update_link(link_id, url, description)

        return link

    def delete_link(self, link_id: str) -> None:
        """
        Delete a link.
        """
        # delete link
        self.link_crud_service.delete_link(link_id)

        return None