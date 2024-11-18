const axisName = "Axis_Name1";
const axisName2 = "Axis_Name2";

describe("Add An Axis And For Belt Elongation Smoke Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("C649955: Add Axis Via UI Success Course While There Is No Previous Axis Exist Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement().deleteAllAxis();
    cy.get("#axis_detail_no_axis_title").should("be.visible");
    cy.get("#add_axis_btn_right").click();
    cy.checkEmptyStateAfterClickAddAxis();
    cy.get("#axisName").type("Axis_Name1");
    cy.get("#axisModelFile").attachFile("s120minimodel_model_new.save");
    cy.get("#axisScalerFile").attachFile("s120minimodel_scaler_new.save");
    cy.get("#axisDataSource").select("1: Kayisli/SERVO_Hiz");
    cy.get("#axisDescription").type("Description");
    cy.get("#axisDialogAdd").click();
    cy.checkToastMessage("Axis_Name1 added successfully.");
  });

  it("C649956: Axis Via UI Success Course While There Is Previous Axis Exist Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement().deleteAllAxis();
    cy.get("#axis_detail_no_axis_title").should("be.visible");
    cy.get("#add_axis_btn_right").click();
    cy.checkEmptyStateAfterClickAddAxis();
    cy.get("#axisName").type("Axis_Name1");
    cy.get("#axisModelFile").attachFile("s120minimodel_model_new.save");
    cy.get("#axisScalerFile").attachFile("s120minimodel_scaler_new.save");
    cy.get("#axisDataSource").select("1: Kayisli/SERVO_Hiz");
    cy.get("#axisDescription").type("Description");
    cy.get("#axisDialogAdd").click();
    cy.checkToastMessage("Axis_Name1 added successfully.");
    cy.get("#add_axis_btn_left").click();
    cy.get("#axisName").type("Axis_Name1");
    cy.get("#axisModelFile").attachFile("s120minimodel_model_new.save");
    cy.get("#axisScalerFile").attachFile("s120minimodel_scaler_new.save");
    cy.get("#axisDataSource").select("1: Kayisli/SERVO_Hiz");
    cy.get("#axisDescription").type("Description");
    cy.get("#axisDialogAdd").click();
    cy.checkToastMessage("An axis with same name already added.");
  });

  it("C649957: Axis Via UI Success Course Upload The Same Datasource, Model & Scaler Files In TestCase T24205 Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement().deleteAllAxis();
    cy.get("#axis_detail_no_axis_title").should("be.visible");
    cy.get("#add_axis_btn_right").click();
    cy.checkEmptyStateAfterClickAddAxis();
    cy.get("#axisName").type("Axis_Name1");
    cy.get("#axisModelFile").attachFile("s120minimodel_model_new.save");
    cy.get("#axisScalerFile").attachFile("s120minimodel_scaler_new.save");
    cy.get("#axisDataSource").select("1: Kayisli/SERVO_Hiz");
    cy.get("#axisDescription").type("Description");
    cy.get("#axisDialogAdd").click();
    cy.checkToastMessage(
      "Axis_Name1 added successfully."
    ).checkLastAddedAxisTopOfTheList("Axis_Name1", true);
  });

  it("C649958: Axis Via UI Success Course While User Cancels Adding A New Axis Operation Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement().deleteAllAxis();
    cy.get("#axis_detail_no_axis_title").should("be.visible");
    cy.addAxis(1);
    cy.get("#add_axis_btn_left").click();
    cy.checkEmptyStateAfterClickAddAxis();
    cy.get("#axisName").type("Axis_Name2");
    cy.get("#axisModelFile").attachFile("s120minimodel_model_new.save");
    cy.get("#axisScalerFile").attachFile("s120minimodel_scaler_new.save");
    cy.get("#axisDataSource").select("1: Kayisli/SERVO_Hiz");
    cy.get("#axisDescription").type("Description");
    cy.get("#axisDialogCancel").click();
    cy.checkLastAddedAxisTopOfTheList("Axis_Name2", false);
  });

  it("C649959: Axis Via UI Fail Course While Max Drive Limit Exceed (Add Axis more than 8 axes) Test", () => {
    cy.selectPrimaryMenuHome();
    cy.url().should("include", "/analyzemydrivesedge/home");
    cy.selectPrimaryMenuAxisManagement().deleteAllAxis();
    cy.get("#axis_detail_no_axis_title").should("be.visible");
    cy.addAxis(8);
    cy.get("#add_axis_btn_left").click();
    cy.checkEmptyStateAfterClickAddAxis();
    cy.get("#axisName").type("Axis_Name9");
    cy.get("#axisModelFile").attachFile("s120minimodel_model_new.save");
    cy.get("#axisScalerFile").attachFile("s120minimodel_scaler_new.save");
    cy.get("#axisDataSource").select("1: Kayisli/SERVO_Hiz");
    cy.get("#axisDescription").type("Description");
    cy.get("#axisDialogAdd").click();
    cy.checkToastMessage(
      "Axis cannot be added. Maximum 8 axes limit is reached"
    );
    cy.checkLastAddedAxisTopOfTheList("Axis_Name9", false);
  });
});
