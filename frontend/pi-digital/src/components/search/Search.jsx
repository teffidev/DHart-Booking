import useDataArt from "../hooks/useDataArt"
import styles from "./search.module.css"

const Search = () => {
  const { categories } = useDataArt()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main>
      <section className=' h-64 bg-[url(https://dhart-loadimages.s3.amazonaws.com/42a18422-ed41-42e7-b410-026eebe10110.jpg)] grid '>
        <article className='w-11/12 grid grid-cols-1 m-auto gap-1 justify-items-center'>
          <h2
            className={` mb-8 h-20 font-bold grid items-center text-3xl ${styles.h2TextT} ${styles.h2TextD}  text-center tablet:py-5  leading-9 text-amber-500 uppercase`}
          >
            Renta obras de arte para tus eventos
          </h2>
          <div className='w-full '>
            <form
              onSubmit={handleSubmit}
              className={` ${styles.formContainerT} ${styles.formContainerD}  grid grid-rows-1  gap-2 `}
            >
              <select
                name=''
                id=''
                className={`text-sm ${styles.selectContainer} rounded shadow-2xl p-1`}
              >
                <option value=''>Todas las categorias</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>

              <input
                type='text'
                className='text-sm h-full px-5 py-2 w-full border-2 placeholder-stone-400 rounded-md placeholder:italic'
                placeholder='Nombre de la obra o autor'
              />

              <button
                type='submit'
                className='bg-stone-600 text-base text-white font-bold px-4 py-1 hover:bg-stone-400 rounded w-full'
              >
                Buscar
              </button>
            </form>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Search
