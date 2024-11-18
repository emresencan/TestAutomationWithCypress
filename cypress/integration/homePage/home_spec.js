describe("Home Page Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Application Header Check Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.contains("p", " Analyze MyDrives /Edge ");
  });

  it("Primary Navigation Icons Check Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url();
    cy.should("include", "/analyzemydrivesedge/home");
    cy.contains("p", " Analyze MyDrives /Edge ");
    cy.contains("p", " V1.1.0");
    cy.get(".appWrapper__appBar li").each(($el) => {
      cy.wrap($el).should("be.visible");
    });
  });

  it("Homepage AppName Version And Description Check Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url();
    cy.should("include", "/analyzemydrivesedge/home");
    cy.contains("p", " Analyze MyDrives /Edge ");
    cy.contains("p", " V1.1.0");
    cy.contains(
      "p",
      " Analyze MyDrives /Edge lets you closely monitor and track your conveyor belts driven by SINAMICS drives"
    );
  });

  it("Homepage Water Mark Icons For Subpages Check Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url();
    cy.should("include", "/analyzemydrivesedge/home");
    cy.get(".cards__row .card").each(($el) => {
      cy.wrap($el).find("span").should("be.hidden");
    });
  });
});
