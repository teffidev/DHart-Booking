import { createContext, useState, useEffect } from "react"
import axios from "axios"

const DataContext = createContext()

const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [rolesList, setRolesList] = useState([])
  const [termSearch, setTermSearch] = useState("")
  const [resultSearch, setResultSearch] = useState(false)
  const [termSearchCategory, setTermSearchCategory] = useState("")

  const [resultSearchCategory, setResultSearchCategory] = useState("")
  const [resultSearchUser, setResultSearchUser] = useState("")
  const [termSearchUser, setTermSearchUser] = useState("")

  const [disabledDates, setDisabledDates] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/categories`)
      setCategories(data)
    }
    const getRoles = async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/auth/roles`)
      setRolesList(data)
    }
    getCategories()
    getRoles()
  }, [])

  return (
    <DataContext.Provider
      value={{
        categories,
        setTermSearch,
        termSearch,
        resultSearch,
        setResultSearch,
        termSearchCategory,
        setTermSearchCategory,
        setResultSearchCategory,
        setResultSearchUser,
        setTermSearchUser,
        resultSearchUser,
        setRolesList,
        rolesList,
        setDisabledDates,
        disabledDates
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export { DataProvider }
export default DataContext
