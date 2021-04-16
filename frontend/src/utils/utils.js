
//validation configuration variables
export const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input-item',
    submitButtonSelector: '.popup__button_add',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_state_invalid',
    errorClass: '.error',
};
export const escape = "Escape";
export const profileNameSelector = '.profile__name';
export const profileJobSelector= '.profile__job';
export const profileAvatarSelector= '.profile__avatar';
export const editBtn = document.querySelector('.profile__edit-btn');
export const addBtn = document.querySelector('.profile__add-btn');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileAvatarBtn = document.querySelector('.profile__avatar');
export const nameInput = document.querySelector('.popup__input-item_el_name');
export const jobInput = document.querySelector('.popup__input-item_el_job');
export const cardNameInput = document.querySelector('.popup__input-item_el_card-name');
export const cardLinkInput = document.querySelector('.popup__input-item_el_card-link');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupDeleteCard = document.querySelector('.popup_type_submit');
export const popupEditAvatar = document.querySelector('.popup_type_profile-image');
export const profileFormElement = popupEditProfile.querySelector('.popup__container');
export const profileAvatarInput = document.querySelector('.popup__input-item_el_avatar-link');
export const closeBtn = popupAddCard.querySelector('.popup__button_close');
export const saveBtn = popupAddCard.querySelector('.popup__button_add');
export const saveProfileAvatar = popupEditAvatar.querySelector('.popup__button_add');
export const saveProfileInfo = popupEditProfile.querySelector('.popup__button_add');
export const deleteButton = document.querySelector('.element__trash');
export const closeProfileBtn = popupEditProfile.querySelector('.popup__button_close');
export const cardsContainer = document.querySelector('.elements');
export const formElement = document.querySelector('.popup__container');
export const cardFormElement = popupAddCard.querySelector('.popup__container');
export const avatarFormElement = popupEditAvatar.querySelector('.popup__container')
export const popupCardImg = document.querySelector('.popup_type_image-card');
export const closeCardImg = popupCardImg.querySelector('.popup__button_close');
export const imagePopupPicture = popupCardImg.querySelector('.popup__image');
export const imagePopupTitle = popupCardImg.querySelector('.popup__title');
export const form = document.querySelector(".popup__container");
