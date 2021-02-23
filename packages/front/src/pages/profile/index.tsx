import * as React from 'react';
import { Router } from '@reach/router';

import {
  SchedulePage,
  DayPage,
  TaskPage,
} from 'Components/layouts';

import ProfileDefault from './_default';

const ProfilePage: React.FC = () => (
  <Router>
    <SchedulePage path="/profile/:userSlug" />
    <DayPage path="/profile/:userSlug/:daySlug" />
    <TaskPage path="/profile/:userSlug/:daySlug/:taskSlug" />
    <ProfileDefault default />
  </Router>
);

export default ProfilePage;
