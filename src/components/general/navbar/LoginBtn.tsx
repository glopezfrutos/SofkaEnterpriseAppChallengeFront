import { useDispatch, useSelector } from 'react-redux';
import { toggleLogged } from '../../../store/loginSlice';
import { stateType } from '../../../store/store';


const Logged = () => {

  const logged = useSelector((state:stateType) => state.logged)

  const dispatch = useDispatch() 

  const toggleLogButton = () => {
    dispatch(toggleLogged())
  }
  

  return (
    <button className='btn btn-light nav-item' onClick={toggleLogButton}>{logged?'Log out':'Log in'}</button>
  );
};

export default Logged;
