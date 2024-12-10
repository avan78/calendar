<script setup lang="ts">
  import { ref } from 'vue';
  import { useCalendarStore } from '../../services/calendarStore.ts';
  import { sendCalendarData } from '../../services/sendCalendarData.ts';
  import { useI18n } from 'vue-i18n';
  import { CalendarData } from '../../services/types.ts';
  const { t } = useI18n();
  const calendarStore = useCalendarStore();
  const errorMessage = ref<string>('');

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
      .then((res: { requestId: string }) => {
        calendarStore.setRequestId(res.requestId);
      })
      .catch((err: unknown) => {
        errorMessage.value = err.message;
      });
  };
</script>

<template>
  <div>
    <button @click="handleSendButton" style="width: 10rem">
      {{ t('buttons.send') }}
    </button>
    <p v-if="errorMessage.value" class="text-danger">
      {{ errorMessage.value }}
    </p>
  </div>
</template>
