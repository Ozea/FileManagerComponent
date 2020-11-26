import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const Password = props => {
  const { i18n } = window.GLOBAL.App;
  const [state, setState] = useState({
    hidePassword: false,
    generatedPassword: ''
  });

  useEffect(() => {
    if (props.defaultValue && !state.generatedPassword) {
      setState({ ...state, generatedPassword: props.defaultValue });
    }
  }, [props.defaultValue]);

  const hidePasswordHandler = () => {
    setState({ ...state, hidePassword: !state.hidePassword });
  }

  const generatePassword = () => {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    let stringLength = 10;
    let result = '';

    for (var i = 0; i < stringLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      result += chars.substr(randomNumber, 1);
    }

    setState({ ...state, generatedPassword: result });
  }

  const passwordInputHandler = value => {
    setState({ ...state, generatedPassword: value });
  }

  return (
    <div className="form-group">
      <label htmlFor="password">
        {i18n.Password} /
          <button type="button" className="generate-password" onClick={() => generatePassword()}>
          {i18n.Generate}
        </button>
      </label>
      <div className="password-wrapper">
        <input
          type={state.hidePassword ? 'password' : 'text'}
          className="form-control"
          id={`password_${props.index}`}
          name={props.name}
          value={state.generatedPassword}
          onChange={event => passwordInputHandler(event.target.value)} />
        <button type="button" onClick={() => hidePasswordHandler()}>
          {state.hidePassword ?
            <span className="eye-slash"><FontAwesomeIcon icon="eye-slash" /></span> :
            <span className="eye"><FontAwesomeIcon icon="eye" /></span>}
        </button>
      </div>
    </div>
  );
}

export default Password;