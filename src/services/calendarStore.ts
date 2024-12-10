import { defineStore } from 'pinia';
import { ref } from 'vue';
import { CalendarData } from './types.ts';
import { getDataService, getTranslation } from './getDataService.ts';

export const useCalendarStore = defineStore('calendarStore', () => {
  const maxNight = ref<CalendarData['maxNight']>(30);
  const minStartDate = ref<CalendarData['minStartDate']>(new Date());
  const language = ref<CalendarData['language']>('cs');
  const dateRange = ref<CalendarData['dateRange']>([null, null]);
  const dateRangeSource = ref<'calendar' | 'favourites'>('calendar');

  const setMaxNight = (newMaxNight: CalendarData['maxNight']): void => {
    maxNight.value = newMaxNight;
  };
  const setMinStartDate = (
    newMinStartDate: CalendarData['minStartDate']
  ): void => {
    minStartDate.value = newMinStartDate;
  };
  const setLanguage = (newLanguage: CalendarData['language']): void => {
    language.value = newLanguage;
  };
  const setDateRange = (
    newDateRange: CalendarData['dateRange'],
    source: 'calendar' | 'favourites'
  ): void => {
    if (newDateRange && newDateRange.length > 0) {
      if (newDateRange[0] && !newDateRange[1]) {
        dateRange.value = [newDateRange[0], null];
      } else if (newDateRange[0] && newDateRange[1]) {
        dateRange.value = newDateRange;
      }
    } else {
      dateRange.value = [null, null];
    }

    dateRangeSource.value = source;
  };

  const resetDefaults = (): void => {
    maxNight.value = 30;
    minStartDate.value = new Date();
    language.value = 'cs';
    dateRange.value = [null, null];
    dateRangeSource.value = 'calendar';
  };

  const initializeData = (): void => {
    getDataService()
      .then((calendarData: CalendarData) => {
        if (calendarData) {
          setMaxNight(calendarData.maxNight);
          setMinStartDate(new Date(calendarData.minStartDate));
        }
        return getTranslation();
      })
      .then((translation: string[]) => {
        if (translation?.length) {
          setLanguage(translation[0]);
        }
      })
      .catch((err: unknown) => {
        console.log('initializeDataError', err);
      });
  };
  return {
    maxNight,
    minStartDate,
    language,
    dateRange,
    dateRangeSource,
    setMaxNight,
    setMinStartDate,
    setLanguage,
    setDateRange,
    resetDefaults,
    initializeData,
  };
});
