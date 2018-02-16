import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import serverRoute, { siteUrl } from '../../../config/route';
import { securityFetch } from '../helper/request';
import { userAuthorization } from '../../actions/user.js';

class Authorization extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    const url = `${serverRoute}/sign/out`;
    const options = {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': siteUrl
      }
    };

    securityFetch(url, options)
      .then(response => {
        response.json()
          .then(() => {
            const { history } = this.props,
              userParameters = { isSign: false, role: 'guest' };

            localStorage.setItem('myc', '');

            history.push('/');

            this.props.saveUserParameters(userParameters);
          });
      });
  }

  authorized() {
    return <div className="sign-container">
      <div onClick={this.signOut}>Sign Out</div>
    </div>;
  }

  notAuthorized() {
    return <div className="sign-container">
      <Link className="sign-in-link" to="/sign-in">Sign In</Link>
      <span className="divider">/</span>
      <Link className="sign-up-link" to="/sign-up">Sign Up</Link>
    </div>;
  }

  render() {
    const { user: { isSign } } = this.props;

    return isSign ? this.authorized() : this.notAuthorized();
  }
}

const mapState = state => ({
    user: state.user
  }),
  mapDispatch = dispatch => ({
    saveUserParameters: userParameters => {
      dispatch(userAuthorization(userParameters));
    }
  });

export default connect(mapState, mapDispatch)(withRouter(Authorization));
