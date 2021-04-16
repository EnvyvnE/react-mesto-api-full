class Api {
    constructor({
        address,
        token
    }) {
        this._address = address;
        this._token = token;
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
        return res.json();
    }
    getUserInfo(jwt) {
        return fetch(`${this._address}/users/me`, {
            headers: {
                authorization: `Bearer ${jwt}`,
            }
        })
            .then(this._getResponseData);

    }
    getInitialCards(jwt) {
        return fetch(`${this._address}/cards`, {
            headers: {
                authorization: `Bearer ${jwt}`,
            }
        })
            .then(this._getResponseData);

    }


    patchUserInfo(data,jwt) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.profileNameInput,
                about: data.profileJobInput
            })

        })
            .then(this._getResponseData);
    }

    patchAvatar(data,jwt) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.cardAvatarLinkInput
            })

        })
            .then(this._getResponseData);
    }

    postNewCard(data,jwt) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.cardNameInput,
                link: data.cardLinkInput
            })

        })
            .then(this._getResponseData);

    }
    removeCard(id,jwt) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${jwt}`,
            }
        })
            .then(this._getResponseData);
    }
    _addLike(id,jwt) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${jwt}`,
            }
        })
            .then(this._getResponseData);
    }
    _removeLike(id,jwt) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${jwt}`,
            }
        })
            .then(this._getResponseData);
    }
    changeLikeCardStatus(id, state , jwt){
        return state ? this._addLike(id,jwt) : this._removeLike(id,jwt);
    }

}
const api = new Api({
    address: 'http://localhost:3000'
});
export default api;