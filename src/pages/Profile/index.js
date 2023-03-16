import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PendingRequestForm from "../../components/PendingRequestForm";
// import "./style.css";
import API from "../../utils/API";
import DataWindow from "../../components/DataWindow";
import ToolForm from "../../components/ToolForm";

const Profile = (props) => {
    const params = useParams();
    console.log(params);
    const [user, setUser] = useState({});
    const [isMyPage, setIsMyPage] = useState(false);
    useEffect(() => {
      const fetchUser = () => {
        API.getUserData(params.id, props.token).then((data) => {
          setUser(data);
          console.log(props.userId);
          if (props.userId === params.id) {
            setIsMyPage(true);
          } else {
            setIsMyPage(false);
          }
        });
      };

      fetchUser();
    }, [props.userId, params.id, props.token]);

    const [showToolForm, setShowToolForm] = useState(false);



    const [tools, setTools] = useState([]);
    const [shares, setShares] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
          const userTools = await API.getToolsByOwner(props.token);
          setTools(userTools);
        };

        fetchData();
      }, [props.token]);

    useEffect(() => {
      const fetchData = async () => {
        const userShares = await API.getSharesByUser(props.token);
        setShares(userShares);
      };

      fetchData();
    }, [props.token]);

    const userToolsList = (
        <ul>
            {tools.map((tool) => (
                <li key={tool.id}>{tool.toolname}</li>
            ))}
        </ul>
    );

    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const allShares = await API.getSharesByUser();
        const unconfirmedShares = allShares.filter(share => !share.confirmed);
        setPendingRequests(unconfirmedShares);
      }

      fetchData();
    }, []);

    const handleRequestConfirm = async (requestId) => {
      await API.confirmShareRequest(requestId);
      setPendingRequests(pendingRequests.filter(request => request.id !== requestId));
    };

    const handleRequestDeny = async (requestId) => {
      await API.denyShareRequest(requestId);
      setPendingRequests(pendingRequests.filter(request => request.id !== requestId));
    };

    
    const sharesAsBorrower = shares.filter((share) => share.Borrower_Id === API.currentUserId);
    const sharesAsLender = shares.filter((share) => share.Lender_Id === API.currentUserId);

    const sharesAsBorrowerList = (
        <ul>
            {sharesAsBorrower.map((share) => (
                <li key={share.id}>Date: {share.date}, Tool: {share.tool.toolname}, Lender: {share.Lender_Id} </li>
            ))}
        </ul>
    );

    const sharesAsLenderList = (
        <ul>
            {sharesAsLender.map((share) => (
                <li key={share.id}>Date: {share.date}, Tool: {share.tool.toolname}, Borrower: {share.Owner_Id} </li>
            ))}
        </ul>
    );

    return (
        <div className="Profile">
            {isMyPage && <button onClick={() => setShowToolForm(true)}>Add Tool</button>}
            <div>
            {pendingRequests.map(request => (
              <PendingRequestForm
                key={request.id}
                onRequestConfirm={() => handleRequestConfirm(request.id)}
                onRequestDeny={() => handleRequestDeny(request.id)}
            />
            ))}
            </div>
            <DataWindow 
              title="My Tools"
              dataList={userToolsList}
            />
            <DataWindow
              title="Shares as Borrower"
              content={sharesAsBorrowerList}
            />
            <DataWindow
              title="Shares as Lender"
              content={sharesAsLenderList}
            />
            {showToolForm && (
              <ToolForm
              userId={props.userId}
              closeForm={() => setShowToolForm(false)}
              />
            )}
        </div>
              
    );
};

export default Profile;