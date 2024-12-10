import axios, { AxiosResponse } from 'axios';
import { CalendarData } from './types.ts';
import { useCalendarStore } from './calendarStore.ts';

export const sendCalendarData = (): Promise<any> => {
  const calendarStore = useCalendarStore();
  const dataForSave: CalendarData = {
    maxNight: calendarStore.maxNight,
    minStartDate: calendarStore.minStartDate,
    language: calendarStore.language,
    dateRange: calendarStore.dateRange,
  };
  return axios
    .post('/api/calendar', dataForSave)
    .then((res: AxiosResponse<any>) => {
      // console.log('res', res);
      return res.data;
    })
    .catch((err: unknown): void => {
      console.log('err', err);
      throw err;
    });
};
