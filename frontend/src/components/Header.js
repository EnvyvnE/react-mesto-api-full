import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <>
            <header className="header">
                <img src={logo} alt="Логотип 'Место' " className="header__logo" />
                {props.state && (<div className='header__nav'>
                <span className='header__username'>{props.userName}</span>
                    <Link className='header__link' to="/" onClick={props.handleLogout}>Выйти</Link>
                </div>)}
                {!props.state && props.registerState && (<Link className='header__link' onClick={props.handleRegisterState} to='/sign-in'>Войти</Link>)}
                {!props.state && !props.registerState && (<Link className='header__link' onClick={props.handleRegisterState} to='/sign-up'>Зарегистрироваться</Link>)}



            </header>
        </>
    )
}
export default Header;