import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";



const ClientBoardContainer2 = (props) => {

  let navigate = useNavigate();

  if (!props.currentUser) {
    navigate("/login");
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
      

    </div>

  )
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user
  }
}


export default connect(mapStateToProps)(ClientBoardContainer2);