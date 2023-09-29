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
    coursecode: "IMY 210",
    name: "Information Management",
    activity: {
      items: [
        {
          id: "1",
          activityname: "L01",
          day: "Monday",
          start: "08:00 AM",
          end: "09:30 AM",
          venue: "Thuto 2-1",
        },
      ],
    },
  },
  {
    id: "3",
    coursecode: "COS301",
    name: "Operating Systems",
    activity: {
      items: [
        {
          id: "1",
          activityname: "L01",
          day: "Tuesday",
          start: "10:00 AM",
          end: "11:30 AM",
          venue: "Centenary 1-1",
        },
      ],
    },
  },
  {
    id: "4",
    coursecode: "COS333",
    name: "Data Structures",
    activity: {
      items: [
        {
          id: "1",
          activityname: "L01",
          day: "Wednesday",
          start: "08:00 AM",
          end: "09:30 AM",
          venue: "IT 4-4",
        },
      ],
    },
  },
  {
    id: "5",
    coursecode: "COS326",
    name: "Algorithms",
    activity: {
      items: [
        {
          id: "1",
          activityname: "L01",
          day: "Friday",
          start: "02:00 PM",
          end: "03:30 PM",
          venue: "Humanity Building 3-3",
        },
      ],
    },
  },
  {
    id: "6",
    coursecode: "WTW285",
    name: "Technical Writing",
    activity: {
      items: [
        {
          id: "1",
          activityname: "L01",
          day: "Monday",
          start: "09:00 AM",
          end: "10:30 AM",
          venue: "EMS 1-152",
        },
      ],
    },
  },
  {
    id: "7",
    coursecode: "IMY 330",
    name: "Database Management",
    activity: {
      items: [
        {
          id: "1",
          activityname: "L01",
          day: "Thursday",
          start: "11:00 AM",
          end: "12:30 PM",
          venue: "SIT Labs",
        },
      ],
    },
  },
  {
    id: "8",
    coursecode: "COS314",
    name: "Software Engineering",
    activity: {
      items: [
        {
          id: "1",
          activityname: "L01",
          day: "Friday",
          start: "10:00 AM",
          end: "11:30 AM",
          venue: "IT 4-4",
        },
      ],
    },
  },
  {
    id: "9",
    coursecode: "COS201",
    name: "Programming Fundamentals",
    activity: {
      items: [
        {
          id: "1",
          activityname: "L01",
          day: "Wednesday",
          start: "03:00 PM",
          end: "04:30 PM",
          venue: "IT 2-27",
        },
      ],
    },
  },
  {
    id: "10",
    coursecode: "INF 354",
    name: "Information Security",
    activity: {
      items: [
        {
          id: "1",
          activityname: "L01",
          day: "Wednesday",
          start: "09:30 AM",
          end: "11:00 AM",
          venue: "Brown Lab",
        },
      ],
    },
  },
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
