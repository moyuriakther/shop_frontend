export default function useAuth() {
  //   const auth = useSelector((state) => state.auth);
  const user = window.localStorage.getItem("userInfo");
  const token = JSON.parse(user);
  //   if (auth?.accessToken && auth?.user)
  if (token) {
    return true;
  } else {
    return false;
  }
}
