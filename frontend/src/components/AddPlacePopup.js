import PopupWithForm from './PopupWithForm';
import React from 'react';
function AddPlacePopup(props) {
   const [name,setCardName] = React.useState('');
   const [link,setCardLink] = React.useState('');
   function handleCardNameChange(e) {
    setCardName(e.target.value);
}
    function HandleCardLinkChange(e) {
    setCardLink(e.target.value);
}

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddCard({
            cardNameInput: name,
            cardLinkInput: link
        });
        setCardName('')
        setCardLink('')
    }
    return (
        <>
            <PopupWithForm onSubmit={handleSubmit} button='Сохранить' name='add-card' title='Новое место' isOpened={props.isOpened} onClose={props.onClose}>
                <input value ={name || ''} onChange={handleCardNameChange} id="input-card-name" name='cardNameInput' className="popup__input-item popup__input-item_el_card-name"
                    type="text" placeholder="Название" required minLength="2" maxLength="30" />
                <span id="input-card-name-error" className="error"></span>
                <input value = {link || ''} onChange={HandleCardLinkChange} id="input-link" name='cardLinkInput' className="popup__input-item popup__input-item_el_card-link" type="url"
                    placeholder="Ссылка на картинку" required />
                <span id="input-link-error" className="error"></span>
            </PopupWithForm>
        </>
    )
}
export default AddPlacePopup;