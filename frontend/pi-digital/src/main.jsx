import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import "./index.css"
import Body from "./components/body/Body"
import ArtSelected, {
  loader as artworkLoader
} from "./pages/artSelected/ArtSelected"
import { loader as artworksLoader } from "./components/recomended/Recomended"
import Admin from "./pages/admin/Admin"
import CategorySelected, {
  loader as categoryLoader
} from "./pages/categorySelected/CategorySelected"
import DeleteProducts, {
  loader as productsListLoader
} from "./pages/deleteProducts/DeleteProducts"
import ProductsSearch, {
  loader as productSearchLoader
} from "./components/productsSearch/ProductsSearch"
import EditDeleteCategories from "./pages/editDeleteCategories/EditDeleteCategories"
import CategorySearch, {
  loader as categorySearchLoader
} from "./components/categorySearch/CategorySearch"
import UserSearch, {
  loader as userSearchLoader
} from "./components/userSearch/UserSearch"
import EditUser from "./pages/editUser/EditUser"
import Login from "./pages/login/Login"
import SignUp from "./pages/signUp/SignUp"
import Users from "./pages/user/Users"
import CreateProducts from "./pages/createProducts/CreateProducts"
import CreateCategories from "./pages/createCategories/CreateCategories"
import { DataProvider } from "./context/DataProvider"
import { AuthProvider } from "./context/AuthProvider"
import WelcomeAdmin from "./pages/welcomeAdmin/WelcomeAdmin"
import ArtReservation from "./pages/artReservation/ArtReservation"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Body />,
        loader: artworksLoader
      },
      {
        path: "/artwork/:id",
        element: <ArtSelected />,
        loader: artworkLoader
      },
      {
        path: "/artwork/reservation/:id",
        element: <ArtReservation />,
        loader: artworkLoader
      },
      {
        path: "/artwork/category/:id",
        element: <CategorySelected />,
        loader: categoryLoader
      },
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            index: true,
            element: <WelcomeAdmin />
          },
          {
            path: "/admin/admin-users",
            element: <Users />,
            children: [
              {
                index: true,
                path: "/admin/admin-users/:search",
                element: <UserSearch />,
                loader: userSearchLoader
              }
            ]
          },
          {
            path: "/admin/admin-user/:search/edit",
            element: <EditUser />
          },

          {
            path: "/admin/create-products",
            element: <CreateProducts />
          },
          {
            path: "/admin/delete-products",
            element: <DeleteProducts />,
            children: [
              {
                index: true,
                path: "/admin/delete-products/:search",
                element: <ProductsSearch />,
                loader: productSearchLoader
              }
            ]
          },
          {
            path: "/admin/create-categories",
            element: <CreateCategories />
          },
          {
            path: "/admin/edit-delete-categories",
            element: <EditDeleteCategories />,
            children: [
              {
                index: true,
                path: "/admin/edit-delete-categories/:search",
                element: <CategorySearch />,
                loader: categorySearchLoader
              }
            ]
          }
        ]
      },
      {
        path: "/SignUp",
        element: <SignUp />
      },
      {
        path: "/Login",
        element: <Login />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </AuthProvider>
)
