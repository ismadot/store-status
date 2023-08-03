import { Store, IncidentStatus } from "../Store";

describe("Store", () => {
  let store: Store;

  beforeEach(() => {
    store = new Store();
  });

  it("should report an incident", () => {
    store.reportIncident("Test incident");
    expect(store.incidents.length).toBe(1);
    expect(store.incidents[0].description).toBe("Test incident");
    expect(store.incidents[0].status).toBe("open");
  });

  it("should solve an incident", () => {
    store.reportIncident("Test incident");
    store.solveIncident(1);
    expect(store.incidents[0].status).toBe("solved");
  });

  it("should get all incident descriptions", () => {
    store.reportIncident("Test incident 1");
    store.reportIncident("Test incident 2");
    const descriptions = store.getAllIncidentDescriptions();
    expect(descriptions.length).toBe(2);
    expect(descriptions[0].description).toBe("Test incident 1");
    expect(descriptions[1].description).toBe("Test incident 2");
  });

  it("should get incident status", () => {
    store.reportIncident("Test incident 1");
    store.reportIncident("Test incident 2");
    store.solveIncident(1);
    const from = new Date();
    from.setHours(from.getHours() - 1); // 1 hour ago
    const to = new Date(); // Now
    const status: IncidentStatus = store.incidentStatus(from, to);
    expect(status.openCases).toBe(1);
    expect(status.closedCases).toBe(1);
    expect(status.averageSolutionTime).toBeGreaterThanOrEqual(0);
    expect(status.maximumSolutionTime).toBeGreaterThanOrEqual(0);
  });
});
