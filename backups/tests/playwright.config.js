// @ts-check
import { defineConfig,devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 40 *1000,
  expect : { // this is  timeout for the assertions
    timeout: 5000
    
  },
  reporter : 'html',
  use: {
    browserName : 'chromium',
    headless : true, // when false opens browser
    screenshot : 'on', //takes screenshot at every step
    trace : 'on',//'retain-on-failure', // Takes log for every step - helps in debugging displays traces only on failures
    
   
  },

});
module.exports = config // export help ,aking the variable available across all the files og the project


