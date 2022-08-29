import React,{useEffect} from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import {reload} from "../../../store/actions/auth"




const AdminBoardContainer = (props) => {

  let navigate = useNavigate();

  if (!props.currentUser) {
    navigate("/login-admin");
  }

  useEffect(() => {
    props.reloadData();
  }, [props.isLoggedIn])

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
          {props.currentUser.accessToken}
        </p>
        <p>
          <strong>Email:</strong> {props.currentUser.emailUser}
        </p>
        <strong>Authorities:</strong>
        <ul>
        {props.currentUser.roles  &&
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

const mapToDispatch = (dispatch) => {
  return {
    reloadData :()=> dispatch(reload())
  }
}

export default connect(mapStateToProps,mapToDispatch)(AdminBoardContainer);