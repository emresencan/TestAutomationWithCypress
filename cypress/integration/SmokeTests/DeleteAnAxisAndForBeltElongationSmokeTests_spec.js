const axisName = "Axis_Name1";
const axisName2 = "Axis_Name2";

describe("Delete An Axis And For Belt Elongation Smoke Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("C649975: Delete Axis Via Trash Icon Button Success Course.(One Axis Already Added To The System) Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement();
    cy.deleteAllAxis().addAxis(2);
    cy.checkLastAddedAxisTopOfTheList("Axis_Name2", true)
      .activateOrDeactivateAllAxis("Deactivate")
      .deleteAxis(axisName, "Proceed")
      .checkToastMessage(axisName + " deleted successfully.");
  });

  it("C649976: Delete Axis Via Trash Icon Button Success Course.(3 Axis Already Added To The System) Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement();
    cy.deleteAllAxis().addAxis(3);
    cy.checkLastAddedAxisTopOfTheList("Axis_Name1", false)
      .checkLastAddedAxisTopOfTheList("Axis_Name2", false)
      .checkLastAddedAxisTopOfTheList("Axis_Name3", true)
      .activateOrDeactivateAllAxis("Deactivate")
      .deleteAxis("Axis_Name2", "Proceed")
      .checkToastMessage(axisName2 + " deleted successfully.")
      .activateOrDeactivateAllAxis("Deactivate")
      .deleteAxis("Axis_Name3", "Proceed")
      .checkToastMessage("Axis_Name3" + " deleted successfully.");
  });

  it("C649977: Cancel Deletion Operation Success Course Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement();
    cy.deleteAllAxis()
      .addAxis(1)
      .activateOrDeactivateAllAxis("Deactivate")
      .deleteAxis(axisName, "Cancel")
      .checkLastAddedAxisTopOfTheList(axisName, true);
  });

  it("C649978: Delete An Axis Fails When Belt Elongation Inference Process Is Active For Current Axis Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement();
    cy.deleteAllAxis()
      .addAxis(1)
      .activateOrDeactivateAllAxis("Activate")
      .deleteAxis(axisName, "Proceed")
      .checkToastMessage(
        axisName +
          " cannot be deleted since belt elongation score is being calculated for " +
          axisName
      )
      .checkLastAddedAxisTopOfTheList(axisName, true);
  });
});
