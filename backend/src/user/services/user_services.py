from typing import Union
from uuid import uuid4
from src.constants import JWT_SECRET
from src.user.interfaces.user import User
from datetime import datetime, timezone, timedelta
import jwt

# should be in .env, but for convenience we hard code
TOKEN_ACTIVE_TIME_IN_MINUTES = 1440 # 24 hours
ALGORITHM = "HS256"

class UserService:

    def __init__(self, _jwt_token: str = JWT_SECRET, _algorithm: str = ALGORITHM):

        self.jwt_token = _jwt_token
        self.algorithm = _algorithm

    def decode_jwt(self, token: str) -> Union[User, None]:
        """
        Decode a JWT into user data.
        """
        # decode
        try:
            decoded = jwt.decode(token, key=self.jwt_token, algorithms=self.algorithm)
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
        
        # we expect a UserInResponse object
        user_data = User(**decoded)
        return user_data

    def encode_jwt(self, user: User) -> str:
        """
        Encode user data into a JWT.
        """
        # create payload and add expiration time
        payload = user.dict()
        payload["exp"]: datetime.now(tz=timezone.utc) + timedelta(minutes=TOKEN_ACTIVE_TIME_IN_MINUTES)
        
        # encode
        encoded = jwt.encode(payload, key=self.jwt_token, algorithm=self.algorithm)
        return encoded

    def create_user_id(self) -> str:
        """
        Create a new user id.
        """
        return str(uuid4())
        