import { RequestHandler } from 'express';
import { GoogleSpreadsheet } from 'google-spreadsheet';

declare global {
  namespace Express {
    interface Request {
      gSheet: GoogleSpreadsheet;
    }
  }
}

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID as string);

export const initGoogleSheet: RequestHandler = async (req, _res, next) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
      private_key: (process.env.GOOGLE_PRIVATE_KEY as string).replace(/\\n/gm, '\n'),
    });

    req.gSheet = doc;
    next();
  } catch (e) {
    next(e);
  }
};
