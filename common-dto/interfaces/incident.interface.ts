import { Document } from 'mongoose'

export interface Incident extends Document{
    incidentId: string;
    reportedBy?: string;
    country?: string;
    Branch?: string;
    reportedDate?: Date;
    severityLevel?: string;
    incidentStatus?: string;
    incidentOverview?:any
    AssetsDamage?:Array<object>;
    PropertyDamage?:Array<object>;
    uploadedFiles:Array<object>;
}