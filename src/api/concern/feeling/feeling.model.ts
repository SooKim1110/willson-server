import mysql, { Connection, MysqlError } from "mysql";
import _ from 'lodash'

const selectFeelingList = (connection: Connection,): Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT
      *
    FROM
      feeling
  `
    connection.query(query, (err: Error, result: Array<any>) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const insertQuestionFeeling = (connection: Connection, { insertId }: any, feeling: Array<number>, { user_idx }: any): Promise<Array<{}>> => {
  return new Promise((resolve, reject) => {
    const value: number[][] = [];

    _.forEach(feeling, (element) => {
      value.push([insertId, element, user_idx])
    })

    const query = `
      INSERT INTO
        question_feeling (question_idx, feeling_idx, cr_user)
      VALUES
        ?
    `
    const Query = connection.query(query, [value], (err, result) => {
      if(err) {
        reject(err)
      }
      resolve(result)
    })
  })
}


export default {
  selectFeelingList,
  insertQuestionFeeling,
}
