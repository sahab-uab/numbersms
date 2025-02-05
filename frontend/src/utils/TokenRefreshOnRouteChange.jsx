import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchingRefreshToken } from "../redux/authSlice";

const TokenRefreshOnRouteChange = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchingRefreshToken());
  }, [location, dispatch]);

  return null;
};

export default TokenRefreshOnRouteChange;
