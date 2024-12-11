import axios, { AxiosResponse } from 'axios';
import { CalendarData } from './types.ts';

export const sendCalendarData = (data: CalendarData): Promise<any> => {
  return axios
    .post('/api/calendar', data)
    .then((res: AxiosResponse<any>) => {
      // console.log('res', res);
      return res.data;
    })
    .catch((err: unknown): void => {
      console.log('err', err);
      throw err;
    });
};
