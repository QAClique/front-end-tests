import { defineConfig, devices } from '@playwright/test';

const browserName = process.env.BROWSER || 'chromium';

const browserMap = {
  chrome:   'chromium',
  chromium: 'chromium',
  firefox:  'firefox',
  safari:   'webkit',
  webkit:   'webkit'
};

export default defineConfig({
  testDir:       './tests',
  fullyParallel: true,
  forbidOnly:    !!process.env.CI,
  retries:       process.env.CI ? 0 : 0,
  workers:       process.env.CI ? 1 : undefined,
  reporter:      'html',

  use: {
    baseURL:     'http://localhost:5173',
    trace:       'on',
    apiFundsUrl: 'http://localhost:5174/api/funds'
  },

  projects: [
    {
      name: browserMap[browserName] || 'chromium',
      use:  {
        ...devices[browserMap[browserName] || 'chromium']
      }
    }
  ],

  webServer: undefined
});
