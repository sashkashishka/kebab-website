import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Container from 'Components/container';
import Link from 'Components/link';

import schedule from 'Constants/schedule';

const TaskPage = ({ taskSlug, daySlug }) => {
  const task = schedule[daySlug]?.tasks[Number(taskSlug) - 1];
  const {
    Component,
    data,
  } = task;

  if (!task) return null;

  return (
    <Fragment>
      <Container
        py={4}
      >
        <Link
          href={`/days/${daySlug}/`}
        >
          &#8592;Повернутися до списку завдань
        </Link>
      </Container>


      <Container
        display="flex"
        py={4}
      >
        {
          taskSlug > 1 && (
            <Link
              href={`/days/${daySlug}/tasks/${Number(taskSlug) - 1}`}
              mr="auto"
            >
              Завдання {Number(taskSlug) - 1}
            </Link>
          )
        }

        {
          taskSlug < schedule[daySlug].tasks.length && (
            <Link
              href={`/days/${daySlug}/tasks/${Number(taskSlug) + 1}`}
              ml="auto"
            >
              Завдання {Number(taskSlug) + 1}
            </Link>
          )
        }
      </Container>
    </Fragment>
  );
};

TaskPage.propTypes = {
  taskSlug: PropTypes.string,
};

TaskPage.defaultProps = {
  taskSlug: '',
};

export default TaskPage;
