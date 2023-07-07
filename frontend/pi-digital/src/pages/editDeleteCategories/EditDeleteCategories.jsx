import { useState } from "react"
import { Outlet, useNavigate, useLoaderData } from "react-router-dom"
import useDataArt from "../../components/hooks/useDataArt"
import styles from "./editDeleteCategories.module.css"

const EditDeleteCategories = () => {
  const categoriesList = useLoaderData()
  const [search, setSearch] = useState("")
  const [categories, setCategories] = useState(categoriesList)
  const { setTermSearchCategory } = useDataArt()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setTermSearchCategory(search)
  }

  return (
    <section className='w-full h-full flex justify-center items-center bg-opacity-10 bg-slate-400'>
      <article className='w-11/12 max-w-5xl flex flex-col justify-center items-center gap-5 my-14 '>
        <h2 className='font-bold text-2xl text-center mb-6'>
          Editar categorías
        </h2>

        <form
          onSubmit={handleSubmit}
          className={` ${styles.formContainerT} ${styles.formContainerD}  grid grid-rows-1  gap-2 `}
        >
          <input
            id='search'
            name='search'
            type='text'
            className='text-sm h-full rounded shadow-xl placeholder:italic px-5 py-2 w-full'
            placeholder='Nombre de la categoría'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className='bg-amber-600 text-white font-bold px-4 py-1 hover:bg-stone-400 rounded w-52 text-lg'
            onClick={() => navigate(`/admin/edit-delete-categories/${search}`)}
          >
            Buscar
          </button>
        </form>

        <Outlet />
      </article>
    </section>
  )
}

export default EditDeleteCategories