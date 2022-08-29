import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
const ClientBoardContainer = (props) => {

  let navigate = useNavigate();
  
  
  if (!props.currentUser) {
    navigate("/login");
  }



return (

    <div className="container">
   
      
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
        {props.currentUser.roles  &&
          props.currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>

      <p>
        <strong>Full name:</strong>
        {props.currentUser.nom ? props.currentUser.nom : "not found "} {props.currentUser.prenom  ? props.currentUser.prenom : "not found"}

      </p>

      <p>
        <strong>Identifiant client :</strong>
        {props.currentUser.identifiantClient}

      </p>
      <Link to={"/profile"}>
        <button className="btn btn-primary">Profile</button>
      </Link>

      </div>
    </div>

  )}


const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    isLoggedIn : state.auth.isLoggedIn
  }
}



export default connect(mapStateToProps)(ClientBoardContainer);