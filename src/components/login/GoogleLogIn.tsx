import { signInWithPopup, GoogleAuthProvider, OAuthCredential } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebaseConfig";
import { logInInReducer } from "../../state/loginSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../state/store";

const providerGoogleAuth = new GoogleAuthProvider();

const GoogleLogIn: React.FunctionComponent = () => {
  const {user} = useSelector((state:RootState) => state.logged)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signInWithGoogleButton = () => {

    signInWithPopup(auth, providerGoogleAuth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential:OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);

      const token = credential!.accessToken;

      // The signed-in user info.
      //If the logged in is succesfull you will acces this part of the code where you will 
      //get a lot of information about the user that have logged in
      const user = result.user;

      /*Whit the information of the user you can populate an state that is mainly focused on 
        holding the information of the user that is logged in*/

      dispatch(logInInReducer({email: user.email, displayName: user.displayName, photoURL: user.photoURL}))
      navigate('/')

      // ...
    }).catch((error) => {

      //If the logged in is not succesfull yu will get to this part and with the message you can tell 
      //the user what went wrong


      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }


  return (
    <div className='m-3'>
      <button className="btn btn-primary" onClick={signInWithGoogleButton}>Log in with Google</button>
    </div>
  );
};

export default GoogleLogIn;
