import Ajv, { JSONSchemaType } from 'ajv';

import { Order } from '@kebab/types';

const ajv = new Ajv();

const schema: JSONSchemaType<Order> = {
  type: 'object',
  properties: {
    creationDate: { type: 'string' },
    phone: { type: 'string' },
    payment: { type: 'string' },
    chargeFrom: { type: 'string' },
    deliveryTime: { type: 'string' },
    deliveryAddress: { type: 'string' },
    comment: { type: 'string' },
    cart: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'qty',
          'size',
          'price',
          'name',
          'toppings',
        ],
        properties: {
          name: { type: 'string' },
          price: { type: 'number' },
          qty: { type: 'number' },
          size: {
            type: 'object',
            patternProperties: {
              '^.*$': {
                type: 'array',
                items: [
                  { type: 'number' },
                  { type: 'number' },
                ],
                maxItems: 2,
                minItems: 2,
              },
            },
            minProperties: 1,
            maxProperties: 1,
            required: [],
          },
          toppings: {
            type: 'object',
            patternProperties: {
              '^.*$': { type: 'number' },
            },
            required: [],
          },
        },
      },
    },
  },
  required: [
    'creationDate',
    'phone',
    'payment',
    'deliveryTime',
    'deliveryAddress',
    'chargeFrom',
    'comment',
    'cart',
  ],
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
