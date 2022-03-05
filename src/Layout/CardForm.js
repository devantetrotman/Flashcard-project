import React, {useState, useEffect} from "react";
import {useHistory, useParams, useLocation} from "react-router-dom";
import {readCard, updateCard, createCard} from "../utils/api";

function CardForm({loadDecks}){
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [edit, setEdit] = useState(null);

    const location = useLocation();
    const history = useHistory();
    const { deckId, cardId } = useParams();

    useEffect(() => {
      async function loadCard(){
        if (location.pathname.includes("/edit")){
            const card = await readCard(cardId);
            setFront(card.front);
            setBack(card.back);
            setEdit(true)

        }
        else{
            setFront("Front side of card");
            setBack("Front side of card");
            setEdit(false);
        }
      }
      loadCard();
      }, [cardId, location.pathname])

    async function handleCardEditSubmit(e){
        e.preventDefault();
        await updateCard({ front: front, back: back, id: cardId, deckId: Number(deckId)});
        await loadDecks();
        history.push(`/decks/${deckId}`);
    }

    async function handleCardCreateSubmit(e){
        e.preventDefault();
        await createCard(deckId, { front: front, back: back});
        await loadDecks();
        window.alert("Card Created!");
        setFront("Front side of card");
        setBack("Back side of card");
    }


    return(
        <div>
                <form onSubmit={edit ? handleCardEditSubmit : handleCardCreateSubmit}>
                    <label for="front">Front</label>
                    <textarea className="col-12" value={front} onChange={(e) => setFront(e.target.value)} name="front">{front}</textarea>
                    <label for="back">Back</label>
                    <textarea className="col-12" value={back} onChange={(e) => setBack(e.target.value)} name="back">{back}</textarea>
                    <button className="btn btn-success m-3" type="submit">Save</button>
                    <button className="btn btn-warning m-3" onClick={() => history.push(`/decks/${deckId}`)}>{edit ? "Cancel" : "Done"} </button>
                </form>
        </div>
    );
}

    export default CardForm;