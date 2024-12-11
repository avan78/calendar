<script setup lang="ts">
  import { useCalendarStore } from '../../services/calendarStore.ts';
  import { sendCalendarData } from '../../services/sendCalendarData.ts';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const calendarStore = useCalendarStore();

  const handleSendButton = (): void => {
    const calendarData: CalendarData = {
      maxNight: calendarStore.maxNight,
      minStartDate: new Date(calendarStore.minStartDate),
      language: calendarStore.language,
      dateRange: [
        calendarStore.dateRange[0]
          ? new Date(calendarStore.dateRange[0])
          : null,
        calendarStore.dateRange[1]
          ? new Date(calendarStore.dateRange[1])
          : null,
      ],
    };

    sendCalendarData(calendarData)
      .then(() => {})
      .catch((err: unknown) => {
        console.log('Error:', err);
      });
  };
</script>

<template>
  <div class="send-button-div">
    <button @click="handleSendButton" class="send-button">
      {{ t('buttons.send') }}
    </button>
  </div>
</template>
