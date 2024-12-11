import { createI18n } from 'vue-i18n';

const messages = {
  cs: {
    calendar: {
      picker: {
        firstDayOfWeek: 1,
        dayNames: [
          'Neděle',
          'Pondělí',
          'Úterý',
          'Středa',
          'Čtvrtek',
          'Pátek',
          'Sobota',
        ],
        dayNamesShort: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
        dayNamesMin: ['N', 'P', 'Ú', 'S', 'Č', 'P', 'S'],
        monthNames: [
          'Leden',
          'Únor',
          'Březen',
          'Duben',
          'Květen',
          'Červen',
          'Červenec',
          'Srpen',
          'Září',
          'Říjen',
          'Listopad',
          'Prosinec',
        ],
        monthNamesShort: [
          'Led',
          'Úno',
          'Bře',
          'Dub',
          'Kvě',
          'Čvn',
          'Čvc',
          'Srp',
          'Zář',
          'Říj',
          'Lis',
          'Pro',
        ],
        today: 'Dnes',
        clear: 'Vymazat',
        dateFormat: 'dd/mm/yyyy',
        weekHeader: 'Týd',
      },
      today: 'Dnes',
      clear: 'Vymazat',
      czech: 'česky',
      english: 'english',
      chooseLanguage: 'Jazyk',
      favourite: 'Oblíbené termíny',
    },
    buttons: {
      lastMinute: 'last minute',
      second: 'listopad/prosinec 2024',
      third: 'leden/únor 2025',
      fourth: 'březen/duben 2025',
      fifth: 'květen/červen 2025',
      vacancies: 'letní prázdniny 2025',
      send: 'ODESLAT',
    },
  },
  en: {
    calendar: {
      picker: {
        firstDayOfWeek: 0,
        dayNames: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        monthNames: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        monthNamesShort: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yyyy',
        weekHeader: 'Wk',
      },
      today: 'Today',
      clear: 'Clear',
      chooseLanguage: 'Language',
      czech: 'česky',
      english: 'english',
      favourite: 'Popular schedules',
    },
    buttons: {
      lastMinute: 'Last minute',
      second: 'November/December 2024',
      third: 'January/February 2025',
      fourth: 'March/April 2025',
      fifth: 'May/June 2025',
      vacancies: 'Summer holiday 2025',
      send: 'SEND',
    },
  },
};

const i18n = createI18n({
  locale: 'cs',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
