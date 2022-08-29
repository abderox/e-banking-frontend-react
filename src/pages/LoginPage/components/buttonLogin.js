import React from 'react'

function ButtonLogin({loading,isdarkMode}) {
    return (
        <div className="form-group d-flex justify-content-center mt-3">
            <button className={`button-login ${isdarkMode ? "" : " darkbutton-login"}`} disabled={loading}>
                {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
            </button>
        </div>
    )
}

export default ButtonLogin;

