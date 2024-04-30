import React from "react"

export const COLUMNS: AdminTableType.Column[] = [
  {
    label: "Name",
    dataKey: "displayName",
  },
  {
    label: "E-mail",
    dataKey: "mail",
  },
  {
    label: "Job Title",
    dataKey: "jobTitle",
  },
  {
    label: "Updated",
    dataKey: "lastModified",
  },
  {
    label: "Download",
    dataKey: "component",
    // eslint-disable-next-line react/jsx-no-useless-fragment
    Component: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  },
]

export const MINIMUM_TABLE_HEIGHT = 300
export const MINIMUM_TABLE_WINDOW_HEIGHT = 600
export const ADMIN_TABLE_HEADER_HEIGHT = 80
