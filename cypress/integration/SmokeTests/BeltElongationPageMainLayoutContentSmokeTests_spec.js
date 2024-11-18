describe("Belt Elongation Page Main Layout Content Smoke Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("C650019: Belt Elongation Navigation Check Using Navigation Card Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.get("#belt_monitoring_button").click();
    cy.url().should("include", "/analyzemydrivesedge/beltmonitoring");
    cy.get("#header_belt").should("be.visible");
  });

  it("C650020: Check URL Of The Belt Elongation Page Using Navigation Card Of Belt Elongation Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.get("#belt_monitoring_button").click();
    cy.url().should("include", "/analyzemydrivesedge/beltmonitoring");
    cy.get("#header_belt").should("be.visible");
  });

  it("C650021: Check URL Of The Belt Elongation Page Using App Bar Navigation Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuBeltMonitoring();
    cy.get("#header_belt").should("be.visible");
    cy.url().should("include", "/analyzemydrivesedge/beltmonitoring");
  });

  it("C650022: Mobile Toggle Button Is Visible When Width Is Less Than 1024 Px Test", () => {
    cy.selectPrimaryMenuHome();
    cy.selectPrimaryMenuBeltMonitoring();
    cy.url().should("include", "/analyzemydrivesedge/beltmonitoring");
    cy.viewport(500, 500);
    cy.get(".iconMdsp.sidebar").should("be.visible");
    cy.viewport(1920, 1024);
    cy.get(".iconMdsp.sidebar").should("not.be.visible");
  });

  it("C650024: Application Favicon Test For Belt Elongation Page Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuBeltMonitoring();
    cy.get("link").first().contains("favicon.svg");
  });

  it("C650025: There Is No Active Axis On The Belt Monitoring Page In This Case Check Text And Button On Belt Monitoring Page Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuBeltMonitoring();
    cy.get("#header_belt").should("be.visible");
    cy.get("#belt_detail_no_axis_title")
      .invoke("text")
      .then((str) => {
        // expect(str.trim()).to.eq("No Active Axis");
        cy.formatString(str).should("eq", "No Active Axis");
      });
    cy.get("#belt_detail_no_axis_text")
      .invoke("text")
      .then((str) => {
        // expect(str.trim()).to.eq("No Active Axis");
        cy.formatString(str).should(
          "eq",
          "For conveyor health monitoring, the axis information and trained model files are required and must be activated"
        );
      });
  });

  it("C650026: No Active Axis On The Belt Monitoring Page Click Configure Axis Button Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuBeltMonitoring();
    cy.get("#header_belt").should("be.visible");
    cy.get("#belt_detail_no_axis_title")
      .invoke("text")
      .then((str) => {
        // expect(str.trim()).to.eq("No Active Axis");
        cy.formatString(str).should("eq", "No Active Axis");
      });
    cy.get("#belt_detail_no_axis_text")
      .invoke("text")
      .then((str) => {
        // expect(str.trim()).to.eq("No Active Axis");
        cy.formatString(str).should(
          "eq",
          "For conveyor health monitoring, the axis information and trained model files are required and must be activated"
        );
      });
    cy.get("#configure_axis_btn").should("be.visible").click();
    cy.get("#axis_management_title_div").should("be.visible");
  });

  it("C650027: Primary Navigation Menu Items Titles Are Hidden When Width Is Less Than 1024 Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuBeltMonitoring();
    cy.get("#header_belt").should("be.visible");
    cy.viewport(500, 500);
    cy.get("ul[class='appWrapper__appBar'] li").each(($el) => {
      cy.wrap($el).find("span:nth-child(1)").should("be.visible");
      cy.wrap($el).find(".item__title").should("not.be.visible");
    });
    cy.viewport(1920, 1024);
    cy.get("ul[class='appWrapper__appBar'] li").each(($el) => {
      cy.wrap($el).find("span:nth-child(1)").should("be.visible");
      cy.wrap($el).find(".item__title").should("be.visible");
    });
  });
});
