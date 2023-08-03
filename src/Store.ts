import { differenceInHours, isWithinInterval } from "date-fns";

class Incident {
  id: number;
  description: string;
  status: string;
  reportedAt: Date;
  solvedAt?: Date;

  constructor(id: number, description: string) {
    this.id = id;
    this.description = description;
    this.status = "open";
    this.reportedAt = new Date();
  }

  solve() {
    this.status = "solved";
    this.solvedAt = new Date();
  }

  getSolutionTime() {
    if (this.status === "solved" && this.solvedAt) {
      return differenceInHours(this.solvedAt, this.reportedAt);
    }
    return differenceInHours(new Date(), this.reportedAt);
  }
}

export class Store {
  incidents: Incident[] = [];
  nextId: number = 1;

  reportIncident(description: string) {
    const incident = new Incident(this.nextId++, description);
    this.incidents.push(incident);
  }

  solveIncident(id: number) {
    const incident = this.incidents.find((incident) => incident.id === id);
    if (incident) {
      incident.solve();
    }
  }

  getAllIncidentDescriptions() {
    return this.incidents.map((incident) => ({
      id: incident.id,
      description: incident.description,
      status: incident.status,
    }));
  }

  incidentStatus(from: Date, to: Date) {
    let openCases = 0;
    let closedCases = 0;
    let totalSolutionTime = 0;
    let maximumSolutionTime = 0;

    this.incidents.forEach((incident) => {
      if (isWithinInterval(incident.reportedAt, { start: from, end: to })) {
        if (incident.status === "open") {
          openCases++;
        } else if (incident.status === "solved") {
          closedCases++;
          const solutionTime = incident.getSolutionTime();
          totalSolutionTime += solutionTime;
          maximumSolutionTime = Math.max(maximumSolutionTime, solutionTime);
        }
      }
    });

    const averageSolutionTime =
      closedCases > 0 ? totalSolutionTime / closedCases : 0;

    return {
      openCases,
      closedCases,
      averageSolutionTime,
      maximumSolutionTime,
    };
  }
}
