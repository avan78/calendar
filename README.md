# # Calendar project

Vítejte, toto je řešení vašeho zadání komponenty kalendář s oblíbenými termíny.

1) Na začátku stálo rozhodnutí, zda používat knihovnu komponent nebo ne (v zadání to nebylo vyžadováno ani zakázáno). Vzhledem k tomu, že větší projekty standardně používají tyto knihovny, je jedna z nich i tady. Nejprve byla implementována Vuetify, později byla nahrazena PrimeVue, která je lépe přizpůsobena pro práci s konponentami a i pro tento případ. Všechny ostatní prvky jsou vytvořeny "ručně" pro případ, že nechcete používat knihovny (za běžných okolností by mělo být vše jednotné).
4) Kalendář je dvouměsíční, lze v něm zadávat datový rozsah.
5) K ukládání dat slouží Pinia state management. Načítají se zde výchozí hodnoty z BE (kromě tlačítek "oblíbené termíny", které se načítají přímo v komponentě), ukládají se sem data zadaná ručně v kalendáři, v oblíbených a v jazykovém nastavení. Jestliže vyberu rozsah z oblíbených termínů z komponenty Favourites, zobrazí se vybrané dny v kalendáři. Při zadávání rozsahu z kalendáře i z oblíbených termínů se zároveň nastaví i minimální počáteční datum. Datový rozsah a další požadovaná data uložená ve storu se odesílají tlačítkem "odeslat/send" na BE v nezměněné podobě (případnou úpravu časových údajů je možné řešit na FE i na BE).
6) V kalendáři i celé aplikaci je možno přepínat mezi českou a anglickou verzí. Lokalizaci zajišťuje i18n a objekt se dvěma textovými variantami.
7) Volání BE jsou vytvořena pomocí falešných endpointů pomocí Vite Proxy. Tři podle zadání načítají data, čtvrté odesílá data. Mockovací data a stejně tak data pro překlad v i18n jsou pro tyto účely zahrnuty přímo v souboru, v případě běžné aplikace a většího rozsahu dat se extrahují do samostatného souboru.
8) V komponentě z PrimeVue je použit původní Theming. To však způsobuje, že všechny komponenty lze stylovat pomocí style namísto Tailwindu. Z estetických důvodů prozatím ponechávám a na přenastavení stylování a mobilním zobrazení pracuji.
9) Asi nejtěžší bylo na začátku vybrat knihovny a správné nástroje (s Vue pracuji poprvé, takže to zahrnuje i spoustu vyhledávání a čtení všelijaké dokumentace) a celkově se technologicky zorientovat. Dále také nastavení speciální lokalizace pro komponentu z PrimeVue. Po úspěšné implementaci se bohužel objevily aktuální warningy. Naopak velmi rychle se podařilo nastavit volání endpointů ve Vue a celkově zařídit načítání a odesílání dat.
10) Chválím smysluplné zadání!
