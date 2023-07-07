import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { getArtworks } from "../../../data/artworks"
import { categories } from "../../utilities/utilities"
import { truncate } from "lodash"
import ReactPaginate from "react-paginate"
import styles from "./recommended.module.css"

export function loader() {
  const artworks = getArtworks()
  return artworks
}

const Recomended = () => {
  const artworksList = useLoaderData()
  const [dataAPI, setDataAPI] = useState(artworksList)
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemPerPage = 10

  useEffect(() => {
    const endOffset = itemOffset + itemPerPage
    setCurrentItems(dataAPI.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(dataAPI.length / itemPerPage))
  }, [itemOffset, itemPerPage])

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemPerPage) % dataAPI.length
    setItemOffset(newOffset)
  }

  return (
    <section className='h-full w-full grid bg-opacity-10 bg-slate-400'>
      <article className='w-11/12 grip gap-4 my-5 mx-auto'>
        <h2 className='text-xl font-bold mb-5'>Recomendaciones</h2>
        <div
          className={`w-full grid grid-cols-1 gap-5 ${styles.containerL} ${styles.containerD} pb-5`}
        >
          {currentItems?.map((data) => (
            <article
              key={data.id}
              className={`w-7/8 h-128 bg-stone-300 rounded-lg shadow-md grid grid-rows-2 ${styles.articleT} mb-3`}
            >
              <figure className='h-64 w-full'>
                {data?.urlList?.length > 0 && (
                  <img
                    src={data.urlList[0]}
                    alt=''
                    className='object-cover rounded-t-lg w-full h-full '
                  />
                )}
              </figure>
              <div
                className={`w-6/7 h-64 flex flex-col py-5 px-4 ${styles.figureD} justify-around`}
              >
                <div className='h-13 flex justify-between '>
                  <aside>
                    <span className='text-sm opacity-50 '>
                      {categories(data.idCategory)}
                    </span>
                    <span></span>
                    <h2 className='text-2xl font-bold uppercase'>
                      {data.title}
                    </h2>
                  </aside>
                  <aside></aside>
                </div>
                <div className=' h-30 font-normal text-[13px] flex items-end pb-5 '>
                  <p>{truncate(data.description, { length: 100 })}</p>
                </div>
                <a
                  href={`/artwork/${data.id}`}
                  className='min-h-12 text-lg font-bold rounded text-amber-600'
                >
                  Ver más
                </a>
              </div>
            </article>
          ))}
        </div>
        <ReactPaginate
          breakLabel='...'
          nextLabel='SIGUIENTE>'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel='<ATRÁS'
          renderOnZeroPageCount={null}
          containerClassName='flex justify-center gap-5'
          pageLinkClassName='py-2 px-3 rounded-md hover:bg-stone-400 text-black hover:text-white'
          previousLinkClassName='py-2 px-3 rounded-md hover:bg-stone-400 '
          nextLinkClassName='py-2 px-3 rounded-md hover:bg-stone-400 '
          activeLinkClassName='bg-stone-300  '
          nextClassName='relative'
        />
      </article>
    </section>
  )
}

export default Recomended
