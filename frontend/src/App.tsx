import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { useLinkPreview } from "get-link-preview";
import axios from "axios";

import "./App.css";
import LinkCard from "./components/LinkCard";

interface Card {
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
const BACKEND_HOST = "http://localhost:8000";
const BACKEND_CREATE_OR_AUTH_ENDPOINT = BACKEND_HOST + "/user/create_or_auth";
const BACKEND_GET_ALL_LINKS_ENDPOINT = BACKEND_HOST + "/link/get_all_links";

function App() {
  // ================== states ===================
  const [cardList, setCardList] = useState<Card[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);

  // =============== functions ===================
  const handleEditContent = (linkId: string) => {};

  const handleDeleteCard = (linkId: string) => {};

  // ================ hooks ======================
  /**
   * Initialize user state.
   */
  useEffect(() => {
    // fetch jwt and user data from backend
    axios
      .post(BACKEND_CREATE_OR_AUTH_ENDPOINT)
      .then((response) => {
        setUser(response.data.user);
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
      // fetch card list from backend
      axios
        .get(`${BACKEND_GET_ALL_LINKS_ENDPOINT}/${user.user_id}`)
        .then((response) => {
          setCardList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error("User not initialized");
    }
  }, [user]);

  // =============== UI components ===============

  return (
    <div className="App">
      <header className="App-header">
        {cardList.map((card) => (
          <LinkCard
            url={card.url}
            user_description={card.description}
            last_updated={card.last_updated}
            handleEditContent={() => handleEditContent(card.link_id)}
            handleDeleteCard={() => handleDeleteCard(card.link_id)}
          />
        ))}
      </header>
    </div>
  );
}

export default App;
