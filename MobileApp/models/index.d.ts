import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";





type EagerInstitution = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Institution, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly location?: string | null;
  readonly pageUrl?: string | null;
  readonly campusMapUrl?: string | null;
  readonly openingTime?: string | null;
  readonly closingTime?: string | null;
  readonly minimumDuration?: number | null;
  readonly lectureremails?: (string | null)[] | null;
  readonly coursecodes?: (string | null)[] | null;
  readonly logo?: string | null;
  readonly domains?: (string | null)[] | null;
  readonly admin?: Admin | null;
  readonly adminId?: string | null;
  readonly courses?: (Course | null)[] | null;
  readonly students?: (Student | null)[] | null;
  readonly lecturer?: (Lecturer | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInstitution = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Institution, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly location?: string | null;
  readonly pageUrl?: string | null;
  readonly campusMapUrl?: string | null;
  readonly openingTime?: string | null;
  readonly closingTime?: string | null;
  readonly minimumDuration?: number | null;
  readonly lectureremails?: (string | null)[] | null;
  readonly coursecodes?: (string | null)[] | null;
  readonly logo?: string | null;
  readonly domains?: (string | null)[] | null;
  readonly admin: AsyncItem<Admin | undefined>;
  readonly adminId?: string | null;
  readonly courses: AsyncCollection<Course>;
  readonly students: AsyncCollection<Student>;
  readonly lecturer: AsyncCollection<Lecturer>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Institution = LazyLoading extends LazyLoadingDisabled ? EagerInstitution : LazyInstitution

export declare const Institution: (new (init: ModelInit<Institution>) => Institution) & {
  copyOf(source: Institution, mutator: (draft: MutableModel<Institution>) => MutableModel<Institution> | void): Institution;
}

type EagerAdmin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Admin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly institutionId?: string | null;
  readonly firstname: string;
  readonly lastname: string;
  readonly userRole: string;
  readonly email: string;
  readonly institution?: Institution | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAdmin = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Admin, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly institutionId?: string | null;
  readonly firstname: string;
  readonly lastname: string;
  readonly userRole: string;
  readonly email: string;
  readonly institution: AsyncItem<Institution | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Admin = LazyLoading extends LazyLoadingDisabled ? EagerAdmin : LazyAdmin

export declare const Admin: (new (init: ModelInit<Admin>) => Admin) & {
  copyOf(source: Admin, mutator: (draft: MutableModel<Admin>) => MutableModel<Admin> | void): Admin;
}

type EagerLecturer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lecturer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly institutionId: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly userRole: string;
  readonly email: string;
  readonly institution: Institution;
  readonly courses?: (Course | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLecturer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lecturer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly institutionId: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly userRole: string;
  readonly email: string;
  readonly institution: AsyncItem<Institution>;
  readonly courses: AsyncCollection<Course>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Lecturer = LazyLoading extends LazyLoadingDisabled ? EagerLecturer : LazyLecturer

export declare const Lecturer: (new (init: ModelInit<Lecturer>) => Lecturer) & {
  copyOf(source: Lecturer, mutator: (draft: MutableModel<Lecturer>) => MutableModel<Lecturer> | void): Lecturer;
}

type EagerStudent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Student, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly institutionId: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly userRole: string;
  readonly email: string;
  readonly preference?: string | null;
  readonly institution: Institution;
  readonly timetable?: Timetable | null;
  readonly enrollments?: (Enrollment | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly studentTimetableId?: string | null;
}

type LazyStudent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Student, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly institutionId: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly userRole: string;
  readonly email: string;
  readonly preference?: string | null;
  readonly institution: AsyncItem<Institution>;
  readonly timetable: AsyncItem<Timetable | undefined>;
  readonly enrollments: AsyncCollection<Enrollment>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly studentTimetableId?: string | null;
}

export declare type Student = LazyLoading extends LazyLoadingDisabled ? EagerStudent : LazyStudent

export declare const Student: (new (init: ModelInit<Student>) => Student) & {
  copyOf(source: Student, mutator: (draft: MutableModel<Student>) => MutableModel<Student> | void): Student;
}

type EagerEnrollment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Enrollment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly studentId: string;
  readonly courseId: string;
  readonly year?: number | null;
  readonly student: Student;
  readonly course: Course;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEnrollment = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Enrollment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly studentId: string;
  readonly courseId: string;
  readonly year?: number | null;
  readonly student: AsyncItem<Student>;
  readonly course: AsyncItem<Course>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Enrollment = LazyLoading extends LazyLoadingDisabled ? EagerEnrollment : LazyEnrollment

export declare const Enrollment: (new (init: ModelInit<Enrollment>) => Enrollment) & {
  copyOf(source: Enrollment, mutator: (draft: MutableModel<Enrollment>) => MutableModel<Enrollment> | void): Enrollment;
}

type EagerCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly institutionId: string;
  readonly lecturerId?: string | null;
  readonly coursecode: string;
  readonly coursename?: string | null;
  readonly semester?: number | null;
  readonly enrollments?: (Enrollment | null)[] | null;
  readonly activity?: (Activity | null)[] | null;
  readonly announcents?: (Announcement | null)[] | null;
  readonly lecturer?: Lecturer | null;
  readonly institution: Institution;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCourse = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Course, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly institutionId: string;
  readonly lecturerId?: string | null;
  readonly coursecode: string;
  readonly coursename?: string | null;
  readonly semester?: number | null;
  readonly enrollments: AsyncCollection<Enrollment>;
  readonly activity: AsyncCollection<Activity>;
  readonly announcents: AsyncCollection<Announcement>;
  readonly lecturer: AsyncItem<Lecturer | undefined>;
  readonly institution: AsyncItem<Institution>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Course = LazyLoading extends LazyLoadingDisabled ? EagerCourse : LazyCourse

export declare const Course: (new (init: ModelInit<Course>) => Course) & {
  copyOf(source: Course, mutator: (draft: MutableModel<Course>) => MutableModel<Course> | void): Course;
}

type EagerTimetable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Timetable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly studentId: string;
  readonly activityId: (string | null)[];
  readonly student: Student;
  readonly activities: (Activity | null)[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTimetable = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Timetable, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly studentId: string;
  readonly activityId: (string | null)[];
  readonly student: AsyncItem<Student>;
  readonly activities: AsyncCollection<Activity>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Timetable = LazyLoading extends LazyLoadingDisabled ? EagerTimetable : LazyTimetable

export declare const Timetable: (new (init: ModelInit<Timetable>) => Timetable) & {
  copyOf(source: Timetable, mutator: (draft: MutableModel<Timetable>) => MutableModel<Timetable> | void): Timetable;
}

type EagerActivity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Activity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly courseId: string;
  readonly activityname: string;
  readonly day: string;
  readonly start: string;
  readonly end: string;
  readonly venue: string;
  readonly group: string;
  readonly frequency?: number | null;
  readonly description: string;
  readonly course?: Course | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyActivity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Activity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly courseId: string;
  readonly activityname: string;
  readonly day: string;
  readonly start: string;
  readonly end: string;
  readonly venue: string;
  readonly group: string;
  readonly frequency?: number | null;
  readonly description: string;
  readonly course: AsyncItem<Course | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Activity = LazyLoading extends LazyLoadingDisabled ? EagerActivity : LazyActivity

export declare const Activity: (new (init: ModelInit<Activity>) => Activity) & {
  copyOf(source: Activity, mutator: (draft: MutableModel<Activity>) => MutableModel<Activity> | void): Activity;
}

type EagerAnnouncement = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Announcement, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly courseId: string;
  readonly description: string;
  readonly start: string;
  readonly end: string;
  readonly date: string;
  readonly venue: string;
  readonly course: Course;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAnnouncement = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Announcement, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly courseId: string;
  readonly description: string;
  readonly start: string;
  readonly end: string;
  readonly date: string;
  readonly venue: string;
  readonly course: AsyncItem<Course>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Announcement = LazyLoading extends LazyLoadingDisabled ? EagerAnnouncement : LazyAnnouncement

export declare const Announcement: (new (init: ModelInit<Announcement>) => Announcement) & {
  copyOf(source: Announcement, mutator: (draft: MutableModel<Announcement>) => MutableModel<Announcement> | void): Announcement;
}