const axisName = "Axis_Name1";
const axisName2 = "Axis_Name2";

describe("Activate Or Deactive An Axis And For Belt Elongation Smoke Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Activate Axis Via Activate Toggle Success Course. (One Axis Already Added To The System) Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement()
      .deleteAllAxis()
      .addAxis(1)
      .checkLastAddedAxisTopOfTheList(axisName, true)
      .activateOrDeactivateAxis(axisName, "Activate", "Proceed");
  });

  it("Activate Axis Via Activate Toggle Success Course(2 Axis Already Added To The System) Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement()
      .deleteAllAxis()
      .addAxis(2)
      .checkLastAddedAxisTopOfTheList(axisName2, true)
      .activateOrDeactivateAxis(axisName2, "Activate", "Proceed");
  });

  it("Deactivate Axis Via Deactivate Toggle Success Course.(One Axis Already Added To The System) Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement()
      .deleteAllAxis()
      .addAxis(1)
      .checkLastAddedAxisTopOfTheList(axisName, true)
      .activateOrDeactivateAxis(axisName, "Activate", "Proceed")
      .activateOrDeactivateAxis(axisName, "Deactivate", "Proceed");
  });

  it("Deactivate Axis Via Deactivate Toggle Success Course.(Two Axis Already Added To The System) Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement()
      .deleteAllAxis()
      .addAxis(2)
      .checkLastAddedAxisTopOfTheList(axisName2, true)
      .activateOrDeactivateAxis(axisName2, "Activate", "Proceed")
      .activateOrDeactivateAxis(axisName2, "Deactivate", "Proceed");
  });

  it("Activate Axis Via Activate Toggle And Check The Toggle Status While A Job Is In Work Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement()
      .deleteAllAxis()
      .addAxis(1)
      .checkLastAddedAxisTopOfTheList(axisName, true)
      .activateOrDeactivateAxis(axisName, "Activate", "Proceed")
      .activateOrDeactivateAxis(axisName, "Activate", "Proceed");
  });

  it("Deactivate Axis Via Deactivate Toggle And Check The Toggle Status While A Job Is In Work Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement()
      .deleteAllAxis()
      .addAxis(1)
      .checkLastAddedAxisTopOfTheList(axisName, true)
      .activateOrDeactivateAxis(axisName, "Activate", "Proceed")
      .activateOrDeactivateAxis(axisName, "Deactivate", "Proceed")
      .activateOrDeactivateAxis(axisName, "Deactivate", "Proceed");
  });

  it("Deactivate Axis Via Deactivate Toggle And Press Cancel In The Confirmation Box Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement()
      .deleteAllAxis()
      .addAxis(1)
      .checkLastAddedAxisTopOfTheList(axisName, true)
      .activateOrDeactivateAxis(axisName, "Activate", "Proceed")
      .activateOrDeactivateAxis(axisName, "Deactivate", "Cancel");
  });

  it("Update Desc Area While The Axis Activated Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement()
      .deleteAllAxis()
      .addAxis(1)
      .checkLastAddedAxisTopOfTheList(axisName, true)
      .clickEditAxis(axisName)
      .addDescription("Update desc")
      .clickUpdate()
      .checkToastMessage("Axis_Name1 updated successfully.");
  });
});
