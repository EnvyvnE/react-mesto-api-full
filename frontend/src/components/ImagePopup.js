import closeBtn from '../images/close.svg';

function ImagePopup(props) {
  return (
    <section className={`popup popup_type_image-card ${props.card && 'popup_opened'}`}>
      <div className="popup__container-image">
        <img className="popup__image" src={props.card ? props.card.link : '#'} alt={props.card ? props.card.name : ''} />
        <p className="popup__title">{props.card ? props.card.name : ''}</p>
        <button className="popup__button popup__button_close" type="reset" onClick ={props.onClose}><img className="popup__close-image"
          src={closeBtn} alt="закрыть форму" /></button>
      </div>
    </section>
  )
}
export default ImagePopup;