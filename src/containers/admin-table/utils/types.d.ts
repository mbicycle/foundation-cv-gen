declare namespace AdminTableType {
  export interface UsersDbList {
    email: string
    lastModified?: string
  }

  export interface User {
    id: string
    displayName: string
    mail: string
    jobTitle: string
  }

  export interface UserMapped extends User {
    lastModified: string
    hasCv: boolean
  }

  export type ColumnDataKeys = User & { component: string } & { lastModified: string }

  export interface GraphData {
    "@odata.context": string
    "@odata.nextLink"?: string
    value: User[]
  }

  export interface GraphDataMapped {
    "@odata.context": string
    "@odata.nextLink"?: string
    value: [User & { hasCv: boolean }]
  }

  export interface Column {
    label: string
    dataKey: keyof ColumnDataKeys
    Component?: ({ children }: { children: React.ReactNode }) => JSX.Element
  }

  export interface FilterData {
    prop: keyof User
    searchValue: string
  }
}
