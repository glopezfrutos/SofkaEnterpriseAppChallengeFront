import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../../firebaseConfig'


const SignIn = () => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const signInForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (password && userName) {
      createUserWithEmailAndPassword(auth, userName, password)
        .then((userCredential) => {
          // Signed in
          //If the logged in is succesfull you will acces this part of teh code where you will 
          //get a lot of information about the user that have logged in
          const user = userCredential.user;
          console.log("****user****");

          console.log(user);
          /*Whit the information of the user you can populate an state that is mainly focused on 
          holding the information of the user that is logged in*/

          // ...
        })
        .catch((error) => {

          //If the logged in is not succesfull yu will get to this part and with the message you can tell 
          //the user what went wrong
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('*** sign in error ***');
          console.log(errorMessage);
          // ..
        });

      setUserName('')
      setPassword('')
    }
  }

  return (
    <div className='card m-3'>
      <div className="card-body">
        <h3 className="card-title">Sign In</h3>
        <div className="card-text">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label><br />
              <input
                onChange={(e) => setUserName(e.target.value)}
                type="email"
                className="form-control"
                name="username"
                value={userName}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label><br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                name="password"
                value={password}
              />
            </div>
            <button type="submit" className="btn btn-primary col" onClick={(e) => signInForm(e)}>Sign in</button><br />
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
