import dbConnection from "../../../lib/connection";
import serviceStatusCode from "../../../lib/serviceStatusCode"
import { CustomError } from '../../../lib/middlewares/respond';

import { insertSelectionSelected_question, selectProfileHelper_idx,selectSelectionQuestion_idx } from '../helper.model';
import { selectMatchingHistroy } from '../../matching/matching.model';

import helper from "../index";


const postSelectionService = (req: any,res: any) => {
  return new Promise(async (resolve, reject) => {
    const connection: any = await dbConnection();

    try {
      const { body } = req;
      const {user} = req;

      // 진행중인 상담이 있는경우 오류 발생
      const mResult: any = await selectMatchingHistroy(connection, user);
      
      if(mResult.length) {
        reject(new CustomError(null, 1404, {}))
      }

      let helper_idx: any = await selectProfileHelper_idx(connection, user.user_idx)
      if (!helper_idx.length){
        reject(new CustomError(null, 1401, {}))
      }
      let question: any = await selectSelectionQuestion_idx(connection, body.question_idx)
      if (!question.length){
        reject(new CustomError(null, 1402, body))
        
      }
      await insertSelectionSelected_question(connection, [helper_idx[0].helper_idx, body.question_idx, user.user_idx]);
    
      resolve({});
    } catch (e){
      reject(e);
    } finally {
      connection.release();
    }
  })
}


  export default{
    postSelectionService
  }