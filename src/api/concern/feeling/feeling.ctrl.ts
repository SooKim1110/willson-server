import express from 'express';
import feelingService from './feeling.service';

import { isValidCheck } from '../../../lib/isValidation';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getFeelingList = async (req: any, res: any) => {

  await feelingService.getfeelingService(req, res)
  .then((result: any) => {
    respondBasic(res, serviceStatusCode['GET_FEELING_LIST_SUCCESS'], result)
	})
	.catch((e: any) => {
		respondOnError(res, e.code, 500);
	})
}




export {
  getFeelingList,
}