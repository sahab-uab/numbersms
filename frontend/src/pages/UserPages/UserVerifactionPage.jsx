import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserSmsFetching } from "../../redux/getUserSmsHistorySlice";

const UserVerifactionPage = () => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.smsHistory);
  console.log(items);

  useEffect(() => {
    dispatch(UserSmsFetching());
  }, [dispatch]);
  return <div>UserVerifactionPage</div>;
};

export default UserVerifactionPage;
