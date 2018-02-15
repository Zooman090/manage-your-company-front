import React from 'react';
import { Grid } from 'material-ui';

const Staff = (props) => {
  const { staffs } = props;

  return staffs.map(({ name, position, experience, skills, company_id: id }) => <Grid container className="company-info" key={`${id}-company`}
    direction={'column'}>
    <p>{ name }</p>
    <p>{ position }</p>
    <p>{ experience }</p>
    <p>{ skills }</p>
  </Grid>);
};

export default Staff;
