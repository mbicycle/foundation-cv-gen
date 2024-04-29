import AdminTableProvider from "pages/admin/local-state"

import AdminTableContainer from "./AdminTableContainer"

function AdminTableWrapper(): JSX.Element {
  return (
    <AdminTableProvider>
      <AdminTableContainer />
    </AdminTableProvider>
  )
}

export default AdminTableWrapper
