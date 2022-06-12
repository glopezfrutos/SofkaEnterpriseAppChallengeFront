import GoogleLogIn from './GoogleLogIn';
import MailLogin from './MailLogin';

const Login = () => {
  return (
    <div className='card m-3'>
      <div className="card-body">
        <h3 className="card-title">Do you have an account?</h3>
        <div className="card-text">
          <div className='row'>
            <div className="card col m-3">
              <div className="card-body">
                <h5 className="card-subtitle mb-2 text-muted">Log in with your email</h5>
                <div className="card-text"><MailLogin /> </div>
              </div>
            </div>
            <div className="card col m-3">
              <div className="card-body">
                <h5 className="card-subtitle mb-2 text-muted">Login with Google</h5>
                <GoogleLogIn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >

  );
};

export default Login;
