import { RequestHandler } from 'express';

// TODO req validation
export const postOrder: RequestHandler = async (req, res, next) => {
  try {
    const doc = req.gSheet;

    await doc.loadInfo();

    const orderSheet = doc.sheetsByIndex[1];

    // TODO check if req.body exists and has full list of keys and values
    const data = Object.keys(req.body).reduce((acc, key) => {
      if (key === 'cart') {
        acc[key] = JSON.stringify(req.body[key], null, '  ');
      } else {
        acc[key] = req.body[key];
      }

      return acc;
    }, {});

    console.log(data)

    const orderRow = await orderSheet.addRow(data);

    await orderRow.save();

    res.status(200).json({
      status: 'success',
    });
  } catch (e) {
    next(e);
  }
};
