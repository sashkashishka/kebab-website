import { RequestHandler } from 'express';
import { getSheetRowValues } from '../../utils';
import { TABLES } from '../../config';

export const getBannerList: RequestHandler = async (req, res, next) => {
  try {
    const doc = req.gSheet;

    await doc.loadInfo();

    const productSheet = doc.sheetsByIndex[TABLES.BANNER_LIST];

    const rows = await productSheet.getRows();

    const values = rows.map(getSheetRowValues);

    res.status(200).json(values);
  } catch (e) {
    next(e);
  }
};
