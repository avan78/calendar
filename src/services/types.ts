export type CalendarData = {
  maxNight: number;
  minStartDate: Date;
  language: string;
  dateRange: [Date | null, Date | null];
};

export type DateButton = {
  text: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  minDate: string;
};
