<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useCalendarStore } from '../../services/calendarStore.ts';

  const { t, locale } = useI18n();
  const calendarStore = useCalendarStore();

  const changeLang = (event: Event) => {
    const selectedLang = (event.target as HTMLSelectElement).value;
    locale.value = selectedLang;
    calendarStore.setLanguage(selectedLang);
  };
</script>

<template>
  <p>
    {{ t('calendar.chooseLanguage') }}
    <select
      title="langSelect"
      :value="locale"
      @change="changeLang"
      class="m-1 ml-3"
      style="margin-left: 0.5rem; padding: 0.3rem"
    >
      <option value="cs">{{ t('calendar.czech') }}</option>
      <option value="en">{{ t('calendar.english') }}</option>
    </select>
  </p>
</template>
