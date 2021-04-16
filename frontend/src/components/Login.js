
import React from 'react';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.handleLogin({email,password});
    }
    return (
        <>
            <section className="auth">
                <form onSubmit={handleSubmit} className='auth__form'>
                    <h3 className="auth__heading">Вход</h3>
                    <input className='auth__input auth__input_email' onChange={handleEmailChange}  value={email || ''} placeholder='Email' name='email' type='email'></input>
                    <input className='auth__input auth__input_password' onChange={handlePasswordChange}  value={ password || '' } placeholder='Пароль' name='password' type='password'></input>
                    <button className='auth__btn auth__btn_submit' type="submit" >Войти</button>
                </form>
            </section>
        </>

    )
}
export default Login;