import { useDispatch, useSelector } from "react-redux";
import { loginUser, logOut } from "../redux/features/user-account";

const useUser = () => {
  const { isLoggedIn, value } = useSelector(
    (state) => state?.userAccountReducer
  );
  const userInfo = value;
  const dispatch = useDispatch();

  const setLoginData = (userData) => {
    dispatch(loginUser(userData));
  };

  const deleteLoginData = () => {
    dispatch(logOut());
  };

  return { userInfo, isLoggedIn, setLoginData, deleteLoginData };
};

export default useUser;
