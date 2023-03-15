import React from "react";
import { useParams } from "react-router-dom";
// import "./style.css";
import API from "../../utils/API";
import Toollist from "../../components/Toollist";

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
    useEffect(() => {
      fetchUser();
    }, [props.userId,params.id]);
    return (
        <div className="Profile">
            <h1>{user.username} profile:</h1>
            {isMyPage && <Tool token={props.token} fetchData={fetchUser}  role="create" />}
        </div>
    );
};

export default Profile;