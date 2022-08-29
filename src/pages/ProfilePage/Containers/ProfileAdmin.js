import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";



const AdminProfile = (props) => {

  let navigate = useNavigate();

  if (!props.currentUser) {
    navigate("/login-admin");
  }



  if (props.isLoggedIn) {
    return (

        <div className="container">
          <header className="jumbotron">
            <h3>
              <strong>{props.currentUser.emailUser}</strong>
            </h3>
          </header>
          <p>
            <strong>Token:</strong>
            {props.currentUser.accessToken.substring(0, 60)}...
          </p>
          <p>
            <strong>Email:</strong> {props.currentUser.emailUser}
          </p>
          <strong>Authorities:</strong>
          <ul>
            {props.currentUser.roles &&
              props.currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
          </ul>


        </div>
     
    )
  }

  else {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            You must be logged in </h3>
        </header>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn
  }
}



export default connect(mapStateToProps)(AdminProfile);