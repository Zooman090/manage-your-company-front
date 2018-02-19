import React from 'react';
import { Route } from 'react-router-dom';

import Dialog from './dialog';
import Header from './header';
import Main from './main-page';
import CreateCompany from './company/create';
import CreateStaff from './staff/create';
import SignUp from './sign/up';
import SignIn from './sign/in';

const Root = () => <div>
  <Dialog />
  <Header />
  <Route exact path="manage-your-company-front/" component={Main} />
  <Route path="/company-create" component={CreateCompany} />
  <Route path="/staff-create" component={CreateStaff} />
  <Route path="/sign-up" component={SignUp} />
  <Route path="/sign-in" component={SignIn} />
</div>;

export default Root;
