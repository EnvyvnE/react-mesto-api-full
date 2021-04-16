import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({isOpened,onClose,onUpdateAvatar}) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            cardAvatarLinkInput: avatarRef.current.value
        });
    }
 
    return (
        <>
            <PopupWithForm onSubmit={handleSubmit} button='Сохранить' name='profile-image' title='Обновить аватар' isOpened={isOpened} onClose={onClose}>
                <input ref={avatarRef} id="input-avatarLink" name='cardAvatarLinkInput' className="popup__input-item popup__input-item_el_avatar-link" type="url"
                    placeholder="https://somewebsite.com/someimage.jpg" required />
                <span id="input-avatarLink-error" className="error"></span>

            </PopupWithForm>
        </>
    )
}
export default EditAvatarPopup;