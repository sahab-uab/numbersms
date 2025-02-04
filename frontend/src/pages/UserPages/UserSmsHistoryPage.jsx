import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSmsFetching } from "../../redux/getUserSmsHistorySlice";

const UserSmsHistoryPage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.smsHistory);
  console.log(data);

  useEffect(() => {
    dispatch(UserSmsFetching());
  }, [dispatch]);

  return <div>UserSmsHistoryPage</div>;
};

export default UserSmsHistoryPage;
