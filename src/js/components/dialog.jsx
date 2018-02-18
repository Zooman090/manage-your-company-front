import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';
import PropTypes from 'prop-types';

import { makeEmptyDialog } from '../actions/dialog';

const propTypes = {
  dialog: PropTypes.object
};

const AUTOMATICALY_CLOSE_TIME = 5000,
  ANIMATION_DURATION = 400;

class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: true,
      animationPeriod: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { type } = this.props.dialog,
      { hide, animationPeriod } = this.state,
      { type: nextType } = nextProps.dialog,
      { hide: nextHide, animationPeriod: nextAnimationPeriod } = nextState;

    if (type !== nextType || hide !== nextHide || animationPeriod !== nextAnimationPeriod) {
      return true;
    }

    return false;
  }

  componentWillUpdate(nextProps, nextState) {
    const { closeAfterSeconds = AUTOMATICALY_CLOSE_TIME, type } = nextProps.dialog,
      { hide, animationPeriod } = nextState,
      toEmptyDialog = () => {
        this.setState({ animationPeriod: false });
        this.props.emptyDialog();
      };

    if (type !== 'empty' && hide && !animationPeriod) {
      this.setState({ hide: false });
      setTimeout(() => {
        this.setState({ hide: true, animationPeriod: true }, () => {
          setTimeout(() => {
            toEmptyDialog();
          }, ANIMATION_DURATION);
        });
      }, closeAfterSeconds);
    }
  }

  get simple() {
    const { message } = this.props.dialog;

    return <div className="simple-dialog">
      <span className="simple-dialog__message">{message}</span>
    </div>;
  }

  get full() { //TODO: would completed when will needed
    const { headerTitle, message, yesBtn, noBtn, action } = this.props.dialog,
      closeBtn = () => {
        this.setState({ hide: false });
      };

    return <div className="full-dialog layout-inline-column">
      <i className="material-icons" onClick={closeBtn}>close</i>
      <span className="full-dialog__header">{headerTitle}</span>
      <span className="full-dialog__message">{message}</span>
      <div className="layout">
        <Button onClick={action}>{yesBtn}</Button>
        <Button onClick={closeBtn}>{noBtn}</Button>
      </div>
    </div>;
  }

  get error() {
    const { headerTitle, errorMessage } = this.props.dialog;

    return <div className="error-dialog layout-inline-column">
      <span className="error-dialog__header">{headerTitle}</span>
      <span className="error-dialog__error-message">{errorMessage}</span>
    </div>;
  }

  get empty() {
    return null;
  }

  render() {
    const { type } = this.props.dialog,
      { hide } = this.state,
      customClassName = `dialog-container ${hide ? 'hidden-dialog-container' : ''}`;

    return <div className={customClassName}>
      {this[type]}
    </div>;
  }
}

const mapState = ({ dialog }) => ({
    dialog
  }),
  mapDispatch = dispatch => ({
    emptyDialog: () => {
      dispatch(makeEmptyDialog());
    }
  });

Dialog.propTypes = propTypes;

export default connect(mapState, mapDispatch)(Dialog);
