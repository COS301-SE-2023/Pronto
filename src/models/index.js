// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const NotificationType = {
  "SMS": "SMS",
  "PUSH": "PUSH",
  "EMAIL": "EMAIL"
};

const Status = {
  "UPDATED": "UPDATED",
  "DISABLED": "DISABLED",
  "FAILED": "FAILED",
  "OPERATIONAL": "OPERATIONAL"
};

const EndpointTypeStatus = {
  "SENT": "SENT",
  "FAILED": "FAILED",
  "UNAVAILABLE": "UNAVAILABLE"
};

const { Institution, Admin, Lecturer, Student, Enrollment, Course, Timetable, Activity, Announcement, NotificationPreferance, Notification, Announcement_Status, Announcement_Matrix, Endpoint } = initSchema(schema);

export {
  Institution,
  Admin,
  Lecturer,
  Student,
  Enrollment,
  Course,
  Timetable,
  Activity,
  Announcement,
  NotificationPreferance,
  NotificationType,
  Status,
  EndpointTypeStatus,
  Notification,
  Announcement_Status,
  Announcement_Matrix,
  Endpoint
};