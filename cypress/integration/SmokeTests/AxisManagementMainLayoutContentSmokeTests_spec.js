const axisName = "Axis_Name1";
const axisName2 = "Axis_Name2";

describe("Axis Management Main Layout Content Smoke Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("C649950: Main navigation url check Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement();
    cy.get("#axis_management_title_div").should("be.visible");
    cy.url().should("include", "/analyzemydrivesedge/axismanagement");
  });

  it("C649951: Secondary Navigation Visibility Control Check Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement();
    cy.get("#axis_management_title_div").should("be.visible");
    cy.get("#add_axis_btn_left").should("be.visible");
    cy.url().should("include", "/analyzemydrivesedge/axismanagement");
    cy.get(".leadingRegionToggleArea").click();
    cy.get(".leadingRegion")
      .parent()
      .invoke("attr", "class")
      .should(
        "eq",
        "appWrapper__regions has-appBar has-leadingRegion appWrapper__regions--pushLayout"
      );
  });

  it("C649952: Main region contains 'No Axis Defined' Empty state when there is no axis available Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement();
    cy.get("#axis_management_title_div").should("be.visible");
    cy.get("#add_axis_btn_left").should("be.visible");
    cy.deleteAllAxis();
    cy.get("#axis_detail_no_axis_title")
      .invoke("text")
      .then((str) => {
        expect(str.trim()).to.eq("No Axis Defined");
        // cy.formatString(str).should("eq", "No Axis Defined");
      });
  });

  it("C649953: Main region contains 'Select An Axis' Empty state when there is no axis selected Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement();
    cy.get("#axis_management_title_div").should("be.visible");
    cy.get("#add_axis_btn_left").should("be.visible");
    cy.deleteAllAxis();
    cy.get("#add_axis_btn_right").click();
    cy.checkEmptyStateAfterClickAddAxis();
  });

  it("C649954: Buttons On Primary Navigation Area Clickability Check Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement();
    cy.get("#axis_management_title_div").should("be.visible");
    cy.get("ul[class='appWrapper__appBar'] li").each(($btns, index) => {
      cy.wrap($btns).click();
    });
  });
});
