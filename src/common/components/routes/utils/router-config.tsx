import { lazy } from "react"
import type { RouteObject } from "react-router-dom"
import CertificateSelection from "fields/certifications/components/CertificateSelection"
import CertificateEditTool from "fields/certifications/components/EditTool"
import EditLanguageCategory from "fields/languages/components/EditLanguageCategory"
import LanguageSelection from "fields/languages/components/LanguageSelection"
import EditProject from "fields/projects/components/tool/EditProject"
import Skill from "fields/skills/components"

import Login from "containers/login"
import MainPage from "containers/main-page"
import NotFound from "common/components/info-pages/not-found"

import { ROUTE } from "./constants"
import withPrivate from "./with-private-route-HOC"
import withSuspense from "./with-suspense-HOC"

const PersonalInformation = lazy(() => import("fields/personal-information"))
const Languages = lazy(() => import("fields/languages"))
const Skills = lazy(() => import("fields/skills"))
const Projects = lazy(() => import("fields/projects"))
const Certifications = lazy(() => import("fields/certifications"))
const Project = lazy(() => import("fields/projects/components"))
const AdminTable = lazy(() => import("containers/admin-table"))

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
