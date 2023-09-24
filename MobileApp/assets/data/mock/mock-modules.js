const mockCourses = [
  {
    id: "1",
    coursecode: "CSE101",
    name: "Introduction to Computer Science",
    activity: {
      items: [
        {
          id: "1",
          activityname: "L01",
          day: "Monday",
          start: "09:00 AM",
          end: "10:30 AM",
          venue: "Room A101",
        },
        {
          id: "2",
          activityname: "T01",
          day: "Wednesday",
          start: "11:00 AM",
          end: "12:30 PM",
          venue: "Room B202",
        },
      ],
    },
  },
  {
    id: "2",
    coursecode: "MAT201",
    name: "Calculus I",
    activity: {
      items: [
        {
          id: "3",
          activityname: "L01",
          day: "Tuesday",
          start: "08:00 AM",
          end: "09:30 AM",
          venue: "Room C303",
        },
        {
          id: "4",
          activityname: "P01",
          day: "Thursday",
          start: "10:00 AM",
          end: "11:30 AM",
          venue: "Room D404",
        },
      ],
    },
  },
  // Add more mock courses here
];

const mockStudent = {
  id: "123",
  institutionId: "456",
  enrollments: {
    items: [
      {
        id: "5",
        courseId: "1",
        studentId: "123",
      },
      {
        id: "6",
        courseId: "2",
        studentId: "123",
      },
    ],
  },
  timetable: {
    id: "789",
    activityId: ["1", "3", "4"],
    activities: [
      {
        id: "1",
        activityname: "L01",
        day: "Monday",
        start: "09:00 AM",
        end: "10:30 AM",
        venue: "Room A101",
      },
      {
        id: "3",
        activityname: "L01",
        day: "Tuesday",
        start: "08:00 AM",
        end: "09:30 AM",
        venue: "Room C303",
      },
      {
        id: "4",
        activityname: "P01",
        day: "Thursday",
        start: "10:00 AM",
        end: "11:30 AM",
        venue: "Room D404",
      },
    ],
  },
};

const mockActivities = [
  {
    id: "7",
    activityname: "T01",
    day: "Wednesday",
    start: "11:00 AM",
    end: "12:30 PM",
    venue: "Room B202",
  },
  {
    id: "8",
    activityname: "T01",
    day: "Wednesday",
    start: "11:00 AM",
    end: "12:30 PM",
    venue: "Room B202",
  },
];

const mockData = {
  courses: mockCourses,
  student: mockStudent,
  activities: mockActivities,
};

export default mockData;
