import { browser, by, element, ElementFinder, protractor } from 'protractor';

export class AppPage {
  /** @description
   * reusable function group
   */
  navigateTo() {
    return browser.get('/');
  }
  navigateToWorkshopPage() {
    return browser.get('/dashboard/workshop');
  }

  getInput(inputName: string) {
    return;
  }
  userInput(ef: ElementFinder, userInput: string) {
    ef.sendKeys(userInput);
  }
  createInput(inputType: string, ctrlName: string) {
    element(by.id('workshop_AddInputs')).sendKeys(inputType);
    element(by.id('workshop_InputName')).sendKeys(ctrlName);
    element(by.id('panel_Create')).click();
    this.clearInput();
  }
  clearInput() {
    element(by.id('workshop_AddInputs')).clear();
    element(by.id('workshop_InputName')).clear();
  }
  /** @description
  *   expect function group
  */
  getCreatedInput(ctrlName: string) {
    return element(by.id(ctrlName));
  }
  markInputsAsGroup(input1: string, ...restOfName: string[]) {
    element(by.id('key_' + input1)).click();
    restOfName.forEach(input => {
      element(by.id('key_' + input)).click();
    });
    element(by.id('btn_MarkAsGroup')).click();
  }
  getNumOfHighlightClass() {
    return element.all(by.className('hightlight_group_class')).count();
  }
  setValidationFreq(freq: string) {
    element(by.id('workshop_ValidationTime')).sendKeys(freq);
  }
  setConnectionType(type: string) {
    element(by.id('workshop_AddConnections')).sendKeys(type);
  }
  setAttribute(type: string) {
    element(by.id('workshop_AddAttributes')).sendKeys(type);
  }
  setExtraAttributeInfo(type: string) {
    element(by.id('workshop_Attribute_Extra')).sendKeys(type);
  }
  generateAvaibleConnectionList() {
    element(by.id('btn_SelectAsBase')).click();
  }
  addAttribute() {
    element(by.id('btn_Add')).click();
  }
  setBRAs() {
    const list = element(by.id('connectionDashboard'));
    list.all(by.tagName('div')).get(3).click();
  }
  keyIn(input: string, keys: string) {
    element(by.id('key_' + input)).sendKeys(keys);
  }
  onBlur() {
    element(by.id('onBlurHelper')).click();
  }
  select(input: string) {
    element(by.id('key_' + input)).click();
  }
  selectDollarInput(input: string) {
    element(by.id('key_' + input + '_pipeResult')).click();
  }
  clear(input: string) {
    element(by.id('key_' + input)).clear();
  }

  /**
   * @description DE0004
   * Angular2/4 model does not get clear when just invoke .clear(), below is a work around
   *
   */
  clearModel(input: string) {
    element(by.id('key_' + input)).sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
    element(by.id('key_' + input)).sendKeys(protractor.Key.BACK_SPACE);
    element(by.id('key_' + input)).clear();
  }
  getInputByInputName(input: string) {
    return element(by.id('key_' + input));
  }
  getInputError(input: string) {
    return element(by.id('key_' + input + '_errorMsg'));
  }
  getDollarInputDisplayValue(input: string) {
    return element(by.id('key_' + input + '_pipeResult'));
  }
}
