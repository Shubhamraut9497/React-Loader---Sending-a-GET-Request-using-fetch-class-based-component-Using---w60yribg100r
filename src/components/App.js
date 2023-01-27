import React from "react";
import "../styles/App.css";
import Loader from "./Loader";

const LoadingStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS"
};

const App = () => {
  const BASE_URL = "https://content.newtonschool.co/v1/pr/main/users";
  const [userId, setUserId] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(LoadingStatus.NOT_STARTED);
  const [userData, setUserData] = React.useState({
    id: "",
    email: "",
    name: "",
    phone: "",
    webiste: ""
  });

  const handleOnClick = async () => {
    setIsLoading(LoadingStatus.IN_PROGRESS);
    try {
      setTimeout(async () => {
        const response = await fetch(`${BASE_URL}/${userId}`);
        const data = await response.json();
        setUserData(data);
        setIsLoading(LoadingStatus.SUCCESS);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(LoadingStatus.NOT_STARTED);
    }
  };

  const onChangeHandler = (event) => {
    setUserId(event.target.value);
  };

  return (
    <div id="main">
      <label htmlFor="number">Enter an id for the user between 1 to 100</label>
      <input
        type="number"
        value={userId}
        onChange={onChangeHandler}
        id="input"
        min={1}
        max={10}
      />
      <button id="btn" onClick={handleOnClick}>
        Get User
      </button>
      {isLoading === LoadingStatus.IN_PROGRESS ? <Loader /> : null}
      <div id="data">
        {isLoading === LoadingStatus.SUCCESS ? (
          <>
            <h4 id="id">ID: {userData.id}</h4>
            <h4 id="email">Email: {userData.email}</h4>
            <h4 id="name">Name: {userData.name}</h4>
            <h4 id="phone">Phone: {userData.phone}</h4>
            <h4 id="website">Website: {userData.website}</h4>
          </>
        ) : isLoading === LoadingStatus.IN_PROGRESS ? null : (
          <h1>Click on the button to get the user</h1>
        )}
      </div>
    </div>
  );
};

export default App;


