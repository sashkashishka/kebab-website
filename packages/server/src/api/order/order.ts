import { RequestHandler } from 'express';
import * as R from 'ramda';

import { validate } from './schema';
import { transformCart, cartToString, escapePhoneField } from './transform';
import { translateKeys } from './translate';

import { TABLES } from '../../config';

export const postOrder: RequestHandler = async (req, res, next) => {
  try {
    const isValid = validate(req.body);

    if (!isValid) {
      // TODO return readable errors
      res.status(400).json(validate.errors);
    }

    const doc = req.gSheet;

    await doc.loadInfo();

    const orderSheet = doc.sheetsByIndex[TABLES.ORDER_LIST];

    const data = R.pipe(
      escapePhoneField,
      transformCart,
      translateKeys,
      cartToString,
    )(req.body);

    const orderRow = await orderSheet.addRow(data);

    await orderRow.save();

    res.status(200).json({
      status: 'success',
    });
  } catch (e) {
    next(e);
  }
};
