import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { Socket } from './Socket';
import { User } from './User';
import Landing from "./Landing"
// eslint-disable-next-line react/prop-types
export default function Login({ userID }) {
  const history = useHistory();

  const onSuccess = (response) => {
    Socket.emit('oauth to server', {
      userID: { userID }.userID,
      imgurl: response.profileObj.imageUrl,
      name: response.profileObj.name,
      email: response.profileObj.email,
      socketID: Socket.id,
    });

    Socket.emit('google login', {
      token: response.getAuthResponse().id_token,
    });

    const profile = response.getBasicProfile();
    User.current = new User(
      profile.getName(),
      profile.getEmail(),
      profile.getImageUrl(),
    );

    history.push('/home');
  };

  React.useEffect(() => {
    Socket.on('successful login', (data) => {
      User.current = new User(
        data.name,
        data.email,
        data.profile_picture,
        data.bio,
      );
    });
  }, []);
  return (
    <div className="google-login-page">
      <div className="login-page-upper">
        <div className="login-container">
          <img className="highlander" src="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fncaa%2F500%2F2885.png" alt="" />
          <GoogleLogin
            clientId="163716708396-talgj01aee74s8l35iv4opmpac915v0g.apps.googleusercontent.com"
            render={(renderProps) => (
              <button className="login-button" type="button" onClick={renderProps.onClick} disabled={renderProps.disabled}>LOGIN</button>
            )}
            buttonText="Login"
            onSuccess={onSuccess}
            cookiePolicy="single_host_origin"
            isSignedIn={true}
            // hostedDomain="njit.edu"
          />
        </div>
      </div>
      <Landing />
    </div>
  );
}
