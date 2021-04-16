import closeBtn from '../images/close.svg';
import success from '../images/success.png';
import failed from '../images/failed.png'

function AlertPopup(props) {

  return (
    <section className={`popup popup_type_alert-succes ${props.isOpened && 'popup_opened'}`}>
      <div className='popup__container popup__container_alert'>
        <img className="popup__alert_success-img" src={props.state ? success : failed} alt='' />
        <p className="popup__title popup__title_black">{props.state ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        <button className="popup__button popup__button_close" type="reset" onClick={props.onClose}><img className="popup__close-image"
          src={closeBtn} alt="закрыть форму" /></button>
      </div>
    </section>
  )
}
export default AlertPopup;