import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ToolForm from "../../components/ToolForm";
// import "./style.css";
import API from "../../utils/API";
import ToolArrangementForm from "../../components/ToolArrangement";

const Profile = (props) => {
  const params = useParams();
  console.log(params);
  const [user, setUser] = useState({});
  const [isMyPage, setIsMyPage] = useState(false);
  const fetchUser = () => {
    API.getUserData(params.id).then((data) => {
      setUser(data);
      console.log(props.userId);
      if (props.userId == params.id) {
        setIsMyPage(true);
      } else {
        setIsMyPage(false);
      }
    });

  };

};
export default Profile;