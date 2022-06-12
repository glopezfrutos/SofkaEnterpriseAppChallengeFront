import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../state/store';

const Home = () => {
  const {user} = useSelector((state:RootState) => state.logged)

  const navigate = useNavigate()

  console.log(user);

  useEffect(()=> {
    if(user=== null){
      navigate('/logInGoogle')
    }
  }, [])
  
  return (
    <h1>Welcome you have logged in succesfully</h1>
  );
};

export default Home;