import React from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/API";

// const styleCard = {
//   width: "18rem",
//   margin: "10px",
// };

const DataCard = ({ title, content }) => {
    return (
        <div className="card">
            <h3 className="card-title">{title}</h3>
            <div className="card-content">{content}</div>
        </div>
    );
};

export default DataCard;

// function DataCard(props) {
//   const params = useParams();
//   const [count, setCount] = useState(0);
//   const [vote, setVote] = useState(0);
 
//   const fetchGameVoteofaUser = () => {
//     API.countVotesofaGame(params.id, props.userId, props.id, props.token).then(
//       (data) => {
//         console.log(data);
//       }
//     );
//   };

//   const fetchGameVote = () => {
//     API.countVotesofaGame(props.id, params.id, props.token).then((data) => {
//       console.log(data);
//       // setVote(data.count)
//     });
//   };
//   useEffect(() => {
//     fetchGameVote();
//   }, []);

//   return (
//     <div className="card" style={styleCard}>
//       <div className="card-body d-flex flex-column justify-content-between align-items-center">
//         <h5 className="card-title">{props.name}</h5>
//         <p className="card-text"></p>
//         <ul className="list-group"></ul>
//         <p className="card-text"></p>
//         <button
//           type="button"
//           onClick={() => setCount(count + 1)}
//           className="btn btn-primary"
//         >
//         </button>
//         <br></br>
//         <p>⛳️ Current: {vote}</p>
//       </div>
//     </div>
//   );
// }

// export default Gamecard;