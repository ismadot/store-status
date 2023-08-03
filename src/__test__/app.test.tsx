import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App.tsx';

jest.mock('../Store.ts', () => {
  return {
    Store: jest.fn().mockImplementation(() => {
      return {
        getAllIncidentDescriptions: () => [{ id: 1, description: 'Test incident', status: 'open' }],
        reportIncident: jest.fn(),
        solveIncident: jest.fn(),
        incidentStatus: () => ({ openCases: 1, closedCases: 0, averageSolutionTime: 0, maximumSolutionTime: 0 })
      };
    })
  };
});

test('renders App component', async () => {
  render(<App />);

  // Check that the incident description is displayed
  expect(screen.getByText(/Test incident/)).toBeInTheDocument();

  // Check that the incident status is displayed
  expect(screen.getByText('Open Cases: 1')).toBeInTheDocument();
  expect(screen.getByText('Closed Cases: 0')).toBeInTheDocument();
  expect(screen.getByText('Average Solution Time: 0.00 hours')).toBeInTheDocument();
  expect(screen.getByText('Maximum Solution Time: 0.00 hours')).toBeInTheDocument();

  // Simulate reporting a new incident
  fireEvent.change(screen.getByPlaceholderText('New incident description'), { target: { value: 'New incident' } });
  fireEvent.click(screen.getByText('Report Incident'));

  // Simulate solving an incident
  fireEvent.change(screen.getByPlaceholderText('Incident ID to solve'), { target: { value: '1' } });
  fireEvent.click(screen.getByText('Solve Incident'));

});
