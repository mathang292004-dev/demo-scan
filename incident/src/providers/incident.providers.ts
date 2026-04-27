import { Connection } from 'mongoose';
import { IncidentSchema } from '../incident/schema/incident.schema';

export const IncidentProviders = [
  {
    provide: 'INCIDENT_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Incident', IncidentSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
