import React from 'react'
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import '../../static/css/Toggle-switch.css'
import { useEffect } from "react";
import { connect } from "react-redux";
import { handledarkMode } from '../../store/actions/darkMode';

const Switchtoggle = (props) => {


    const styleDarkMode = props.currentUser ? {}: {marginTop : "10px"};


    const switchDarkMode = () => {
        props.handledarkMode(!props.isdarkMode);

    };
    useEffect(() => {

        document.body.style.backgroundColor = props.isdarkMode ? "#fff" : "#121212";
        document.body.style.color = props.isdarkMode ? "black" : "#fff";

    }, [props.isdarkMode]);

    return (
        <>
            <div id="darkmode" style={styleDarkMode}>
                <input type="checkbox" className="checkbox" id="checkbox"
                    onChange={switchDarkMode}
                    checked={props.isdarkMode}
                />
                <label htmlFor="checkbox" className="label">
                    <BsMoonStarsFill color="white" />
                    <BsFillSunFill color="white" />
                    <div className="ball"></div>
                </label>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        isdarkMode: state.darkMode.isdarkMode,
        currentUser: state.auth.user,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        handledarkMode: (e) => dispatch(handledarkMode(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Switchtoggle)

