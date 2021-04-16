import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpened, onClose, onUpdateUser }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    
    const currentUser = React.useContext(CurrentUserContext);
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            profileNameInput: name,
            profileJobInput: description,
        });
 
    }
    React.useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser]);
    return (
        <>
            <PopupWithForm onSubmit={handleSubmit} button='Сохранить' name='edit' title='Редактировать профиль' 
            isOpened={isOpened} onClose={onClose}>
                <input value={name || ''}  onChange={handleNameChange}  placeholder="Имя" id="input-name" 
                name='profileNameInput' className="popup__input-item popup__input-item_el_name" type="text"
                    required minLength="2" maxLength="40" />
                <span id='input-name-error' className="error"></span>
                <input value={description || ''} onChange={handleDescriptionChange} placeholder="Вид деятельности"
                 id='job-input' name='profileJobInput' className="popup__input-item popup__input-item_el_job" type="text"
                    required minLength="2" maxLength="40" />
                <span id='job-input-error' className="error"></span>
            </PopupWithForm>
        </>
    )
}

export default EditProfilePopup
