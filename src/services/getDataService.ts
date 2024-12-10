import axios, { AxiosResponse } from 'axios';
import { CalendarData, DateButton } from './types.ts';

export const getDataService = (): Promise<any> => {
  return axios
    .get<CalendarData>('/api/calendar')
    .then((res: AxiosResponse<CalendarData>) => {
      res.data;
      //  console.log(res.data);
    })
    .catch((err: unknown): void => {
      console.log('error', err);
      throw new Error('Failed to get calendar data.');
    });
};

export const getFavourites = (): Promise<any> => {
  return axios
    .get<DateButton>('/api/favourites')
    .then((res: AxiosResponse<DateButton>) => {
      return res.data || [];
    })
    .catch((err: unknown): void => {
      console.log('error', err);
      throw new Error('Failed to get favourite dates.');
    });
};

export const getTranslation = (): Promise<any> => {
  return axios
    .get<string[]>('/api/language')
    .then((res: AxiosResponse<string[]>) => {
      return res.data || [];
    })
    .catch((err: unknown): void => {
      console.log('error', err);
      throw new Error('Failed to get translation data.');
    });
};
