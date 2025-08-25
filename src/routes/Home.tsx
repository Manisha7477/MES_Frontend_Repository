import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface IHomeProps {
  accessToken: string // Add the accessToken property here
}

const Home: React.FunctionComponent<IHomeProps> = ({}) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("my-dashboard")
  }, [])

  return <></>
}

export default Home
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// interface IHomeProps {
//   accessToken: string; // Add the accessToken property here
// }

// const Home: React.FunctionComponent<IHomeProps> = ({ accessToken }) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (accessToken) {
//       navigate("my-dashboard");
//     } else {
//       navigate("login"); // Optionally navigate to a login page if accessToken is missing
//     }
//   }, [accessToken, navigate]);

//   return <></>;
// };

// export default Home;
