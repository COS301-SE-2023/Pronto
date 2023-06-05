// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Institution, Admin, Lecturer, Student, Enrollment, Course, Timetable, Activity, Announcement } = initSchema(schema);

export {
  Institution,
  Admin,
  Lecturer,
  Student,
  Enrollment,
  Course,
  Timetable,
  Activity,
  Announcement
};