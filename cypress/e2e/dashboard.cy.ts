describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should render the SummaryHeader with correct title", () => {
    cy.get("header").within(() => {
      cy.contains("h1", "Commit Tracker").should("be.visible");
    });
  });

  it("should render the SummaryAside with input fields and buttons", () => {
    cy.get("aside").within(() => {
      cy.get("input#repoInput").should("be.visible");
      cy.get("button").contains("Add Repo").should("be.visible");
      cy.get("input#startDate").should("be.visible");
      cy.get("input#endDate").should("be.visible");
      cy.get("button").contains("Generate Summary").should("be.visible");
    });
  });

  it("should allow adding a repo and clear the input field", () => {
    const repoName = "test-repo";

    cy.get("input#repoInput").type(repoName);
    cy.get("button").contains("Add Repo").click();

    cy.get("aside").contains(repoName).should("be.visible");

    cy.get("input#repoInput").should("have.value", "");
  });
});
