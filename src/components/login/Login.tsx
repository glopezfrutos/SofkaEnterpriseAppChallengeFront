import GoogleLogIn from './GoogleLogIn';
import MailLogin from './MailLogin';

const Login = () => {
  return (
    <div>
      <MailLogin />
      <GoogleLogIn />
    </div>
  );
};

export default Login;
