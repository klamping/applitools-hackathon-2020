const { viewports } = require('../../../utils/constants.js');
const home = require('../../pageObjects/home.js');

const {
  Eyes,
  Target,
  VisualGridRunner,
  Configuration,
  DeviceName,
  ScreenOrientation
} = require('@applitools/eyes-webdriverio');

const eyes = new Eyes(new VisualGridRunner(10));

eyes.setBatch({
  id: '1',
  name: 'UFG Hackathon'
})

const configuration = new Configuration();
configuration.setAppName('Demo app');
configuration.setTestName('Task 1');

configuration.addBrowser(1200, 700, "chrome");
configuration.addBrowser(1200, 700, "firefox");
configuration.addBrowser(1200, 700, "edgechromium");
configuration.addBrowser(768, 700, "chrome");
configuration.addBrowser(768, 700, "firefox");
configuration.addBrowser(768, 700, "edgechromium");
configuration.addDeviceEmulation('iPhone X', 'portrait');

// Set your private API key here or in the "APPLITOOLS_API_KEY" environment variable
configuration.setApiKey(process.env.APPLITOOLS_API_KEY);
eyes.setConfiguration(configuration);

describe('Cross-device elements', function () {
    before(function () {
        home.load();

        browser.call(() => {
            return eyes.open(browser, 'Demo App', 'Task 1', {
                width: 800,
                height: 600
            });
        });
    });

    after(function () {
        browser.call(() => {
            return eyes.closeAsync();
        })
        browser.call(() => {
            return eyes.abortIfNotClosed();
        })
    })

    it('should look visually perfect', function () {
        // run my eyes check
        browser.call(() => {
            return eyes.check('Cross-Device Elements Test', Target.window())
        })
    });
})