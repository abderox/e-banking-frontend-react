import React from 'react'

function ButtonLogin({loading}) {
    return (
        <div className="form-group d-flex justify-content-center mt-3">
            <button className="button-login" disabled={loading}>
                {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
            </button>
        </div>
    )
}

export default ButtonLogin;

