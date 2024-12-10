<script setup lang="ts">
  import { ref, reactive, onMounted, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useCalendarStore } from '../../services/calendarStore.ts';
  import { DateButton, CalendarData } from '../../services/types.ts';
  import { getFavourites } from '../../services/getDataService.ts';

  const calendarStore = useCalendarStore();
  const { t } = useI18n();

  const active = ref<number | null>(null);
  const lastMinute = new Date();
  lastMinute.setDate(new Date().getDate() + 14);

  const state = reactive<{
    dateRange: CalendarData['dateRange'];
    minStartDate: CalendarData['minStartDate'];
    buttons: DateButton[];
  }>({
    dateRange: calendarStore.dateRange,
    minStartDate: calendarStore.minStartDate,
    buttons: [],
  });

  onMounted(() => {
    getFavourites()
      .then((favourites: DateButton[]) => {
        state.buttons = (favourites || []).map((favourite: DateButton) => ({
          ...favourite,
          title: t(favourite.text),
          dateRange: {
            startDate: new Date(favourite.dateRange.startDate),
            endDate: new Date(favourite.dateRange.endDate),
          },
          minDate: new Date(favourite.minDate),
        }));
      })
      .catch((err: unknown) => {
        console.log('Error in favourites', err);
      });
  });

  const toggle = (index: number): void => {
    if (active.value === index) {
      active.value = null;
      calendarStore.setDateRange([null, null], 'favourites');
      state.dateRange = [null, null];
      calendarStore.setMinStartDate(new Date());
      state.minStartDate = new Date();
    } else {
      active.value = index;
      const selectedButton = state.buttons[index];

      const newStartDate = new Date(selectedButton.dateRange.startDate);
      const newEndDate = new Date(selectedButton.dateRange.endDate);

      const dateRangeArray: CalendarData['dateRange'] = newEndDate
        ? [newStartDate, newEndDate]
        : [newStartDate, null];

      calendarStore.setDateRange(dateRangeArray, 'favourites');
      state.dateRange = dateRangeArray;
      calendarStore.setMinStartDate(new Date(selectedButton.minDate));
      state.minStartDate = new Date(selectedButton.minDate);
    }
  };

  watch(
    () => calendarStore.dateRange,
    (newDateRange: CalendarData['dateRange']) => {
      const colorButton = state.buttons.findIndex((button) => {
        return (
          button.dateRange.startDate.getTime() === newDateRange[0]?.getTime() &&
          button.dateRange.endDate?.getTime() === newDateRange[1]?.getTime()
        );
      });
      active.value = colorButton !== -1 ? colorButton : null;
    },
    { deep: true }
  );
</script>

<template>
  <div
    class="flex items-left justify-center p-6"
    style="
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-content: space-around;
      justify-content: start;
      gap: 0.5rem;
      margin: 1rem;
      max-width: 315px;
    "
  >
    <button
      v-for="(button, index) in state.buttons"
      :title="button.title"
      :key="index"
      :style="{ backgroundColor: active === index ? '#B41D1DFF' : '#051650FF' }"
      @click="toggle(index)"
    >
      {{ t(button.text) }}
    </button>
  </div>
</template>
