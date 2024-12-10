<script setup lang="ts">
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
      primeVue.config.locale =
        i18n.global.messages[newLocale]?.calendar?.picker || {};
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
  <div
    class="mt-4 mb-4 text-left items-center"
    style="margin-bottom: 1rem; margin-top: 1rem; text-align: left"
  >
    <p>
      <SelectLanguage :language="locale.value" />
    </p>
  </div>
  <div class="flex items-center justify-center pt-2">
    <Calendar />
    <Favourites />
  </div>
  <div
    class="mt-4 mb-4 text-right"
    style="margin-top: 1.5rem; text-align: right"
  >
    <SendButton />
  </div>
</template>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
