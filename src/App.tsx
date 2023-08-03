import { useState, useEffect } from "react";
import "./App.css";
import { IncidentStatus, Store } from "./Store"; // Import the Store class


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
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    setIncidents(store.getAllIncidentDescriptions());
    const from = new Date();
    from.setHours(from.getHours() - 24); // 24 hours ago
    const to = new Date(); 
    console.log("🚀 ~ file: App.tsx:28 ~ useEffect ~ store.incidentStatus(from, to):", store.incidentStatus(from, to))
    setIncidentStatus(store.incidentStatus(from, to));
  }, [store, lastUpdated]);

  const reportIncident = () => {
    store.reportIncident(newIncidentDescription);
    setIncidents(store.getAllIncidentDescriptions());
    setNewIncidentDescription("");
    setLastUpdated(new Date());
  };

  const solveIncident = () => {
    store.solveIncident(Number(incidentIdToSolve));
    setIncidents(store.getAllIncidentDescriptions());
    setIncidentIdToSolve("");
    setLastUpdated(new Date());
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
        <p>Average Solution Time: {incidentStatus.averageSolutionTime?.toFixed(2)} hours</p>
        <p>Maximum Solution Time: {incidentStatus.maximumSolutionTime?.toFixed(2)} hours</p>
      </div>
    </div>
  );
}

export default App;
