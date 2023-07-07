import { useLoaderData } from "react-router-dom"
import { getCategories } from "../../../data/artworks"
import Categories from "../../components/categories/Categories"
import { categories } from "../../utilities/utilities"
import styles from "./categorySelected.module.css"
import { truncate } from "lodash"

export async function loader({ params }) {
  const category = await getCategories(params.id)
  return category
}

const CategorySelected = () => {
  const categoySelected = useLoaderData()

  return (
    <>
      <Categories />
      <section className='h-full w-full grid '>
        <article className='w-11/12 grid gap-4 my-5 mx-auto '>
          <h2 className='text-xl  font-bold'>Recomendaciones</h2>
          <div
            className={`w-full grid grid-cols-1 gap-5 ${styles.containerL} ${styles.containerD} pb-5`}
          >
            {categoySelected?.map((item) => (
              <article
                className={`w-full h-128  bg-stone-300 rounded-lg shadow-md grid grid-rows-2 ${styles.articleT}`}
                key={item.id}
              >
                <figure className='h-64 w-full'>
                  <img
                    src={item.urlList[0]}
                    alt={item.title}
                    className=' object-cover rounded-t-lg  w-full h-full  '
                  />
                </figure>
                <div
                  className={`w-full h-64 flex flex-col py-5 px-4 ${styles.figureD} justify-around`}
                >
                  <div className='h-13 flex justify-between '>
                    <aside>
                      <span className='text-xs opacity-50'>
                        {categories(item.idCategory)}
                      </span>
                      <span></span>
                      <h2 className='text-xl font-bold uppercase'>
                        {item.title}
                      </h2>
                    </aside>
                    <aside></aside>
                  </div>
                  <div className='h-30 font-normal text-[13px] flex items-end pb-2 '>
                    <p>{truncate(item.description, { length: 100 })}</p>
                  </div>
                  <a
                    href={`/artwork/${item.id}`}
                    className='min-h-12 text-lg font-bold rounded text-amber-600'
                  >
                    Ver más
                  </a>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>
    </>
  )
}

export default CategorySelected
