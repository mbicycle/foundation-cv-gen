import AdminTableContainer from "containers/admin-table/AdminTableContainer"
import AdminTableProvider from "containers/admin-table/local-state"

function AdminTableWrapper(): JSX.Element {
  return (
    <AdminTableProvider>
      <AdminTableContainer />
    </AdminTableProvider>
  )
}

export default AdminTableWrapper
