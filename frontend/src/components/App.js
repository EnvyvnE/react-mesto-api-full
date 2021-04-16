import React from 'react';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth';
import AlertPopup from './AlertPopup';

function App() {
    const [isEditAvatarOpened, setIsEditAvatarOpened] = React.useState(false);
    const [isEditProfileOpened, setIsEditProfileOpened] = React.useState(false);
    const [isAddPlaceOpened, setIsAddPlaceOpened] = React.useState(false);
    const [isSubmitDeleteOpened, setIsSubmitDeleteOpened] = React.useState(false);
    const [isAlertPopupOpened, setIsAlertPopupOpened] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUserInfo] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(null);
    const [registerStatus, setRegisterStatus] = React.useState(false)
    const [registerState, setRegisterState] = React.useState(false);
    const [userName, setUsername] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const history = useHistory();


    function handleEditAvatarClick() {
        setIsEditAvatarOpened(true);
    }
    function handleSetRegisterState() {
        setRegisterState(!registerState);
    }

    function handleEditProfileClick() {
        setIsEditProfileOpened(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlaceOpened(true);
    }
    function handleSubmitDeleteClick() {
        setIsSubmitDeleteOpened(true);
    }
    function closeAllPopups() {
        setIsEditAvatarOpened(false);
        setIsEditProfileOpened(false);
        setIsAddPlaceOpened(false);
        setSelectedCard(null);
        setIsSubmitDeleteOpened(false);
        setIsAlertPopupOpened(false);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function handleUpdateUser(data) {
        const jwt = localStorage.getItem('jwt');

        api.patchUserInfo(data, jwt)
            .then((currentUser) => {
                setCurrentUserInfo(currentUser.data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });

    }
    function handleUpdateAvatar(data) {
        const jwt = localStorage.getItem('jwt');

        api.patchAvatar(data, jwt)
            .then((currentUser) => {
                setCurrentUserInfo(currentUser.data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleAddCard(data) {
        const jwt = localStorage.getItem('jwt');

        api.postNewCard(data, jwt)
            .then((newCard) => {
                setCards([newCard.data, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleCardLike(card) {
        const jwt = localStorage.getItem('jwt');
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked, jwt)
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleCardDelete(card) {
        const jwt = localStorage.getItem('jwt');

        api.removeCard(card._id, jwt)
            .then(() => {
                const newCards = cards.filter((c) => {
                    return c._id !== card._id
                })
                setCards(newCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    function handleRegister(data) {
        auth.register(data)
            .then((res) => {
                if (res.data) {
                    setIsAlertPopupOpened(true);
                    setRegisterStatus(true);
                    history.push('/sign-in');
                    setRegisterState(false);
                } else {
                    setIsAlertPopupOpened(true);
                    setRegisterStatus(false);
                    setRegisterState(true);
                }

            })
            .catch((err) => {
                console.log(err);
            })
    }
    function handleLogin(data) {
        auth.authorize(data)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                    setLoggedIn(true);
                    setUsername(data.email);
                    history.push('/');

                } else {
                    setLoggedIn(false);
                    setIsAlertPopupOpened(true);
                    setRegisterStatus(false);
                    setRegisterState(false);
                }
            })

            .catch((err) => {
                console.log(err);
            })
    }
    function handleLogout() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }
    function handleTokenCheck(jwt) {
        auth.checkToken(jwt)
            .then((res) => {
                setUsername(res.data.email)
                if (res) {
                    setLoggedIn(true);
                    history.push('/');
                }
            })

    }

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            handleTokenCheck(jwt);

        }
        // eslint-disable-next-line
    }, []);


    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {

            Promise.all([
                api.getInitialCards(jwt),
                api.getUserInfo(jwt),
            ])
                .then(([initialCards, currentUser]) => {
                    setCards(initialCards.data);
                    setCurrentUserInfo(currentUser.data);

                })

                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);



    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header userName={userName} handleLogout={handleLogout} handleRegisterState={handleSetRegisterState} registerState={registerState} state={loggedIn} />

                <Switch>
                    {/* HOC - component */}
                    <ProtectedRoute exact path='/' component={Main} loggedIn={loggedIn} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
                        handleSubmitDeleteClick={handleSubmitDeleteClick} handleCardClick={handleCardClick} handleEditAvatarClick={handleEditAvatarClick}
                        handleAddPlaceClick={handleAddPlaceClick} handleEditProfileClick={handleEditProfileClick} />

                    <Route path='/sign-up'>
                        <Register handleRegister={handleRegister} />
                    </Route>
                    <Route path='/sign-in'>
                        <Login handleLogin={handleLogin} />
                    </Route>
                </Switch>

                <Footer />

                {/* Popups components */}
                <AlertPopup state={registerStatus} isOpened={isAlertPopupOpened} onClose={closeAllPopups} />
                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpened={isEditProfileOpened} onClose={closeAllPopups} />
                <AddPlacePopup onAddCard={handleAddCard} isOpened={isAddPlaceOpened} onClose={closeAllPopups} />
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpened={isEditAvatarOpened} onClose={closeAllPopups} />
                <PopupWithForm button='Да' name='submit' title='Вы уверены?' isOpened={isSubmitDeleteOpened} onClose={closeAllPopups} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
