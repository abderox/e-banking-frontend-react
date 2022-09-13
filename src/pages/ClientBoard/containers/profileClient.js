import React from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import PersonalProfile from '../../../common/containers/profile'



const ProfileClient = (props) => {

  let navigate = useNavigate();

  if (!props.currentUser) {
    navigate("/login");
  }

  return (

    <PersonalProfile />

    

  )
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user
  }
}


export default connect(mapStateToProps)(ProfileClient);