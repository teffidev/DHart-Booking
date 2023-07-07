import { useContext } from "react"
import DataContext from "../../context/DataProvider"

const useDataArt = () => {
  return useContext(DataContext)
}

export default useDataArt
