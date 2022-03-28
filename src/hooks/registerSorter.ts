import {RegisterModel, UserRegistersModel} from './../models/HistoryItemsModel';
import moment from 'moment';

/**
 * Get all registers and sort it
 * @param registers
 * @returns {object} object of three arrays: `Array<active>`, `Array<history>`, `Array<last>`
 */
export const sortRegister = (
  registers: Array<RegisterModel>,
): UserRegistersModel => {
  const active = registers.filter(item => item.is_active === true).reverse();
  const history = registers.filter(item => item.is_active === false).reverse();
  const last = [...registers].sort((a, b) => {
    const one = moment(a.last_updated_time, 'YYYY-MM-DDTHH:mm:ss');
    const two = moment(b.last_updated_time, 'YYYY-MM-DDTHH:mm:ss');
    return one.diff(two);
  });
  const lastFive = last.slice(-5).reverse();

  return {
    active: active,
    history: history,
    last: lastFive,
  };
};
