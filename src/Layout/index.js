import React, {useState, useEffect, useCallback} from "react";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";
import {Route, Switch} from "react-router-dom";
import NewDeck from "./NewDeck";
import Decks from "./Decks";
import Cards from "./Cards";
import AddCard from "./AddCard";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";



function Layout() {
  const [decks, setDecks] = useState([]);

  const loadDecks = useCallback(async() => {
    const theDecks = await listDecks();
    setDecks(theDecks);
  }, [])

  useEffect(() => {
    loadDecks();
  }, [loadDecks])

  return (
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Decks decks={decks} loadDecks={loadDecks} />
          </Route>
          <Route path="/decks/new">
            <NewDeck decks={decks} loadDecks={loadDecks}/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Cards decks={decks} loadDecks={loadDecks}/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard decks={decks} loadDecks={loadDecks}/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard decks={decks} loadDecks={loadDecks}/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck decks={decks} loadDecks={loadDecks}/>
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck decks={decks} loadDecks={loadDecks}/>
          </Route>
          <Route exact path="*">  
            <NotFound />
          </Route>
        </Switch>
      </div>
  );
}

export default Layout;
