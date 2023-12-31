import mongoose, { Schema, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export enum Period {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
  ALL_DAY = 'ALL_DAY',
}

export enum EventStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  PAST = 'PAST',
}

const VoteOptionsSchema = new Schema({
  option: { type: String, required: false },
  votes: { type: Array<Schema.Types.ObjectId>, default: [] }, // Use default [] to represent 0 votes
});

const VoteOptionSchema = new Schema({
  //   option: { type: String, required: false },
  //   votes: { type: Array<Schema.Types.ObjectId>, default: [] }, // Use default [] to represent 0 votes
  title: { type: String, required: false },
  options: [VoteOptionsSchema],
});

const ScheduleSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  slots: [
    {
      date: { type: Date, required: true },
      period: {
        type: String,
        required: true,
        enum: Object.values(Period),
      },
    },
  ],
});

// Define the event schema
const eventSchema = new Schema({
  title: { type: String, required: true, unique: false },
  description: { type: String, required: false, unique: false },
  location: { type: String, required: false },
  votes: [VoteOptionSchema], // Use the VoteOption schema for the votes property
  schedule: [ScheduleSchema], // Include the schedule field
  createdAt: { type: Date, required: true, default: Date.now },
  eventStartDate: { type: Date, required: false },
  eventEndDate: { type: Date, required: false },
  status: { type: String, required: true, enum: ['PENDING', 'UPCOMING'], default: 'PENDING' },
  usergroupId: { type: Schema.Types.ObjectId, ref: 'UserGroup' },
  expenseId: { type: Schema.Types.ObjectId, ref: 'Expense' },
});

// Create a TypeScript interface to describe the event document

export interface EventDocument extends Document {
  title: string;
  description: string;
  location: string | null;
  eventStartDate: Date | null;
  eventEndDate: Date | null;
  votes: Array<VotesType>;
  schedule: Array<ScheduleType>;
  createdAt: Date;
  date: TimeSlotType;
  status: EventStatus;
  usergroupId: string;
  expenseId: string;
}

export interface VotesType {
  _id?: string;
  title: string;
  options: Array<VoteOptionType>;
}

export interface VoteOptionType {
  _id?: string;
  option: string;
  votes: string[];
}

export interface ScheduleType {
  user: string; // User ID who provided the schedule
  slots: Array<TimeSlotType>; // An array of time slot objects
}

export interface TimeSlotType {
  date: Date; // Date of the time slot
  period: Period; // Time period
}

// Create the Event model
const Event = mongoose.model<EventDocument>('Event', eventSchema);

export default Event;
