import mongoose from 'mongoose';

const FileMetadataSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  fileType: { type: String, required: true },
});

export const IncidentSchema = new mongoose.Schema({
  incidentId: { type: String, required: true },
  reportedBy: { type: String },
  country: { type: String },
  Branch: { type: String },
  reportedDate: { type: Date },
  severityLevel: { type: String },
  incidentStatus: { type: String },
  incidentOverview: Object,
  AssetsDamage: Object,
  PropertyDamage: [
    {
      propertyType: String,
      description: String,
      price: Number,
    },
  ],
  uploadedFiles: {
    images: [FileMetadataSchema],
    audio: [FileMetadataSchema],
    video: [FileMetadataSchema]
  },
  isDeleted: { type: Boolean, default: false },
});
