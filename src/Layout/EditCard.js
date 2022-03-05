import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import CardForm from "./CardForm";
import Header from "./Header";


function EditCard({ decks, loadDecks }){
    const [deckName, setDeckName] = useState("");

    const { deckId, cardId } = useParams();

    useEffect(() => {
      async function loadDeck(){
        const deck = decks.filter((deck) => deck.id === parseInt(deckId));
        setDeckName(deck[0].name);
      }
      loadDeck();
      }, [cardId, deckId, decks]) 

    return (
        <div>
            <Header />
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
              </ol>
            </nav>
            <h3>Edit Card</h3>
            <CardForm loadDecks={loadDecks}/>
        </div>
    );
}

export default EditCard;