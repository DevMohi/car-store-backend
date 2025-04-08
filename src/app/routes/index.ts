import { Router } from 'express';
import { ProductRoutes } from '../modules/products/products.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
];

// const moduleRoutes = [
//   {
//     path: '/users',
//     route: UserRoutes,
//   },
//   {
//     path: '/students',
//     route: StudentRoutes,
//   },
//   {
//     path: '/faculties',
//     route: FacultyRoutes,
//   },
//   {
//     path: '/admins',
//     route: AdminRoutes,
//   },
//   {
//     path: '/academic-semesters',
//     route: AcademicSemesterRoutes,
//   },
//   {
//     path: '/academic-faculties',
//     route: AcademicFacultyRoutes,
//   },
//   {
//     path: '/academic-departments',
//     route: AcademicDepartmentRoutes,
//   },
//   {
//     path: '/courses',
//     route: CourseRoutes,
//   },
//   {
//     path: '/semester-registrations',
//     route: semesterRegistrationRoutes,
//   },
//   {
//     path: '/offered-courses',
//     route: offeredCourseRoutes,
//   },
//   {
//     path: '/auth',
//     route: AuthRoutes,
//   },
//   {
//     path: '/enrolled-course',
//     route: EnrolledCourseRoutes,
//   },
// ];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
