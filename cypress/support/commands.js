// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-file-upload";

Cypress.Commands.add("login", () => {
  cy.visit("https://User:Sinamics2Edge*@141.29.126.144:34569/");
  cy.hash("eq", "#");
  cy.get("#header_home").should("be.visible");
});

Cypress.Commands.add("selectPrimaryMenuHome", () => {
  cy.get("#home_icon_appBar").click();
});

Cypress.Commands.add("selectPrimaryMenuAxisManagement", () => {
  cy.get("#serviceCredential_icon_appBar").click();
});

Cypress.Commands.add("selectPrimaryMenuBeltMonitoring", () => {
  cy.get("#dashboard_icon_appBar").click();
  cy.wait(1000);
});

Cypress.Commands.add("selectPrimaryMenuSetting", () => {
  cy.get(".is-activated > a").click();
});

Cypress.Commands.add("selectPrimaryMenuHelp", () => {
  cy.get("div > :nth-child(2) > a").click();
});

Cypress.Commands.add("selectPrimaryMenuAbout", () => {
  cy.get("#about_icon_appBar").click();
});

// cy.waitUntil(() => {
//   cy.get("#disposableSpinner").then(($el) => $el.length === 0);
// });

// cy.waitUntil(() => cy.window().then(($win) => $win.length === 0), {
//   errorMsg: "This is a custom error message", // overrides the default error message
//   timeout: 2000, // waits up to 2000 ms, default to 5000
//   interval: 500, // performs the check every 500 ms, default to 200
// });

// Cypress.on("test:after:run", (test, runnable) => {
//   cy.waitUntil(() => {
//     cy.get("#disposableSpinner").then(($el) => $el.length === 0),
//       {
//         errorMsg: "This is a custom error message", // overrides the default error message
//         timeout: 20000, // waits up to 2000 ms, default to 5000
//         interval: 500, // performs the check every 500 ms, default to 200
//       };
//   });
// });

Cypress.on("after:spec", (spec, results) => {
  console.log("Finished running", spec.relative);
});

Cypress.Commands.add("deleteAllAxis", () => {
  cy.wait(2000);
  cy.get("ul[class='listNavigation__list']").then(($axesList) => {
    cy.log("Visible = ", $axesList.children().is(":visible"));
    if ($axesList.children().is(":visible")) {
      cy.get("ul[class='listNavigation__list'] li").each(($el, index) => {
        cy.log("Index  ", index);
        cy.wrap($el)
          .get("#axisNameH-" + 0)
          .click()
          .invoke("text")
          .then((axisName) => {
            cy.log("Name = ", axisName);
            cy.get("label[id='input-switchLabel0" + axisName + "']")
              .invoke("text")
              .then((status) => {
                if (status === "Deactivate") {
                  cy.log("Status = ", status);
                  cy.get($el)
                    .get("label[id='activation_axis_" + axisName + "']")
                    .click();
                  cy.wrap($el).get("#confirmationDialogProceed").click();
                  cy.checkToastMessage(
                    axisName + " is successfully deactivated"
                  );
                }
              });
            cy.get("button[id^='deleteAxisBtn-" + 0 + "']").click();
            cy.get("#confirmationDialogProceed").click();
            cy.checkToastMessage(axisName + " deleted successfully.");
          });
      });
    }
  });
});

Cypress.Commands.add("deleteAxis", (axisName, proceedOrCancel) => {
  cy.wait(1000);
  cy.get("ul[class='listNavigation__list']").then(($axesList) => {
    cy.log("Visible = ", $axesList.children().is(":visible"));
    if ($axesList.children().is(":visible")) {
      cy.get("ul[class='listNavigation__list'] li").each(($el, index) => {
        cy.wrap($el)
          .get("#axisNameH-" + index)
          .invoke("text")
          .then((axis) => {
            cy.log("Name = ", axis);
            if (axisName === axis) {
              cy.wrap($el).invoke("index").as("myIndex");
            }
          });
      });
    }
    cy.get("@myIndex").then((id) => {
      cy.log("id = ", id);
      cy.get("button[id^='deleteAxisBtn-" + id + "']").click();
      if (proceedOrCancel === "Proceed") {
        cy.get("#confirmationDialogProceed").click();
      } else {
        cy.get("#confirmationDialogCancel").click();
      }
    });
  });
});

Cypress.Commands.add("addAxis", (numberOfAxis) => {
  let i = 1;
  if (numberOfAxis === 1) {
    cy.get("#add_axis_btn_left").click();
    cy.get("#axisName").type("Axis_Name1");
    cy.get("#axisModelFile").attachFile("s120minimodel_model_new.save");
    cy.get("#axisScalerFile").attachFile("s120minimodel_scaler_new.save");
    cy.get("#axisDataSource").select("1: S120_BeltDemoSet/SERVO_Hiz");
    cy.get("#axisDescription").type("Description");
    cy.get("#axisDialogAdd").click();
    cy.checkToastMessage("Axis_Name1 added successfully.");
  } else {
    while (i <= numberOfAxis) {
      cy.get("#add_axis_btn_left").click();
      cy.get("#axisName").type("Axis_Name" + i);
      cy.get("#axisModelFile").attachFile("s120minimodel_model_new.save");
      cy.get("#axisScalerFile").attachFile("s120minimodel_scaler_new.save");
      cy.get("#axisDataSource").select("1: MySDrive/SERVO_Hiz");
      cy.get("#axisDescription").type("Description");
      cy.get("#axisDialogAdd").click();
      cy.checkToastMessage("Axis_Name" + i + " added successfully.");
      i++;
    }
  }
});

Cypress.Commands.add("checkToastMessage", (message) => {
  cy.log(message);
  cy.get(".notifications li .notification__content")
    .invoke("text")
    .then((el) => {
      // expect(el.trim()).to.eq(message);
      cy.formatString(el).should("eq", message);
    });
  cy.get("a[title='Close']").click();
});

Cypress.Commands.add(
  "activateOrDeactivateAxis",
  (name, activeOrDeactive, proceedOrCancel) => {
    cy.wait(1000);
    cy.get("ul[class='listNavigation__list']").then(($axesList) => {
      cy.log("Visible = ", $axesList.children().is(":visible"));
      if ($axesList.children().is(":visible")) {
        cy.get("ul[class='listNavigation__list'] li").each(($el, index) => {
          cy.log("Index  ", index);
          cy.wrap($el)
            .find("h4")
            .click()
            .invoke("text")
            .then((axisName) => {
              cy.log("Name = ", axisName);
              if (axisName === name) {
                cy.get("label[id='input-switchLabel0" + axisName + "']")
                  .invoke("text")
                  .then((status) => {
                    cy.log("Status test ", status);
                    if (activeOrDeactive === "Activate") {
                      if (status === "Activate") {
                        cy.wait(2000);
                        cy.log("Status = ", status);
                        cy.get($el)
                          .get("label[id='activation_axis_" + axisName + "']")
                          .click();
                        cy.wait(5000);
                        if (proceedOrCancel === "Proceed") {
                          cy.wrap($el)
                            .get("#confirmationDialogProceed")
                            .click();
                          cy.checkToastMessage(
                            axisName + " is successfully activated"
                          );
                        } else {
                          cy.wrap($el).get("#confirmationDialogCancel").click();
                        }
                      }
                    } else {
                      if (status === "Deactivate") {
                        cy.log("Status = ", status);
                        cy.get($el)
                          .get("label[id='activation_axis_" + axisName + "']")
                          .click();
                        if (proceedOrCancel === "Proceed") {
                          cy.wrap($el)
                            .get("#confirmationDialogProceed")
                            .click();
                          cy.checkToastMessage(
                            axisName + " is successfully deactivated"
                          );
                        } else {
                          cy.wrap($el).get("#confirmationDialogCancel").click();
                        }
                      }
                    }
                  });
              }
            });
        });
      }
    });
  }
);

Cypress.Commands.add("activateOrDeactivateAllAxis", (activeOrDeactive) => {
  cy.wait(1000);
  cy.get("ul[class='listNavigation__list']").then(($axesList) => {
    cy.log("Visible = ", $axesList.children().is(":visible"));
    if ($axesList.children().is(":visible")) {
      cy.get("ul[class='listNavigation__list'] li").each(($el, index) => {
        cy.log("Index  ", index);
        cy.wrap($el)
          .find("h4")
          .click()
          .invoke("text")
          .then((axisName) => {
            cy.log("Name = ", axisName);
            cy.get("label[id='input-switchLabel0" + axisName + "']")
              .invoke("text")
              .then((status) => {
                cy.log("Status test ", status);
                if (activeOrDeactive === "Activate") {
                  if (status === "Activate") {
                    cy.log("Status = ", status);
                    cy.get($el)
                      .get("label[id='activation_axis_" + axisName + "']")
                      .click();
                    cy.wrap($el).get("#confirmationDialogProceed").click();
                    cy.checkToastMessage(
                      axisName + " is successfully activated"
                    );
                  }
                } else {
                  if (status === "Deactivate") {
                    cy.log("Status = ", status);
                    cy.get($el)
                      .get("label[id='activation_axis_" + axisName + "']")
                      .click();
                    cy.wrap($el).get("#confirmationDialogProceed").click();
                    cy.checkToastMessage(
                      axisName + " is successfully deactivated"
                    );
                  }
                }
              });
          });
      });
    }
  });
});

Cypress.Commands.add(
  "checkLastAddedAxisTopOfTheList",
  (axisName, isAxisAdded) => {
    if (isAxisAdded === true) {
      cy.get("ul[class='listNavigation__list']").then(($axesList) => {
        cy.log("Visible = ", $axesList.children().is(":visible"));
        if ($axesList.children().is(":visible")) {
          cy.get("ul[class='listNavigation__list'] li")
            .first()
            .find("h4")
            .invoke("text")
            .then((str) => {
              expect(str).eq(axisName);
            });
        }
      });
    } else {
      cy.get("ul[class='listNavigation__list']").then(($axesList) => {
        cy.log("Visible = ", $axesList.children().is(":visible"));
        if ($axesList.children().is(":visible")) {
          cy.get("ul[class='listNavigation__list'] li")
            .first()
            .find("h4")
            .invoke("text")
            .then((str) => {
              expect(str).to.not.eq(axisName);
            });
        }
      });
    }
  }
);

Cypress.Commands.add("clickEditAxis", (name, index) => {
  cy.wait(1000);
  cy.get("ul[class='listNavigation__list']").then(($axesList) => {
    cy.log("Visible = ", $axesList.children().is(":visible"));
    if ($axesList.children().is(":visible")) {
      cy.get("ul[class='listNavigation__list'] li").each(($el, index) => {
        cy.log("Index  ", index);
        cy.wrap($el)
          .find("h4")
          .click()
          .invoke("text")
          .then((axisName) => {
            cy.log("Name = ", axisName);
            if (axisName === name) {
              cy.log("index = ", index);
              cy.wrap($el)
                .find("#editAxisBtn-" + index)
                .click();
            }
          });
      });
    }
  });
});

Cypress.Commands.add("addDescription", (desc) => {
  cy.get("#axisDescription").clear().type(desc);
});

Cypress.Commands.add("clickUpdate", () => {
  cy.get("#axisDialogUpdate").click();
});

Cypress.Commands.add("checkEmptyStateAfterClickAddAxis", () => {
  cy.get("#axisName").invoke("text").should("eq", "");
  cy.get("#axisDataSource")
    .invoke("attr", "class")
    .should("eq", "inputGroup__select ng-untouched ng-pristine ng-invalid");
  cy.get("#axisDescription").invoke("val").should("eq", "");
});

Cypress.Commands.add("formatString", (text) => {
  return text.replace("kr", "").replace("\u00A0", "").trim();
});

Cypress.Commands.add("selectAxisFromAxisListOnBeltMponitoring", (axisName) => {
  cy.wait(3000);
  cy.get("ul[class='listNavigation__list']").then(($axesList) => {
    cy.log("Visible = ", $axesList.children().is(":visible"));
    if ($axesList.children().is(":visible")) {
      cy.get("ul[class='listNavigation__list'] li").each(($el) => {
        cy.wrap($el)
          .get(".label")
          .invoke("text")
          .then((axis) => {
            cy.log("Name = ", axis);
            if (axisName === axis) {
              cy.wrap($el).get(".item__content").click();
            }
          });
      });
    }
  });
});
