import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import LinkCard from "./components/LinkCard";
import {
  Button,
  Card,
  Paper,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface CardInterface {
  user_id: string;
  link_id: string;
  url: string;
  description: string;
  last_updated: string;
}

interface User {
  user_id: string;
}

// constants
// constants
// const BACKEND_HOST =
//   "http://ec2-18-181-180-50.ap-northeast-1.compute.amazonaws.com";
const BACKEND_HOST = "http://localhost:8000";
const BACKEND_CREATE_OR_AUTH_ENDPOINT = BACKEND_HOST + "/user/create_or_auth";
const BACKEND_GET_ALL_LINKS_ENDPOINT = BACKEND_HOST + "/link/get_all_user";
const BACKEND_CREATE_CARD_ENDPOINT = BACKEND_HOST + "/link/create";
const BACKEND_UPDATE_CARD_ENDPOINT = BACKEND_HOST + "/link/update";
const BACKEND_DELETE_CARD_ENDPOINT = BACKEND_HOST + "/link/delete";

function App() {
  // ================== states ===================
  const [cardList, setCardList] = useState<CardInterface[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [url, setUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);
  const [popUpUrl, setPopUpUrl] = useState<string>("");
  const [popUpDescription, setPopUpDescription] = useState<string>("");
  const [popUpLinkId, setPopUpLinkId] = useState<string>("");

  // =============== functions ===================
  const handleEditContent = (linkId: string) => {
    // find the card with the linkid
    const card = cardList.find((card) => card.link_id === linkId);
    if (card) {
      setPopUpUrl(card.url);
      setPopUpDescription(card.description);
      setPopUpOpen(true);
      setPopUpLinkId(linkId);
    }
  };

  const handleSaveEdit = () => {
    // axios post to update
    axios
      .put(
        BACKEND_UPDATE_CARD_ENDPOINT,
        {
          link_id: popUpLinkId,
          url: popUpUrl,
          description: popUpDescription,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // update the card list
        const newCardList = cardList.map((card) => {
          if (card.link_id === popUpLinkId) {
            return {
              ...card,
              url: popUpUrl,
              description: popUpDescription,
            };
          }
          return card;
        });
        setCardList(newCardList);
        setPopUpOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteCard = (linkId: string) => {
    // axios post to delete
    axios
      .delete(BACKEND_DELETE_CARD_ENDPOINT + "/" + linkId, {
        withCredentials: true,
      })
      .then((res) => {
        // update the card list
        const newCardList = cardList.filter((card) => card.link_id !== linkId);
        setCardList(newCardList);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddCard = (url: string, description: string) => {
    if (url.length === 0) {
      console.error("No url");
      return;
    }
    console.log(url, description);
    axios
      .post(
        BACKEND_CREATE_CARD_ENDPOINT,
        {
          url: url,
          description: description,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const newCardList = [...cardList];
        newCardList.push(response.data);
        setCardList(newCardList);
        setUrl("");
        setDescription("");
      })
      .catch((err) => {
        console.log("error");
      });
  };

  // ================ hooks ======================
  /**
   * Initialize user state.
   */
  useEffect(() => {
    // fetch jwt and user data from backend
    axios
      .get(BACKEND_CREATE_OR_AUTH_ENDPOINT, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        console.log("user", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /**
   * Initalize card list.
   */
  useEffect(() => {
    if (user) {
      console.log(BACKEND_GET_ALL_LINKS_ENDPOINT);
      // fetch card list from backend
      axios
        .get(BACKEND_GET_ALL_LINKS_ENDPOINT, {
          withCredentials: true,
        })
        .then((response) => {
          setCardList(response.data);
          console.log("card list", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error("User not initialized");
    }
  }, [user]);

  // =============== UI components ===============
  const inputCard = (
    <Card style={{ minWidth: "100%" }}>
      <CardHeader
        title={<Typography variant="h5">Add a new link</Typography>}
      />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            variant="outlined"
            label="URL"
            onChange={(event) => {
              event.target.value && setUrl(event.target.value);
            }}
            size={"small"}
          />
          <TextField
            variant="outlined"
            label="Description"
            multiline
            minRows={3}
            onChange={(event) => {
              event.target.value && setDescription(event.target.value);
            }}
            size={"small"}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={(event) => handleAddCard(url, description)}>
          Add link
        </Button>
      </CardActions>
    </Card>
  );

  /**
   * Popup card for edit
   */
  const popUpCard = (
    <Card style={{ minWidth: "80%" }}>
      <CardHeader title={<Typography variant="h5">Edit card</Typography>} />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            variant="outlined"
            label="URL"
            value={popUpUrl}
            onChange={(event) => {
              event.target.value && setPopUpUrl(event.target.value);
            }}
            size={"small"}
          />
          <TextField
            variant="outlined"
            label="Description"
            multiline
            minRows={3}
            value={popUpDescription}
            onChange={(event) => {
              event.target.value && setPopUpDescription(event.target.value);
            }}
            size={"small"}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={(event) => handleSaveEdit()}>Save</Button>
      </CardActions>
    </Card>
  );

  return (
    <div className="App">
      <header className="App-header">
        {!popUpOpen ? (
          <Stack
            minWidth={"80%"}
            spacing={6}
            alignContent={"space-around"}
            padding={"32px"}
          >
            {inputCard}
            <Paper
              style={{
                minHeight: "400px",
                padding: "12px",
                paddingBottom: "12px",
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h5">Your saved links</Typography>
                <Stack spacing={2}>
                  {cardList.map((card) => (
                    <LinkCard
                      key={card.link_id}
                      url={card.url}
                      user_description={card.description}
                      last_updated={card.last_updated}
                      handleEditContent={() => handleEditContent(card.link_id)}
                      handleDeleteCard={() => handleDeleteCard(card.link_id)}
                    />
                  ))}
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        ) : (
          popUpCard
        )}
      </header>
    </div>
  );
}

export default App;
