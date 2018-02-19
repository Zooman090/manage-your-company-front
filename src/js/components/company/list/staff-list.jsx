import React from 'react';
import { Grid } from 'material-ui';
import PropTypes from 'prop-types';

const propsTypes = {
  staffs: PropTypes.object
};

const Staff = (props) => {
  const { staffs } = props;

  return staffs.map(({ name, position, experience, skills }, index) => <Grid container className="staff-info"
    key={`${index}-staff-item`}
    direction={'column'}
    spacing={0}>
    <p className="staff-info__point-text">{ name }</p>
    <p className="staff-info__point-text">Position: <span className="staff-info__point-main-text">{ position }</span></p>
    <p className="staff-info__point-text">Experience: <span className="staff-info__point-main-text">{ experience }</span></p>
    <p className="staff-info__point-text">Skills: <span className="staff-info__point-main-text">{ skills }</span></p>
  </Grid>);
};

Staff.propsTypes = propsTypes;

export default Staff;
