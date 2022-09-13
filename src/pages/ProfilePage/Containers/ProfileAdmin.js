import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import PersonalProfile from '../../../common/containers/profile'



const AdminProfile = (props) => {

  let navigate = useNavigate();



  if (!props.currentUser) {
    navigate("/login-admin");
  }



  if (props.isLoggedIn) {
    return (
      <PersonalProfile />

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