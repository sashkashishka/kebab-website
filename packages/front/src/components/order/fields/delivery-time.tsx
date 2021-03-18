import * as React from 'react';
import { css } from 'astroturf';
import { useActor } from '@xstate/react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale';

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

import {
  MAX_TIME,
  MIN_TIME,
  MAX_DATE,
} from 'Constants';

import { FieldError } from '../field-error';

interface DeliveryTimeProps {
  deliveryTimeRef: DeliveryTimeFieldActor;
}

registerLocale('uk', uk);

const START_DATE = getStartTime(new Date());

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
        // className={styles.calendar}
        locale="uk"
        selected={value}
        onChange={date => send({
          type: FieldActions.CHANGE,
          value: date instanceof Date
            ? date
            : getStartTime(new Date()),
        })}
        minTime={MIN_TIME}
        maxTime={MAX_TIME}
        minDate={START_DATE}
        maxDate={MAX_DATE}
        showTimeSelect
        timeIntervals={15}
        timeCaption="Час"
        dateFormat="HH:mm dd.MM.yyyy"
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
