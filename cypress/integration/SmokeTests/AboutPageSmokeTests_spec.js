describe("About Page Smoke Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Check The About Page URL Using Chrome Browser Test", () => {
    cy.selectPrimaryMenuAbout();
    cy.url().should("include", "/analyzemydrivesedge/about");
  });

  it("Check App Bar Primary Navigation Using Chrome Browser Test", () => {
    cy.selectPrimaryMenuAbout();
    cy.url().should("include", "/analyzemydrivesedge/about");
    cy.get("#header_about").should("be.visible");
    cy.get(".appWrapper__appBar li").each(($el) => {
      cy.wrap($el).should("be.visible");
    });
  });

  it("Check Home Button On The App Bar Using Chrome Browser Test", () => {
    cy.selectPrimaryMenuAbout();
    cy.url().should("include", "/analyzemydrivesedge/about");
    cy.get("#header_about").should("be.visible");
    cy.selectPrimaryMenuHome();
    cy.get("#header_home").should("be.visible");
    cy.url();
    cy.should("include", "/analyzemydrivesedge/home");
  });

  it("Check Belt Monitoring Button On The App Bar Using Chrome Browser Test", () => {
    cy.selectPrimaryMenuAbout();
    cy.url().should("include", "/analyzemydrivesedge/about");
    cy.get("#header_about").should("be.visible");
    cy.selectPrimaryMenuBeltMonitoring();
    cy.get("#header_belt").should("be.visible");
    cy.url();
    cy.should("include", "/analyzemydrivesedge/beltmonitoring");
  });

  it("Check Axis Management Button On The App Bar Using Chrome Browser Test", () => {
    cy.selectPrimaryMenuAbout();
    cy.url().should("include", "/analyzemydrivesedge/about");
    cy.get("#header_about").should("be.visible");
    cy.selectPrimaryMenuAxisManagement();
    cy.get("#axis_management_title_div").should("be.visible");
    cy.url();
    cy.should("include", "/analyzemydrivesedge/axismanagement");
  });

  it("Check Help Button On The App Bar Using Chrome Browser Test", () => {
    cy.selectPrimaryMenuAbout();
    cy.url().should("include", "/analyzemydrivesedge/about");
    cy.get("#header_about").should("be.visible");
    cy.selectPrimaryMenuHelp();
    cy.get("#header_help").should("be.visible");
    cy.url();
    cy.should("include", "/analyzemydrivesedge/help");
  });

  it("Check About Button On The App Bar Using Chrome Browser Test", () => {
    cy.selectPrimaryMenuAbout();
    cy.url().should("include", "/analyzemydrivesedge/about");
    cy.get("#header_about").should("be.visible");
    cy.selectPrimaryMenuAbout();
    cy.get("#header_about").should("be.visible");
    cy.url();
    cy.should("include", "/analyzemydrivesedge/about");
  });

  it("Check Primary Navigation Texts Apperance Smaller Than 1024 Px Using Chrome Browser Test", () => {
    cy.selectPrimaryMenuAbout();
    cy.url().should("include", "/analyzemydrivesedge/about");
    cy.get("#header_about").should("be.visible");
    cy.viewport(550, 750);
    cy.get(".appWrapper__appBar li").each(($el) => {
      cy.wrap($el).should("be.visible");
    });
    cy.get("ul li .item__title").each(($el) => {
      cy.wrap($el).should("be.hidden");
    });
  });

  it("Check The Name Of Page Using Chrome Browser Test", () => {
    cy.selectPrimaryMenuAbout();
    cy.url().should("include", "/analyzemydrivesedge/about");
  });

  it("About Page Informative Area Using Chrome Browser Test", () => {
    cy.selectPrimaryMenuAbout();
    cy.url().should("include", "/analyzemydrivesedge/about");
    cy.get("#app_name").should("have.text", " Analyze MyDrives /Edge ");
    cy.get("#app_version").should("have.text", " V1.1.0");
    cy.get("#app_legal").should(
      "have.text",
      " Copyright © 2021 Siemens AG. All rights reserved."
    );
  });

  it("Check HTML Button On The Third Party Software Area In The Main Region Test", () => {
    cy.selectPrimaryMenuAbout();
    cy.url().should("include", "/analyzemydrivesedge/about");
    cy.get("#thirdParty_html_button").invoke("removeAttr", "target").click();
    cy.url().should("include", "/assets/html/amde_third_party.html");
  });
});
