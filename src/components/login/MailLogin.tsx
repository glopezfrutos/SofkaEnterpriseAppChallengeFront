import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { logInInReducer } from '../../state/loginSlice';
import { RootState } from '../../state/store';

const MailLogin = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const { user } = useSelector((state: RootState) => state.logged)
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const logInForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    if (userName && password) {
      signInWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
          // Logged in
          //If the logged in is succesfull you will acces this part of teh code where you will 
          //get a lot of information about the user that have logged in
          const user = userCredential.user;

          console.log('**** user credentials ****');
          console.log(userCredential);
          console.log('**** user ***');
          console.log(user)

          /*Whit the information of the user you can populate an state that is mainly focused on 
          holding the information of the user that is logged in*/
          dispatch(logInInReducer(user.email))
          navigate('/')
        })
        .catch((error) => {

          //If the logged in is not succesfull yu will get to this part and with the message you can tell 
          //the user what went wrong
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('*** Log in error ***');
          console.log(errorMessage);
        });

      setPassword('')
      setUserName('')
    }
  }

  return (
    <div>
      <h1>Log In</h1>
      <form>
        <label htmlFor="username">Username</label><br />
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          name="username"
          value={userName}
        /><br />
        <label htmlFor="password">Password</label><br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          value={password}
        /><br />
        <button onClick={(e) => logInForm(e)}>Log In</button><br />
      </form>
    </div>
  );
};

export default MailLogin