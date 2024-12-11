<script setup lang="ts" xmlns:>
  import { onMounted, watch } from 'vue';
  import { usePrimeVue } from 'primevue/config';
  import Calendar from './components/calendar/Calendar.vue';
  import SendButton from './components/sendButton/SendButton.vue';
  import Favourites from './components/favourites/Favourites.vue';
  import SelectLanguage from './components/selectLanguage/SelectLanguage.vue';
  import { useI18n } from 'vue-i18n';
  import i18n from './i18n.ts';
  import { useCalendarStore } from './services/calendarStore.ts';

  const { locale } = useI18n();
  const calendarStore = useCalendarStore();
  const primeVue = usePrimeVue();

  const changeLang = (newLocale: string) => {
    if (primeVue) {
      primeVue.config.locale = i18n.global.messages[newLocale]?.calendar?.picker || {};
    }
  };

  onMounted(() => {
    calendarStore.initializeData();
    locale.value = calendarStore.language;
    changeLang(locale.value);
  });

  watch(
    () => locale.value,
    (newLocale) => {
      changeLang(newLocale);
    }
  );
</script>

<template>
  <div class="mx-auto px-4">
      <SelectLanguage :language="locale.value" />
      <Calendar />
      <Favourites />
      <SendButton />
  </div>
</template>
