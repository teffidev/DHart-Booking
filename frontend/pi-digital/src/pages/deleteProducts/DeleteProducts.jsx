import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { getProduct } from "../../../data/artworks"
import useDataArt from "../../components/hooks/useDataArt"
import styles from "./deleteProducts.module.css"

export function loader() {
  const artwork = getProduct()
  return artwork
}

const DeleteProducts = () => {
  const [search, setSearch] = useState("")
  const [resultSearch, setResultSearch] = useState("")
  const { setTermSearch } = useDataArt()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setTermSearch(search)
  }

  return (
    <section className='w-full h-full flex justify-center items-center bg-opacity-10 bg-slate-400'>
      <article className='w-11/12 max-w-5xl flex flex-col justify-center items-center gap-5 my-14 '>
        <h2 className='font-bold text-2xl text-center mb-6'>Editar obras</h2>
        <form
          onSubmit={handleSubmit}
          className={` ${styles.formContainerT} ${styles.formContainerD} grid grid-rows-1 gap-2 `}
        >
          <input
            id='search'
            name='search'
            type='text'
            className='text-sm h-full rounded shadow-xl placeholder:italic px-5 py-2 w-full '
            placeholder='Nombre de la obra o Autor'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className={`bg-amber-600 text-white font-bold px-4 py-1 hover:bg-stone-400 rounded w-52 text-lg`}
            onClick={() => navigate(`/admin/delete-products/${search}`)}
          >
            Buscar
          </button>
        </form>

        <Outlet />
      </article>
    </section>
  )
}

export default DeleteProducts
