import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('magic-form-builder App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  /**
   * @description create one text input
   */
  it('should create text input', () => {
    page.navigateToWorkshopPage();
    page.createInput('text','inputField1');
    // browser.pause();
    expect(page.getCreatedInput('key_'+'inputField1').getTagName()).toEqual('input');
  });
  /**
   * @description 
   * create group inputs(three),mark two of them as Group
   */
  it('should create group of text inputs', () => {
    page.navigateToWorkshopPage();
    page.createInput('text','inputField1');
    page.createInput('text','inputField2');
    page.createInput('text','inputField3');
    page.markInputsAsGroup('inputField1','inputField2');
    // browser.pause();
    expect(page.getNumOfHighlightClass()).toEqual(2);
  });
  /**
   * @description 
   * create group inputs(three),mark two of them as Group,
   * Business case: show desired input when all group member has value
   * Validation frequency: onBlur
   */
  it('Business case: should hide desired input when {{all group member has value}} apply | onBlur', () => {
    page.navigateToWorkshopPage();
    page.createInput('text','inputField1');
    page.createInput('text','inputField2');
    page.createInput('text','inputField3');
    page.markInputsAsGroup('inputField1','inputField2');
    page.select('inputField3');
    page.setValidationFreq('onBlur');
    page.setConnectionType('Show');
    page.generateAvaibleConnectionList();
    page.setBRAs();
    //validating BR
    expect(page.getInputByInputName('inputField3').isPresent()).toBe(false);
  });
  it('Business case: should hide desired input when {not} {{all group member has value}} | onBlur', () => {
    page.navigateToWorkshopPage();
    page.createInput('text','inputField1');
    page.createInput('text','inputField2');
    page.createInput('text','inputField3');
    page.markInputsAsGroup('inputField1','inputField2');
    page.select('inputField3');
    page.setValidationFreq('onBlur');
    page.setConnectionType('Show');
    page.generateAvaibleConnectionList();
    page.setBRAs();
    //validating BR
    page.keyIn('inputField1','userInput');//only enter one text input field of group
    page.onBlur()
    expect(page.getInputByInputName('inputField3').isPresent()).toBe(false);
  });
  it('Business case: should show desired input when {{all group member has value}} | onBlur', () => {
    page.navigateToWorkshopPage();
    page.createInput('text','inputField1');
    page.createInput('text','inputField2');
    page.createInput('text','inputField3');
    page.markInputsAsGroup('inputField1','inputField2');
    page.select('inputField3');
    page.setValidationFreq('onBlur');
    page.setConnectionType('Show');
    page.generateAvaibleConnectionList();
    page.setBRAs();
    //validating BR
    page.keyIn('inputField1','userInput');//only enter one text input field of group
    page.keyIn('inputField2','userInput2');
    page.onBlur()
    // browser.pause();
    expect(page.getInputByInputName('inputField3').isPresent()).toBe(true);
  });
  /**
   * @description 
   * create one text input field,
   * Business case: add attribute mandatory
   * Validation frequency: realTime 
   * //TODO chang to onBlur
   */
  it('Business case: should display error msg when mandatory input is empty', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Mandatory');
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.select(inputName);
    page.onBlur()
    expect(page.getInputError(inputName).isPresent()).toBe(true);
  });
  it('Business case: should not display error msg when mandatory input has value', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Mandatory');
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.keyIn(inputName,'userInput');
    page.onBlur()
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  it('Business case: should display error msg when mandatory input value is cleared', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Mandatory');
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.keyIn(inputName,'userInput');
    page.onBlur()
    page.clearModel(inputName);
    page.onBlur();
    expect(page.getInputError(inputName).isPresent()).toBe(true);
  });
  /**
   * @description 
   * create one text input field,
   * Business case: add attribute number only
   * Validation frequency: realTime
   */
  it('Business case: should {{not}} display error msg when {{number only}} input is empty', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Number Only');
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.select(inputName);
    page.onBlur()
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  it('Business case: should display error msg when {{number only}} input has not only number value', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Number Only');
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.keyIn(inputName,'123userInput');
    page.onBlur()
    expect(page.getInputError(inputName).isPresent()).toBe(true);
  });
  it('Business case: should not display error msg when {{number only}} input value is cleared', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Number Only');
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.keyIn(inputName,'123userInput');
    page.onBlur()
    page.clearModel(inputName);
    page.onBlur();
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  it('Business case: should not display error msg when {{number only}} input value only has number', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Number Only');
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.keyIn(inputName,'12345');
    page.onBlur()
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  /**
   * @description 
   * create one text input field,
   * Business case: add attribute minlength 10
   * Validation frequency: realTime
   */
  it('Business case: should {{not}} display error msg when {{minlength 10}} input is not touched', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Min Length');
    page.setExtraAttributeInfo("10");
    page.select(inputName);
    page.addAttribute();
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  it('Business case: should {{not}} display error msg when {{minlength 10}} input is selected and input empty', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Min Length');
    page.setExtraAttributeInfo("10");
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.select(inputName);
    page.onBlur()
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  it('Business case: should display error msg when {{minlength 10}} input input length less than {{10}}', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Min Length');
    page.setExtraAttributeInfo("10");
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.keyIn(inputName,'123456789');
    page.onBlur()
    expect(page.getInputError(inputName).isPresent()).toBe(true);
  });
  it('Business case: should {{not}} display error msg when {{minlength 10}} input value is cleared', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Min Length');
    page.setExtraAttributeInfo("10");
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.keyIn(inputName,'0123456789');
    page.onBlur()
    page.clearModel(inputName);
    page.onBlur();
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  it('Business case: should not display error msg when {{minlength 10}} input length more than 10', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Min Length');
    page.setExtraAttributeInfo("10");
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.keyIn(inputName,'012345678910');
    page.onBlur()
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  /**
   * @description 
   * create one text input field,
   * Business case: add attribute maxlength 10
   * Validation frequency: realTime
   */
  it('Business case: should {{not}} display error msg when {{maxlength 10}} input is not touched', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Max Length');
    page.setExtraAttributeInfo("9");
    page.select(inputName);
    page.addAttribute();
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  it('Business case: should {{not}} display error msg when {{maxlength 10}} input is selected and input empty', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Max Length');
    page.setExtraAttributeInfo("10");
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.select(inputName);
    page.onBlur()
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  it('Business case: should {{not}} display error msg when {{maxlength 10}} input input length less than {{10}}', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Max Length');
    page.setExtraAttributeInfo("10");
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.keyIn(inputName,'123456789');
    page.onBlur()
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  it('Business case: should {{not}} display error msg when {{maxlength 10}} input value is cleared', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Max Length');
    page.setExtraAttributeInfo("10");
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.keyIn(inputName,'012345678910');
    page.onBlur()
    page.clearModel(inputName);
    page.onBlur();
    expect(page.getInputError(inputName).isPresent()).toBe(false);
  });
  it('Business case: should display error msg when {{maxlength 10}} input length more than 10', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('text',inputName);
    page.setAttribute('Max Length');
    page.setExtraAttributeInfo("10");
    page.select(inputName);
    page.addAttribute();
    //validating BR
    page.keyIn(inputName,'012345678910');
    page.onBlur()
    expect(page.getInputError(inputName).isPresent()).toBe(true);
  });
  /**
   * @description 
   * create one dollar input field,
   * Business case: user input value and value displayed in correct format
   * Validation frequency: onBlur
   */
  it('Business case: should display CAD 0.00 when input empty ', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('dollar',inputName);
    page.selectDollarInput(inputName);
    page.onBlur()
    expect(page.getDollarInputDisplayValue(inputName).getText()).toEqual('CAD 0.00');
  });
  it('Business case: should display CAD 5,000.00 when input is 5000 ', () => {
    let inputName='inputField1';
    page.navigateToWorkshopPage();
    page.createInput('dollar',inputName);
    page.selectDollarInput(inputName);
    page.keyIn(inputName,'5000');
    page.onBlur()
    expect(page.getDollarInputDisplayValue(inputName).getText()).toEqual('CAD 5,000.00');
  });
});
