import React from "react";
import { useNavigate, Navigate } from "react-router";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { logout } from "../../../store/actions/auth";
import * as type from '../../../utils/constants';
const URL = type.default;

const ClientBoardContainer = (props) => {

  let navigate = useNavigate();


  if (props.isLoggedIn && props.jwtExpired ) {
    props.logout()
    return <Navigate to="/login" replace />;
  }

  else if (!props.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }



  return (


    <div className="container mt-4 borders-div">
      <Outlet />
    </div>



  )
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    jwtExpired: state.auth.jwtExpired
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout(URL.SIGN_OUT_URL_CLIENT))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ClientBoardContainer);