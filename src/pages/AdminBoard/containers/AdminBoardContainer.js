import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import VHmenu from '../../../common/containers/VHmenu';



const AdminBoardContainer = (props) => {

  let navigate = useNavigate();

  if (!props.currentUser) {
    navigate("/login-admin");
  }



  if (props.isLoggedIn) {
    return (

      <><VHmenu />
      <div className="container mt-4 borders-div">
        <Outlet />
        </div>
       
      </>
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



export default connect(mapStateToProps)(AdminBoardContainer);