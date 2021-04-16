import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash' : 'element__trash_disabled'}`
      ); 
    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : 'element__like_inactive'}`; 

    function onCardClick() {
        props.handleCardClick(props)
    }


    function handleLikeClick(){
        props.onCardLike(props.card);
    }

    function handleDeleteClick(){
        props.onCardDelete(props.card);
    }
    return (
        <div className="element" >
            <img className="element__image" src={props.link} alt={props.name} onClick={onCardClick} />
            <button type="button"  className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="element__info">
                <h2 className="element__place">{props.name}</h2>
                <div className="element__like-div">
                    <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
                    <p className="element__counter">{props.likes.length}</p>
                </div>
            </div>
        </div>
    )
}
export default Card;