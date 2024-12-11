<script setup lang="ts">
  import { computed, reactive, ref, watch } from 'vue';
  import DatePicker from 'primevue/datepicker';
  import { useCalendarStore } from '../../services/calendarStore.ts';
  import i18n from '../../i18n.ts';
  import { CalendarData } from '../../services/types.ts';

  const calendarStore = useCalendarStore();
  const messages: Record<string, { calendar: { picker: any } }> =
    i18n.global.messages;
  const calendarKey = ref(0);

  const localeTranslation = computed<string>(() => {
    const currentLocale = calendarStore.language;
    return (
      messages[currentLocale]?.calendar?.picker ||
      messages['cs'].calendar.picker
    );
  });

  const state = reactive<{
    dateRange: CalendarData['dateRange'];
    maxNight: CalendarData['maxNight'];
    minStartDate: CalendarData['minStartDate'];
  }>({
    dateRange: [
      calendarStore.dateRange[0]
        ? new Date(calendarStore.dateRange[0])
        : new Date(),
      calendarStore.dateRange[1]
        ? new Date(calendarStore.dateRange[1])
        : new Date(),
    ],
    maxNight: calendarStore.maxNight,
    minStartDate: calendarStore.minStartDate,
  });

  watch(localeTranslation, (newLocale: string, oldLocale: string) => {
    if (newLocale !== oldLocale) {
      calendarKey.value = `${Date.now()}-${Math.random()}`;
    }
  });

  watch(
    state,
    (newState: typeof state) => {
      const newDateRange = newState.dateRange.map((date) =>
        date ? new Date(date) : null
      ) as CalendarData['dateRange'];
      if (
        newDateRange[0] !== calendarStore.dateRange[0] ||
        newDateRange[1] !== calendarStore.dateRange[1]
      ) {
        calendarStore.setDateRange(newDateRange, 'calendar');
      }

      if (newState.maxNight !== calendarStore.maxNight) {
        calendarStore.setMaxNight(newState.maxNight);
      }

      const [startDate, endDate] = newState.dateRange;
      if (startDate && endDate) {
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(0, 0, 0, 0);

        const minDate = new Date(start <= end ? start : end);

        if (
          calendarStore.minStartDate &&
          minDate.getTime() !== calendarStore.minStartDate.getTime()
        ) {
          calendarStore.setMinStartDate(minDate);
        }
      }
    },
    { deep: true }
  );

  watch(
    () => calendarStore.dateRange,
    (newDateRange: CalendarData['dateRange']) => {
      if (calendarStore.dateRangeSource === 'favourites') {
        state.dateRange = newDateRange.map((date) =>
          date ? new Date(date) : null
        ) as CalendarData['dateRange'];
      }
    },
    { immediate: true }
  );
</script>

<template>
  <div class="datepicker-component">
    <DatePicker
      v-model="state.dateRange"
      selectionMode="range"
      dateFormat="dd/mm/yyyy"
      :key="calendarKey"
      :min-date="new Date()"
      :numberOfMonths="2"
      :locale="localeTranslation"
      inline
    />
  </div>
</template>
