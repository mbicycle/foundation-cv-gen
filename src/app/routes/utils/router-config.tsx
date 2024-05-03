import { lazy } from "react"
import type { RouteObject } from "react-router-dom"

import Login from "pages/login"
import MainPage from "pages/main"
import NotFound from "pages/not-found"

import CertificateSelection from "features/cv-form-components/certifications/ui/CertificateSelection"
import CertificateEditTool from "features/cv-form-components/certifications/ui/EditTool"
import EditLanguageCategory from "features/cv-form-components/languages/ui/EditLanguageCategory"
import LanguageSelection from "features/cv-form-components/languages/ui/LanguageSelection"
import EditProject from "features/cv-form-components/projects/ui/tool/EditProject"
import Skill from "features/cv-form-components/skills/ui"

import { ROUTE } from "./constants"
import withPrivate from "./with-private-route-HOC"
import withSuspense from "./with-suspense-HOC"

const PersonalInformation = lazy(() => import("../../../features/cv-form-components/personal-information"))
const Languages = lazy(() => import("../../../features/cv-form-components/languages"))
const Skills = lazy(() => import("../../../features/cv-form-components/skills"))
const Projects = lazy(() => import("../../../features/cv-form-components/projects"))
const Certifications = lazy(() => import("../../../features/cv-form-components/certifications"))
const Project = lazy(() => import("../../../features/cv-form-components/projects/ui"))
const AdminTable = lazy(() => import("../../../pages/admin"))

const routerConfig: RouteObject[] = [
  {
    path: ROUTE.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTE.ADMIN.DEFAULT,
    element: withSuspense(withPrivate(<AdminTable />)),
  },
  {
    path: ROUTE.DASHBOARD.DEFAULT,
    element: withPrivate(<MainPage />),
    children: [
      {
        path: ROUTE.DASHBOARD.PERSONAL_INFORMATION,
        element: withSuspense(<PersonalInformation />),
      },
      {
        path: ROUTE.DASHBOARD.LANGUAGES.MAIN,
        element: withSuspense(<Languages />),
        children: [
          {
            path: ROUTE.ADD,
            element: <LanguageSelection />,
          },
          {
            path: ROUTE.EDIT,
            element: <EditLanguageCategory />,
          },
        ],
      },
      {
        path: ROUTE.DASHBOARD.SKILLS,
        element: withSuspense(<Skills />),
        children: [
          {
            path: ROUTE.ADD,
            element: <Skill />,
          },
          {
            path: ROUTE.EDIT,
            element: <Skill />,
          },
        ],
      },
      {
        path: ROUTE.DASHBOARD.PROJECTS,
        element: withSuspense(<Projects />),
        children: [
          {
            path: ROUTE.ADD,
            element: <Project />,
          },
          {
            path: ROUTE.EDIT,
            element: <EditProject />,
          },
        ],
      },
      {
        path: ROUTE.DASHBOARD.CERTIFICATES,
        element: withSuspense(<Certifications />),
        children: [
          {
            path: ROUTE.ADD,
            element: <CertificateSelection />,
          },
          {
            path: ROUTE.EDIT,
            element: <CertificateEditTool />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]

export default routerConfig
