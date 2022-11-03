from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.constants import FRONTEND_HOST, HOST, PORT
from src.user.routes.crud_routes import router as user_router
from src.link.routes.crud_routes import router as link_router
import uvicorn

# app
app = FastAPI()

# cors middleware
app.add_middleware(
        CORSMiddleware,
        allow_origins=[FRONTEND_HOST],  
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )

# add routers
app.include_router(
    link_router,
    prefix="/link",
)

app.include_router(
    user_router,
    prefix="/user",
)

# sanity
@app.get("/")
def root():
    return {"message": "Hello World from backend service :-)!"}

if __name__ == "__main__":

    # start app
    uvicorn.run("src.main:app", host=HOST, port=PORT, reload=True)
    print("backend started.")

    # update db
    from src.db.db import db