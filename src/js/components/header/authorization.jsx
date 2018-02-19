import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { serverUrl, siteUrl } from '../../../constants/route';
import { securityFetch, checkingStatus } from '../helper/request';
import { userAuthorization } from '../../actions/user.js';
import { showErrorDialog } from '../../actions/dialog';

const propTypes = {
  user: PropTypes.object
};

class Authorization extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    const url = `${serverUrl}/sign/out`;
    const options = {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': siteUrl
      }
    };

    securityFetch(url, options)
      .then(checkingStatus)
      .then(() => {
        const { history, saveUserParameters } = this.props,
          userParameters = { isSign: false, role: 'guest' };

        localStorage.setItem('myc', '');

        history.push('/');

        saveUserParameters(userParameters);
      })
      .catch(error => {
        const headerTitle = 'Sign Out Error',
          { showErrorDialog } = this.props;

        error
          .then(({ errorMessage }) => {
            showErrorDialog({ errorMessage, headerTitle });
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
    },
    showErrorDialog: dialogParameters => {
      dispatch(showErrorDialog(dialogParameters));
    }
  });

Authorization.propTypes = propTypes;

export default connect(mapState, mapDispatch)(withRouter(Authorization));
