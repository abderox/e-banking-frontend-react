import React from 'react';
import {
    Navigate,
  } from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../store/actions/auth';
import AuthApi from '../../api/auth/auth.api'

  const ProtectedRoute = (props) => {
   
  
    if (!props.isLoggedIn) {
      return <Navigate to="/" replace />;
    }
  
    return props.children;
  }
  
  const mapStateToProps = (state,ownedProps) => ({   
    isLoggedIn: state.auth.isLoggedIn,
    currentUser: state.auth.currentUser,
    ownedProps : ownedProps.children,
    });

    const mapDispatchToProps = dispatch => ({
        logout: () => dispatch(logout()),
    });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);