import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchingRefreshToken } from "../redux/authSlice";

const TokenRefreshOnRouteChange = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // This hook gives us the current location (path, search, etc.)

  useEffect(() => {
    // Call the refresh token action when the route changes
    dispatch(fetchingRefreshToken());
  }, [location, dispatch]); // Trigger effect whenever location changes (i.e., on route change)

  return null; // This component doesn't render anything, it just triggers the effect
};

export default TokenRefreshOnRouteChange;
