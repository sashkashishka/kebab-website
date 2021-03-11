import * as React from 'react';
import { css } from 'astroturf';
import { useActor } from '@xstate/react';
import DatePicker from 'react-datepicker';
import {
  addDays,
  startOfDay,
  setHours,
  setMinutes,
} from 'date-fns';

import {
  DeliveryTimeFieldActor,
  DeliveryTimeFieldMachineContext,
  FieldActions,
} from 'Machines';

import {
  Box,
  Label,
  Input,
  Asterisk,
} from 'Components/atoms';

import { getStartTime } from 'Utils';

import { FieldError } from '../field-error';

interface DeliveryTimeProps {
  deliveryTimeRef: DeliveryTimeFieldActor;
}

const styles = css`
  .calendar {
    width: 60px;
  }
`;

export const DeliveryTime: React.FC<DeliveryTimeProps> = ({ deliveryTimeRef }) => {
  const [state, send] = useActor(deliveryTimeRef);

  const { value, error } = state.context as DeliveryTimeFieldMachineContext;

  return (
    <Box>
      <Label
        htmlFor="delivery-time"
      >
        Час доставки
        {' '}
        <Asterisk />
      </Label>

      <DatePicker
        id="delivery-time"
        className={styles.calendar}
        selected={value}
        onChange={date => send({
          type: FieldActions.CHANGE,
          value: date instanceof Date
            ? date
            : getStartTime(new Date()),
        })}
        minTime={getStartTime(new Date())}
        maxTime={setHours(setMinutes(new Date(), 59), 23)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Час"
        dateFormat="HH:mm"
        timeFormat="HH:mm"
        customInput={(
          <Input
            // @ts-ignore
            error={Boolean(error)}
            width="100px"
          />
        )}
      />

      <FieldError
        error={error}
      />
    </Box>
  );
};
