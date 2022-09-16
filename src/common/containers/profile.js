import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import UpdateButton from '../components/updateButton';
import ActiveSessions from '../components/sessionsMgmnt'
import ToastError from '../components/toastError';
import Toasts from '../components/toast';
import { sendOtp } from '../../store/actions/auth'



function PersonalProfile(props) {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.currentUser) {
      navigate(-1);
    }
  }, []);

  const toast = {
    title: "success",
    body: props.otp_res,
    position: "top-center",
    place: "toast-position"
  }



  const handleSendOtp = () => {
    setLoading(true);
    props.sendOtp().then((res) => {
      console.log(res)
      setLoading(false);
      setTimeout(() => {
        navigate("/update-password")
      }, 3000);

    }).catch((err) => {
      setLoading(false);
    })
  }


  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      {props.message && <ToastError props={JSON.parse(props.message)} isdarkMode={props.isdarkMode} />}
      {props.otp_res && <Toasts props={toast} isdarkMode={props.isdarkMode} />}
      <MDBContainer className="py-5 h-100">

        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0 pt-5">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-client-internet-marketing-service-flaticons-flat-flat-icons-2.png"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">{props.currentUser.lastName.toUpperCase()}{" "}{props.currentUser.firstName.toUpperCase()}</MDBTypography>
                  <MDBCardText>Active</MDBCardText>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Account info</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{props.currentUser.emailUser}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="pt-1">
                      <MDBCol size="12" className="mb-3">
                        <MDBTypography tag="h6">Identifier</MDBTypography>
                        <MDBCardText className="text-muted">{props.currentUser.identifiantClient}</MDBCardText>
                      </MDBCol>

                    </MDBRow>

                    <div className="d-flex justify-content-start">

                      <UpdateButton loading={loading} disabled={props.update_pass.length > 1} handleSendOtp={handleSendOtp} />

                    </div>

                    <div className="d-flex justify-content-start pt-2 mt-2">
                      {props.update_pass.length > 1 && <small className="text-muted ">You have right to update your password once every session !</small>}
                    </div>

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
              <hr className=" mt-4 " />
              <MDBRow className="g-0">
                <MDBCol className="text-center" md="12" >
                  <ActiveSessions data={props.currentUser.agents} />
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    message: state.message.message,
    otp_res: state.auth.otp_success,
    update_pass: state.auth.update_pass

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendOtp: () => dispatch(sendOtp())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalProfile);
