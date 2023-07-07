import { useState, useEffect, createContext } from "react"
import { redirect } from "react-router-dom"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true)
  const [loading1, setLoading1] = useState(true)

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/auth/validateToken` // URL de la API

    const token = localStorage.getItem("token")

    if (!token) {
      return
    } // Token de autenticación

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}` // Encabezado de autorización con el token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor
        setAuth(data)
      })

      .catch((error) => {
        console.log(error)
        if (error) {
          localStorage.removeItem("token")
          setAuth({})

          redirect("/Login")
        }
      })
      .finally(setLoading(false))
  }, [])

  return (
    <AuthContext.Provider
      value={{ setAuth, auth, loading, setLoading1, loading1 }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }

export default AuthContext
