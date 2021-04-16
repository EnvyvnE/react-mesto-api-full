import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);


    return (
        <>
            <main className="main">
                <section className="profile">
                    <div className="profile__image">
                        <div className="profile__pencil"></div>
                        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={props.handleEditAvatarClick}></div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__title">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button type="button" className="profile__edit-btn" onClick={props.handleEditProfileClick}></button>
                        </div>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                    <button type="button" className="profile__add-btn" onClick={props.handleAddPlaceClick}></button>
                </section>
                <section className="elements">
                    {props.cards.map(item => (<Card onCardDelete ={props.onCardDelete}
                     onCardLike ={props.onCardLike} 
                     card = {item} 
                     handleSubmitDeleteClick={props.handleSubmitDeleteClick} 
                     handleCardClick={props.handleCardClick} 
                     key={item._id} 
                     {...item}/>))}
                </section>
            </main>
        </>
    )

}
export default Main;