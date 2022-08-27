import React from "react";
import {useNavigate} from "react-router";
import {connect} from "react-redux";



const AdminBoardContainer = (props) => {

  let navigate = useNavigate();

    if(!props.currentUser){
        navigate("/login-admin");
    }

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
     
    </div>

  )
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.user
    }
}


export default connect(mapStateToProps)(AdminBoardContainer);