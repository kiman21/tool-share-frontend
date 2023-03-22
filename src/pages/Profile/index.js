import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import PendingRequestForm from "../../components/PendingRequestForm";
import API from "../../utils/API";
import DataWindow from "../../components/DataWindow/DataWindow";
import ToolForm from "../../components/ToolForm";


const Profile = (props) => {
  console.log('Profile - token:', props.token);
  const params = useParams();
  console.log(params);
  const [user, setUser] = useState({});
  const [isMyPage, setIsMyPage] = useState(false);
  const fetchUserData = () => {
    API.getUserData(params.id, props.token).then((data) => {
      setUser(data);
      console.log("props.userId:", props.userId, "type:", typeof props.userId);
      console.log("params.id:", params.id, "type:", typeof params.id);
      console.log("Fetched user data:", data); 
      console.log(props.userId);
      if (props.userId === parseInt(params.id)) {
        setIsMyPage(true);
        console.log("isMyPage set to true");
      } else {
        setIsMyPage(false);
        console.log("isMyPage set to false");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, [props.userId, params.id, props.token]);

  const [showToolForm, setShowToolForm] = useState(false);

  const [tools, setTools] = useState([]);
  const fetchToolsData = useCallback(async () => {
    console.log("Token before tool API request:", props.token);
    const userTools = await API.getToolsByOwner(props.token) || [];
    setTools(userTools);
  }, [props.token]);


  const [shares, setShares] = useState([]);
  const [latestConfirmedShare, setLatestConfirmedShare] = useState(null);
  const [lenderUsername, setLenderUsername] = useState("");
  const [borrowerUsername, setBorrowerUsername] = useState("");

  const fetchSharesData = useCallback(async () => {
    console.log("Token before API request:", props.token);
    const userShares = await API.getSharesByUser(props.token) || [];
    const sharesWithToolDataAndUsers = await Promise.all(userShares.map(async share => {
      const lender = await API.getUserData(share.Lender_Id, props.token);
      const borrower = await API.getUserData(share.Borrower_Id, props.token);
      const tool = await API.getToolById(share.Tool_Id, props.token);
      return { ...share, lenderUsername: lender.username, borrowerUsername: borrower.username, tool };
    }));
    setShares(sharesWithToolDataAndUsers);

    const confirmedShares = sharesWithToolDataAndUsers.filter(share => share.confirmed);
    const latestShare = confirmedShares.reduce((latest, current) => {
      if (!latest) {
        return current;
      }

      const latestDate = new Date(latest.date);
      const currentDate = new Date(current.date);
      return latestDate > currentDate ? latest : current;
  }, null);
  setLatestConfirmedShare(confirmedShares.length > 0 ? { ...latestShare, currentusserId: props.userId } : null);  }, [props.token]);

  useEffect(() => {
    fetchToolsData();
  }, [fetchToolsData]);

  useEffect(() => {
    fetchSharesData();
  }, [fetchSharesData]);

  const handleSubmit = async (toolData) => {
    console.log("Token before toolCreate API request:", props.token);
    try {
      await API.createTool(toolData, props.token);
      fetchToolsData();
      fetchSharesData();
      setShowToolForm(false);
    } catch (error) {
      console.error("Failed to create tool:", error);
    }
  }

  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const allShares = await API.getSharesByUser(props.token) || [];
      const unconfirmedShares = allShares.filter(share => !share.confirmed);
      console.log("unconfirmed shares:", unconfirmedShares);
      setPendingRequests(unconfirmedShares);
    }
    fetchData(props.token);
  }, [props.token, props.userID]);

  const handleRequestConfirm = async (requestId) => {
    try {
      await API.confirmShareRequest(requestId, props.token);
      setPendingRequests(pendingRequests.filter(request => request.id !== requestId));
      fetchSharesData();
    } catch (error) {
      console.error('Failed to confirm request:', error);
    }
  };

  const handleRequestDeny = async (requestId) => {
    try {
      await API.denyShareRequest(requestId, props.token);
      setPendingRequests(pendingRequests.filter(request => request.id !== requestId));
      fetchSharesData();
    } catch (error) {
      console.error('Failed to deny request:', error);
    }
  };

  const sharesAsBorrower = shares.filter((share) => share.Borrower_Id === props.userId && share.confirmed);
  const sharesAsLender = shares.filter((share) => share.Lender_Id === props.userId && share.confirmed);

  

  const handleDeleteToolsButtonClick = async (tool) => {
    console.log("Token before deleteTool API request:", props.token);
    try {
      await API.deleteTool(tool.id, props.token);
      fetchUserData();
      fetchToolsData();
    } catch (error) {
      console.error('Failed to delete tool:', error);
    }

    console.log("Button clicked for tool:", tool);
  };

  const handleReturnToolButtonClick = async () => {
    if (latestConfirmedShare) {
      try {
        await API.returnTool(latestConfirmedShare.Tool_Id, true, props.token);
        setLatestConfirmedShare(null);
        fetchSharesData();
      } catch (error) {
        console.error('Failed to update tool availability:', error);
      }
    }
  };

  return (
      <div className="Profile">
          {isMyPage && <button className="button ml-20 mt-10" onClick={() => setShowToolForm(true)}>Add a Tool</button>}
          <div className="ml-10 mt-3">
          {showToolForm && (
            <ToolForm
            token={props.token}
            userId={props.userId}
            onSubmit={handleSubmit}
            closeForm={() => setShowToolForm(false)}
            />
          )}
          {pendingRequests.map(request => (
            <PendingRequestForm
              key={request.id}
              toolname={request.tool?.toolname}
              onClose={() => fetchSharesData()}
              onRequestConfirm={() => {
                handleRequestConfirm(request.id);
                fetchSharesData();
              }}
              onRequestDeny={() => {
                handleRequestDeny(request.id);
                fetchSharesData();
              }}
          />
          ))}
          </div>
          {latestConfirmedShare && (
            <div className="ml-20 mt-10 border-2 border-gray-700 max-w-2xl p-3">
              <h3 className="text-lg">Your current share:</h3>
              <p>Date: {new Date(latestConfirmedShare.date).toLocaleDateString()}</p>
              <p>Tool: {latestConfirmedShare && latestConfirmedShare.tool && latestConfirmedShare.tool.toolname}</p>
              {latestConfirmedShare && isMyPage && latestConfirmedShare.Borrower_Id === props.userId && (
                <button onClick={handleReturnToolButtonClick}>Return Tool</button>
              )}
            </div>
          )}
          <DataWindow 
            title="My Tools"
            dataList={tools}
            renderItem={(item) => (
              <>
                {item.toolname}
                <button className="small-button" onClick={() => handleDeleteToolsButtonClick(item)}>Delete Tool</button>
              </>
            )}
          />
          <DataWindow
            title="Shares as Borrower"
            dataList={sharesAsBorrower}
            renderItem={(item) => `Date: ${new Date(item.date).toLocaleDateString()}, Tool: ${item.tool?.toolname}, Lender: ${item.lenderUsername}`}
          />
          <DataWindow
            title="Shares as Lender"
            dataList={sharesAsLender}
            renderItem={(item) => `Date: ${new Date(item.date).toLocaleDateString()}, Tool: ${item.tool?.toolname}, Borrower: ${item.borrowerUsername}`}
          />
      </div>
            
  );
};

export default Profile;