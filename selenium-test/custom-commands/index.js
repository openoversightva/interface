function initCommands() {
  browser.addCommand('scroll', (_x, _y) => {
    browser.execute((x, y) => { window.scrollTo(x, y); }, _x, _y);
  });

  browser.addCommand(
    'waitForUrl',
    function (validator, timeout, interval=50) {
      try {
        browser.waitUntil(
          () => {
            try {
              validator(browser.getUrl());
              return true;
            } catch (e) {
              return false;
            }
          },
          timeout,
          interval
        );
      } catch (e) {
        // print validator error message
        validator(browser.getUrl());
      }
    }
  );

  browser.addCommand(
    'waitForText',
    function (text, timeout, reverse=false) {
      this.waitForDisplayed(timeout);
      browser.waitUntil(
        () => (this.getText() === text) !== reverse,
        timeout,
        `${this.selector}'s text still ${reverse ? '' : 'not'} equals ${text} after ${timeout || '{waitforTimeout}'}ms`
      );
    },
    true
  );

  browser.addCommand(
    'waitForDisplayedInViewport',
    function (timeout, reverse=false) {
      browser.waitUntil(
        () => this.isDisplayedInViewport() !== reverse,
        timeout,
        `${this.selector} is still ${reverse ? '' : 'not'} in viewport after ${timeout || '{waitforTimeout}'}ms`
      );
    },
    true
  );

  browser.addCommand(
    'waitForCSSProperty',
    function (attr, verifier, timeout) {
      browser.waitUntil(
        () => verifier(this.getCSSProperty(attr).value),
        timeout,
        `${this.selector} still does not satisfy ${verifier} after ${timeout || '{waitforTimeout}'}ms`
      );
    },
    true
  );

  browser.addCommand(
    'waitForCount',
    function (count, timeout) {
      browser.waitUntil(
        () => this.count === count,
        timeout,
        `Expecting ${count} of ${this.selector} after ${timeout || '{waitforTimeout}'}ms`
      );
    },
    true
  );

  browser.addCommand(
    'clickAt',
    function (x, y) {
      const location = this.getLocation();
      browser.performActions([{
        type: 'pointer',
        id: this.elementId,
        parameters: {
          pointerType: 'mouse',
        },
        actions: [
          { type: 'pointerMove', 'duration': 0, 'x': parseInt(location.x + x), 'y': parseInt(location.y + y) },
          { type: 'pointerDown', button: 0 },
          { type: 'pointerUp', button: 0 },
        ],
      }]);
    },
    true
  );

  browser.addCommand('setLocalStorage', (_key, _value) => {
    browser.execute(function (key, value) {
      return this.localStorage.setItem(key, value);
    }, _key, _value);
  });

  browser.addCommand('removeLocalStorage', (_key) => {
    browser.execute(function (key) {
      return this.localStorage.removeItem(key);
    }, _key);
  });

  browser.addCommand('getLocalStorage', _key => {
    return browser.execute(function (key) {
      return this.localStorage.getItem(key);
    }, _key);
  });

  browser.addCommand('clearLocalStorage', () => {
    browser.execute(function () {
      this.localStorage.clear();
    });
  });

}

module.exports = initCommands;
