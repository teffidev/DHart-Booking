import { Outlet, Link, useLocation } from "react-router-dom"

const Admin = () => {
  const location = useLocation()

  return (
    <div className='tablet:flex tablet:min-h-screen'>
      <aside className='tablet:w-1/4  bg-stone-600  px-14 py-10'>
        <Link to={"/admin"}>
          <h2 className='text-2xl font-bold text-white'>
            Módulo de administración
          </h2>
        </Link>
        <nav className='mt-10'>
          <Link
            to='/admin/admin-users'
            className={`${
              location.pathname.includes("admin-users")
                ? "text-amber-500 font-bold italic"
                : "text-white"
            } text-lg block mt-2 hover:text-white hover:font-bold `}
          >
            Administrar usuarios
          </Link>
          <Link
            to='/admin/create-products'
            className={`${
              location.pathname === "/admin/create-products"
                ? "text-amber-500 font-bold italic"
                : "text-white"
            } text-lg block mt-2 hover:text-white hover:font-bold `}
          >
            Agregar obras
          </Link>
          <Link
            to='/admin/delete-products'
            className={`${
              location.pathname.includes("/admin/delete-products")
                ? "text-amber-500 font-bold italic"
                : "text-white"
            } text-lg block mt-2 hover:text-white hover:font-bold `}
          >
            Editar obras
          </Link>
          <Link
            to='/admin/create-categories'
            className={`${
              location.pathname === "/admin/create-categories"
                ? "text-amber-500 font-bold italic"
                : "text-white"
            } text-lg block mt-2 hover:text-white hover:font-bold`}
          >
            Agregar categorías
          </Link>
          <Link
            to='/admin/edit-delete-categories'
            className={`${
              location.pathname.includes("/admin/edit-delete-categories")
                ? "text-amber-500 font-bold italic"
                : "text-white"
            } text-lg block mt-2 hover:text-white hover:font-bold `}
          >
            Editar categorías
          </Link>
        </nav>
      </aside>
      <main className='tablet:w-3/4   overflow-scroll'>
        <Outlet />
      </main>
    </div>
  )
}

export default Admin
