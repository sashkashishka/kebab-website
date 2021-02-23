import React from 'react';
import { Router } from '@reach/router';

import Page from 'Components/page';
import { DayPage, TaskPage } from 'Components/layouts';

import pageMeta from './page-meta';

// @todo add default routes
export default (props) => {

  return (
    <Page
      {...props}
      {...pageMeta}
    >
      <Router>
        <DayPage path="/days/:daySlug" />
        <TaskPage path="/days/:daySlug/tasks/:taskSlug" />
      </Router>
    </Page>
  );
};
