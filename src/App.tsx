import { useState, useEffect } from "react";
import "./App.css";
import { Store } from "./Store"; // Import the Store class

type IncidentStatus = {
  openCases?: number;
  closedCases?: number;
  averageSolutionTime?: number;
  maximumSolutionTime?: number;
};

type Incident = {
  id: number;
  description: string;
  status: string;
};

function App() {
  const [store] = useState(new Store());
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [newIncidentDescription, setNewIncidentDescription] = useState("");
  const [incidentIdToSolve, setIncidentIdToSolve] = useState("");
  const [incidentStatus, setIncidentStatus] = useState<IncidentStatus>({});

  useEffect(() => {
    setIncidents(store.getAllIncidentDescriptions());
    const from = new Date();
    from.setHours(from.getHours() - 24); // 24 hours ago
    const to = new Date(); // Now
    setIncidentStatus(store.incidentStatus(from, to));
  }, [store]);

  const reportIncident = () => {
    store.reportIncident(newIncidentDescription);
    setIncidents(store.getAllIncidentDescriptions());
    setNewIncidentDescription("");
  };

  const solveIncident = () => {
    store.solveIncident(Number(incidentIdToSolve));
    setIncidents(store.getAllIncidentDescriptions());
    setIncidentIdToSolve("");
  };

  return (
    <div className="App">
      <h1>Store Incident Management</h1>

      <input
        type="text"
        value={newIncidentDescription}
        onChange={(e) => setNewIncidentDescription(e.target.value)}
        placeholder="New incident description"
      />
      <button onClick={reportIncident}>Report Incident</button>

      <input
        type="text"
        value={incidentIdToSolve}
        onChange={(e) => setIncidentIdToSolve(e.target.value)}
        placeholder="Incident ID to solve"
      />
      <button onClick={solveIncident}>Solve Incident</button>

      <h2>Incidents</h2>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <h3>
              <strong>Id:</strong>
              {` ${incident.id} - `}
              <strong>Status: </strong>
              {` ${incident.status} - `}
              <strong>Description: </strong>
              {` ${incident.description} `}
            </h3>
          </li>
        ))}
      </ul>
      <div>
        <h2>Incident Status in the Last 24 Hours</h2>
        <p>Open Cases: {incidentStatus.openCases}</p>
        <p>Closed Cases: {incidentStatus.closedCases}</p>
        <p>Average Solution Time: {incidentStatus.averageSolutionTime} hours</p>
        <p>Maximum Solution Time: {incidentStatus.maximumSolutionTime} hours</p>
      </div>
    </div>
  );
}

export default App;
