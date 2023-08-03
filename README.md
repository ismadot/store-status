# Store Incident Management System

This repository contains a simple Store Incident Management System implemented in TypeScript and React. The core logic of the system is encapsulated in the `Store` class, which is defined in the `src/Store.ts` file. This class provides methods for reporting and solving incidents, as well as retrieving incident status information.

## Store Class

The `Store` class is the main class in this system. It maintains a list of incidents and provides methods for interacting with these incidents. Here is a brief overview of the methods provided by the `Store` class:

- `reportIncident(description: string)`: This method allows you to report a new incident. You need to provide a description of the incident.
- `solveIncident(id: number)`: This method allows you to mark an incident as solved. You need to provide the id of the incident.
- `getAllIncidentDescriptions()`: This method returns a list of all incidents, with each incident represented as an object containing its id, description, and status.
- `incidentStatus(from: Date, to: Date)`: This method returns an object containing information about the status of incidents that were reported between the given dates. The returned object contains the number of open and closed cases, the average solution time, and the maximum solution time.

## Example Usage

Here is an example of how you can use the `Store` class:

```typescript
const store = new Store();

// Report a new incident
store.reportIncident("The floor in the frozen zone is dirty");

// Get all incidents
console.log(store.getAllIncidentDescriptions());

// Solve an incident
store.solveIncident(1);

// Get incident status
const from = new Date();
from.setHours(from.getHours() - 24); // 24 hours ago
const to = new Date(); // Now
console.log(store.incidentStatus(from, to));
```

## Running the Tests

You can run the tests for this system by executing the following command in your terminal:

```
npm run test src/__test__/store.test.ts
```

## Live Demo

You can see a live demo of this system at the following URL: [https://ismadot.github.io/store-status/](https://ismadot.github.io/store-status/)
