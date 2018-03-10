import React from 'react';
import '../Styles/bootstrap-social.css';

const SocialMediaLogin = (props) => {
  const { googleLogin } = props;
  return (
    <div className="d-flex justify-content-between mt-1">
      <button type="button" className="btn btn-social btn-google" onClick={googleLogin}>
        <span className="fa fa-google" /> Sign in with Google
      </button>
    </div>
  );
};

export default SocialMediaLogin;
