import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const lastMinute = new Date();
lastMinute.setDate(new Date().getDate() + 14);

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api/calendar': {
        target: 'http://localhost:3001/calendar',
        changeOrigin: true,
        configure: (proxy: Server) => {
          proxy.on('proxyReq', (proxyReq, req, res): void => {
            if (req.method === 'GET' && req.url === '/api/calendar') {
              const mockCalendar = JSON.stringify({
                maxNight: 30,
                minStartDate: new Date(),
                language: 'cs',
                dateRange: [null, null],
              });
              res.writeHead(200, { 'content-type': 'application/json' });
              res.end(JSON.stringify(mockCalendar));
            }
            if (req.method === 'POST' && req.url === '/api/calendar') {
              let body = '';
              req.on('data', (chunk: any) => {
                body += chunk.toString();
              });
              req.on('end', () => {
                const responseMock = {
                  status: 'success',
                  message: 'Data was successfully sended!',
                };
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(responseMock));
              });
            }
          });
        },
      },
      '/api/favourites': {
        target: 'http://localhost:3001/favourites',
        changeOrigin: true,
        configure: (proxy: Server) => {
          proxy.on('proxyReq', (proxyReq, req, res): void => {
            if (req.url === '/api/favourites') {
              const mockFavourites: {
                text: string;
                dateRange: { startDate: string; endDate: string };
                minDate: string;
              }[] = [
                {
                  text: 'buttons.lastMinute',
                  dateRange: {
                    startDate: new Date().toISOString(),
                    endDate: lastMinute.toISOString(),
                  },
                  minDate: new Date().toISOString(),
                },
                {
                  text: 'buttons.second',
                  dateRange: {
                    startDate: new Date().toISOString(),
                    endDate: '2024-12-31',
                  },
                  minDate: new Date().toISOString(),
                },
                {
                  text: 'buttons.third',

                  dateRange: {
                    startDate: '2025-01-01',
                    endDate: '2025-02-28',
                  },

                  minDate: '2025-01-01',
                },
                {
                  text: 'buttons.fourth',

                  dateRange: {
                    startDate: '2025-03-01',
                    endDate: '2025-04-30',
                  },

                  minDate: '2025-03-01',
                },
                {
                  text: 'buttons.fifth',

                  dateRange: {
                    startDate: '2025-05-01',
                    endDate: '2025-06-30',
                  },

                  minDate: '2025-05-01',
                },
                {
                  text: 'buttons.vacancies',

                  dateRange: {
                    startDate: '2025-07-01',
                    endDate: '2025-08-31',
                  },

                  minDate: '2025-07-01',
                },
              ];
              res.writeHead(200, { 'content-type': 'application/json' });
              res.end(JSON.stringify(mockFavourites));
            }
          });
        },
      },
      '/api/language': {
        target: 'http://localhost:3001/language',
        changeOrigin: true,
        configure: (proxy: Server): void => {
          proxy.on('proxyReq', (proxyReq, req, res): void => {
            if (req.url === '/api/language') {
              const languageData: string[] = ['cs', 'en'];
              res.writeHead(200, { 'content-type': 'application/json' });
              res.end(JSON.stringify(languageData));
            }
          });
        },
      },
    },
  },
});
