import React from 'react';
import { Grid } from 'material-ui';

const Guest = () => (
  <Grid container xs={6} className="guest-container">
    <div className="user-credentials">
      <p>Данні для входу:</p>
      <p>dearguest@guest.com</p>
      <p>12345678</p>
    </div>
  </Grid>
);

export default Guest;
