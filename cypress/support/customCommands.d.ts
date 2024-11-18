/// <reference types="cypress" />
declare namespace Cypress {
    interface Chainable<Subject> {
        login(): Chainable<any>
        selectPrimaryMenuHome(): Chainable<any>
        selectPrimaryMenuAxisManagement(): Chainable<any>
        selectPrimaryMenuBeltMonitoring(): Chainable<any>
        selectPrimaryMenuSetting(): Chainable<any>
        selectPrimaryMenuHelp(): Chainable<any>
        selectPrimaryMenuAbout(): Chainable<any>
        deleteAllAxis(): Chainable<any>
        addAxis(numberOfAxis: any): Chainable<any>
        checkToastMessage(message: any): Chainable<any>
        activateOrDeactivateAxis(name: any, activeOrDeactive: any, proceedOrCancel: any): Chainable<any>
        activateOrDeactivateAllAxis(activeOrDeactive: any): Chainable<any>
        checkLastAddedAxisTopOfTheList(axisName: any): Chainable<any>
        clickEditAxis(name: any, index: any): Chainable<any>
        addDescription(desc: any): Chainable<any>
        clickUpdate(): Chainable<any>
        checkEmptyStateAfterClickAddAxis(): Chainable<any>
        formatString(text: any): Chainable<any>
  }
}