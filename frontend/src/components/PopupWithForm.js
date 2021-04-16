import closeBtn from '../images/close.svg';

function PopupWithForm(props) {

    return (
        <section className={`popup popup_type_${props.name} ${props.isOpened && 'popup_opened'}`}>
            <form onSubmit={props.onSubmit} name={`${props.name}-popup`} className="popup__container" noValidate>
                <h3 className="popup__heading">{props.title}</h3>
                {props.children}
                <button className="popup__button popup__button_add"  type="submit" >{props.button}</button>
                <button className="popup__button popup__button_close" type="reset" onClick={props.onClose}><img className="popup__close-image"
                    src={closeBtn} alt="закрыть форму" /></button>
            </form>
        </section>
    )
}

export default PopupWithForm