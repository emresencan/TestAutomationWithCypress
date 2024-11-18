const axisName = "Axis_Name1";
const axisName2 = "Axis_Name2";

describe("Elongation Score For Active Axis Smoke Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("C650013: Elongation Score With No Axis Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement();
    cy.deleteAllAxis()
      .addAxis(1)
      .activateOrDeactivateAxis(axisName, "Activate", "Proceed");
    cy.selectPrimaryMenuBeltMonitoring();
    cy.selectAxisFromAxisListOnBeltMponitoring(axisName);
    cy.get("#belt_elongation_score_title").should("be.visible");
  });

  it.only("C650014: Previosuly Activated Axis Information Displayed With One Active Axis Test", () => {
    let arr = new Array("0", "20", "40", "60", "80", "100");
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement();
    cy.deleteAllAxis()
      .addAxis(1)
      .activateOrDeactivateAxis(axisName, "Activate", "Proceed");
    cy.reload();
    cy.selectPrimaryMenuBeltMonitoring();
    cy.selectAxisFromAxisListOnBeltMponitoring(axisName);
    cy.wait(5000);
    cy.get("#belt_elongation_score_title").should("be.visible");
    cy.get(".xangularaxistick text").each(($el, index) => {
      cy.wrap($el)
        .invoke("text")
        .then((str) => {
          if (str === arr[index]) {
            cy.log("Range of guage chart is true ", str);
          }
        });
    });
    cy.get(".number")
      .invoke("text")
      .then((number) => {
        cy.log("number =", number);
        if (number < 100) {
          cy.log("Range of guage chart is true ", number);
        }
      });
  });
});
