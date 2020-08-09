import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Nav = (props) => {
    const { auth, profile } = props;
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks/>;
    return (
        <nav>
            <div className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to='/' className="brand-logo left">Todo App</Link>
                    { auth.isLoaded && links }
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Nav)