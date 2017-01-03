'use strict';

import Section from './section';
import Page from './page';


class RichTextToolbar extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      element: '.test--rich-text-toolbar',
      boldButton: '.test--rich-text-bold',
      italicButton: '.test--rich-text-italic',
      linkButton: '.test--rich-text-link',
      urlInput: '.test--toolbar-url-input'
    });
  }
}

class LoginScreen extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      loginModal: '.test--login-modal',
      loginNameInput: '.test--login-modal .name-input-wrapper input',
      loginPasswordInput: '.test--login-modal .password-input-wrapper input',
      loginButton: '.test--login-modal .test--login-button',
      forgotPasswordButton: '.test--forgot-password-link',
      forgotPasswordModal: '.test--forgot-password-modal',
      emailInput: '.test--login-modal .email-input-wrapper input',
      resetPasswordButton: '.test--reset-password'
    });
  }

  enterCredentials(username, password) {
    this.loginModal.waitForVisible(10000);
    this.loginNameInput.setValue(username);
    this.loginPasswordInput.setValue(password);
  }

  login() {
    this.enterCredentials('username', 'password');
    this.loginButton.click();
    this.loginModal.waitForExist(10000, true);
  }
}

class HeroSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      heroFirstRichTextEditor: 'div[contenteditable="true"]',
      firstRichTextBlock: 'div[contenteditable="true"] span[data-text="true"]',
      editToggle: '.edit-toggle a',
      boldTextSpan: '.test--hero-title div[contenteditable="true"] span[style="font-weight: bold;"]',
      italicTextSpan: '.test--hero-title div[contenteditable="true"] span[style="font-style: italic;"]',
      linkTextSpan: '//div[@class="test--hero-title"]//span[contains(@style, "text-decoration: underline;")]',
      title: '.test--hero-title div[contenteditable="true"]',
      complaintsText: '.test--hero-complaints div[contenteditable="true"]',
      useOfForceText: '.test--hero-use-of-force div[contenteditable="true"]'
    });
  }

  edit(text) {
    this.editToggle.click();
    this.heroSection.heroFirstRichTextEditor.click();
    browser.keys(text);
  }
}

class ReportingSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editToggle: '//div[@class="test--reporting-section"]//div[@class="edit-toggle"]//a',
      headerTitle: '//div[@class="test--reporting-section-header"]//div[@data-contents="true"]',
      numberEntriesInput: '//div[@class="test--reporting-section"]//input',
      strategiesSelect: '//div[@class="test--reporting-section"]//select',
      cancelButton: '//div[@class="test--reporting-section"]//a[contains(@class, "cancel-button")]',
      updateButton: '//div[@class="test--reporting-section"]//a[contains(@class, "update-button")]',
      report: '//div[@class="report"]',
      reportBottomSheet: '//div[@class="report-bottom-sheet"]',
      moreButton: '//div[@class="test--reporting-section"]//a'
    });
  }
}

class FAQSection extends Section {
  constructor() {
    super();

    this.prepareElementGetters({
      editToggle: '//div[@class="test--faq-section"]//div[@class="edit-toggle"]//a',
      headerTitle: '//div[@class="test--faq-section-header"]//div[@data-contents="true"]',
      numberEntriesInput: '//div[@class="test--faq-section"]//input',
      strategiesSelect: '//div[@class="test--faq-section"]//select',
      cancelButton: '//div[@class="test--faq-section"]//a[contains(@class, "cancel-button")]',
      updateButton: '//div[@class="test--faq-section"]//a[contains(@class, "update-button")]',
      faq: '//div[@class="test--faq-section"]//div[@class="test--faq-item"]',
      faqBottomSheet: '//div[@class="faq-bottom-sheet"]',
      moreButton: '//div[@class="test--faq-section"]//a'
    });
  }
}

class VFTGSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editToggle: '//div[@class="test--vftg-section"]//div[@class="edit-toggle"]//a',
      headerTitle: '//*[@class="test--vftg-header"]//div[@data-block="true"]',
      datePicker: '//div[@class="test--vftg-section"]//span[contains(@style, "date-picker-pink.svg")]',
      datePickerForm: '//div[@class="react-datepicker"]',
      cancelButton: '//div[@class="test--vftg-section"]//a[contains(@class, "cancel-button")]',
      updateButton: '//div[@class="test--vftg-section"]//a[contains(@class, "update-button")]',
      content: '//span[@data-text and text()="Real Independence for Police Oversight Agencies"]',
      mostRecentEmail: '//div[@class="test--vftg-section"]//span[text()="Most Recent Email"]',
      linkPicker: '//div[@class="test--vftg-section"]//span[contains(@style, "link-pink.svg")]',
      linkInput: '//div[@class="test--vftg-section"]//div[@class="test--link-picker"]//input',
      subscribeForm: '//input[@class="subscribe-form__input"]',
      subscribeButton: '//button//span[text()="Subscribe"]',
      subscribeSuccess: '//*[@class="test--check-mark"]',
      subscribeFailure: '//*[@class="test--cross-mark"]'
    });
  }
}

class AboutSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editToggle: '//div[@class="test--about-section"]//div[@class="edit-toggle"]//a',
      headerTitle: '//*[@class="test--about-section-header"]//div[@data-block="true"]',
      cancelButton: '//div[@class="test--about-section"]//a[contains(@class, "cancel-button")]',
      updateButton: '//div[@class="test--about-section"]//a[contains(@class, "update-button")]',
      content: '//div[@class="test--about-section-content"]//div[@data-contents="true"]'
    });
  }
}

class CollaborateSection extends Section {
  constructor() {
    super();
    this.prepareElementGetters({
      editToggle: '//div[@class="test--collaborate-section"]//div[@class="edit-toggle"]//a',
      headerTitle: '//*[@class="test--collaborate-section-header"]//div[@data-block="true"]',
      cancelButton: '//div[@class="test--collaborate-section"]//a[contains(@class, "cancel-button")]',
      updateButton: '//div[@class="test--collaborate-section"]//a[contains(@class, "update-button")]',
      content: '//div[@class="test--collaborate-section-content"]//div[@data-contents="true"]'
    });
  }
}

class LandingPage extends Page {
  constructor() {
    super();
    this.vftgSection = new VFTGSection();
    this.loginScreen = new LoginScreen();
    this.heroSection = new HeroSection();
    this.richTextToolbar = new RichTextToolbar();
    this.reportingSection = new ReportingSection();
    this.faqSection = new FAQSection();
    this.aboutSection = new AboutSection();
    this.collaborateSection = new CollaborateSection();
  }

  open() {
    super.open('');
    this.vftgSection.subscribeForm.waitForVisible();
  }

  enterEditMode() {
    browser.keys('Escape');
  }

  openEditMode() {
    this.enterEditMode();
    this.loginScreen.login();
  }

  enterUrl(url) {
    browser.keys(url);
  }
}

module.exports = new LandingPage();
