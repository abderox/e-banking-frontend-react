import React  from "react";
import { Navigate } from "react-router";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import VHmenu from '../../../common/containers/VHmenu';
import { logout } from "../../../store/actions/auth";
import * as type from '../../../utils/constants';
const URL = type.default;

const AdminBoardContainer = (props) => {



 
 
    if (props.isLoggedIn && props.jwtExpired ) {
      props.logout()
      return <Navigate to="/login-admin" replace />;
    }
    else if(!props.isLoggedIn)
    {
      return <Navigate to="/login-admin" replace />;
    }
    if(!props.isAdmin)
    {
      return <Navigate to="*" replace />;
    }
    

      return (

        <><VHmenu />
        <div className="container mt-4 borders-div">
          <Outlet />
          </div>
         
        </>
      )
    }

  





const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
    jwtExpired: state.auth.jwtExpired,
    isAdmin: state.auth.isAdmin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout(URL.SIGN_OUT_URL_ADMIN))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AdminBoardContainer);