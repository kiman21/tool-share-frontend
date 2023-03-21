const URL_PREFIX = "https://tool-share-back.herokuapp.com";

const API = {
    getUserData:(id, token) =>{
        console.log('API - getUserData - token:', token);
        return fetch(`${URL_PREFIX}/api/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                },
        }).then(res=>res.json());
    },
    isValidToken: (token) => {
        console.log('API - isValidToken - token:', token);
        return fetch(`${URL_PREFIX}/api/users/isValidToken`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    },
    getAllUsers: () => {
        return fetch(`${URL_PREFIX}/api/users`).then((res) => res.json());
      },
    login: (loginObj) => {
        return fetch(`${URL_PREFIX}/api/users/login`, {
            method: "POST",
            body: JSON.stringify(loginObj),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    },
    signup: (signupObj) => {
        return fetch(`${URL_PREFIX}/api/users/`, {
            method: "POST",
            body: JSON.stringify(signupObj),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json());
    },
    getAllTools: () => {
        return fetch(`${URL_PREFIX}/api/tools`).then((res) => res.json());
    },
    createTool: (toolObj, token) => {
        console.log('API - createTool - token:', token);
        return fetch(`${URL_PREFIX}/api/tools`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(toolObj),
        }).then((res) => res.json());
    },
    getToolsByOwner: (token) => {
        if (!token) {
            console.error("Token is undefined in getSharesByUser");
            return;
          }
        console.log("Token inside getToolsByOwner:", token);
        return fetch(`${URL_PREFIX}/api/tools/ownerTools`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
    },
    getAvailableTools: () => {
        return fetch(`${URL_PREFIX}/api/tools/availableTools`).then((res) => res.json());
    },
    getToolById: (toolid) => {
        return fetch(`${URL_PREFIX}/api/tools/${toolid}`).then((res) => res.json());
    },
    getToolsByType: (toolid) => {
        return fetch(`${URL_PREFIX}/api/tools/bytype/${toolid}`).then((res) => res.json());
    },
    borrowTool: (toolObj, toolid) => {
        return fetch(`${URL_PREFIX}/api/tools/borrow/${toolid}`, {
          method: "PUT",
          body: JSON.stringify(toolObj),
        }).then((res) => res.json());
    },
    returnTool: (toolid, available, token) => {
        return fetch(`${URL_PREFIX}/api/tools/return/${toolid}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ available }),
        }).then((res) => res.json());
    },
    deleteTool: (toolid, token) => {
        console.log("Token inside deleteTool:", token);
        return fetch(`${URL_PREFIX}/api/tools/${toolid}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
    },
    getUserById: (userid) => {
        return fetch(`${URL_PREFIX}/api/user/${userid}`).then((res) => res.json());
    },
    getSharesByUser: (token) => {
        if (!token) {
            console.error("Token is undefined in getSharesByUser");
            return;
          }
        console.log("Token inside getSharesByUser:", token);
        return fetch(`${URL_PREFIX}/api/shares/userShares`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
    },
    createShare: (shareObj, token) => {
        console.log("Token inside createShare:", token);
        return fetch(`${URL_PREFIX}/api/shares`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(shareObj),
        }).then((res) => res.json());
    },
    getAllShares: () => {
        return fetch(`${URL_PREFIX}/api/shares`).then((res) => res.json());
    },
    getShareById: (shareid) => {
        return fetch(`${URL_PREFIX}/api/shares/${shareid}`).then((res) => res.json());
    },
    confirmShareRequest: ( shareid, token) => {
        return fetch(`${URL_PREFIX}/api/shares/confirm/${shareid}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
    },
    denyShareRequest: (shareid, token) => {
        return fetch(`${URL_PREFIX}/api/shares/deny/${shareid}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
    },
};

export default API;