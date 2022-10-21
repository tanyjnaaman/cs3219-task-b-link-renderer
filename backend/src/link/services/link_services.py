from typing import List
from src.exceptions import DatabaseException
from src.link.interfaces.link import Link
from src.constants import LINK_TABLE_NAME
from src.db.db import db, DatabaseWrapper

from datetime import datetime
from uuid import uuid4

class LinkCrudService:
    """
    Responsible for crud operations on the rooms table 
    in the collaboration service database.
    """

    def __init__(self, _db: DatabaseWrapper = db):
        self.db = _db
        self.table = LINK_TABLE_NAME

    def create_link(self, url: str, description: str, user_id: str, _link_id: str = None, _created_at:str = None) -> str:
        """
        Create a new link.
        """
        # create link id
        link_id = _link_id or str(uuid4())
        last_updated = _created_at or datetime.now().isoformat()

        # create link entry
        self.db.insert(
            self.table,
            {
                "link_id": link_id,
                "url": url,
                "description": description,
                "user_id": user_id,
                "last_updated": last_updated
            },
        )

        # wrap into interface
        link = Link(
            link_id=link_id,
            url=url,
            description=description,
            user_id=user_id,
            last_updated=last_updated
        )

        return link

    def get_link(self, link_id:str) -> Link:
        """
        Get a link.
        """
        # get item
        items = self.db.get_items(self.table, {"link_id": link_id})
        if len(items) != 1: 
            raise DatabaseException(f"Expected 1 item, got {len(items)}")

        # wrap into interface
        link = Link(**items[0])

        return link

    def get_links(self, user_id: str) -> List[Link]:
        """
        Get all links for a user.
        """
        # get items
        items = self.db.get_items(self.table, {"user_id": user_id})

        # wrap into interface
        links = [Link(**item) for item in items]

        return links

    def update_link(self, link_id: str, url: str = None, description: str = None) -> None:
        """
        Update a link.
        """
        
        # get item
        link = self.get_link(link_id)

        # update item
        modified = False
        if url:
            link.url = url
            modified = True
        if description:
            link.description = description
            modified = True
        if modified:
            link.last_updated = datetime.now().isoformat()
            self.db.update_item(self.table, {"link_id": link_id}, link.dict())

        return link
    def delete_link(self, link_id: str) -> None:
        """
        Delete a link.
        """
        self.db.delete_item(self.table, {"link_id": link_id})