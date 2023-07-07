import { Link } from "react-router-dom"
import Carousel from "better-react-carousel"
import useDataArt from "../hooks/useDataArt"

const Categories = () => {
  const { categories } = useDataArt()
  return (
    <section className='h-full w-full bg-opacity-10 bg-slate-400'>
      <article className='w-11/12 my-5 mx-auto grid gap-4'>
        <div className='flex justify-between'>
          <h2 className='text-xl font-bold mx-5'>Categorías</h2>
        </div>

        <Carousel
          cols={4}
          rows={1}
          gap={10}
          loop={true}
          responsiveLayout={[
            { breakpoint: 767, cols: 1, rows: 1, gap: 10, loop: true },
            { breakpoint: 1000, cols: 2, rows: 1, gap: 10, loop: true }
          ]}
          containerStyle={{ overflowX: "hidden" }}
        >
          {categories?.map((category) => (
            <Carousel.Item key={category.id}>
              <div className='w-full max-w-[400px h-72 flex flex-col justify-content-center items-center shadow-xl rounded-lg my-6'>
                <Link
                  to={`/artwork/category/${category.id}`}
                  className='h-full w-full'
                >
                  <img
                    id='imagen'
                    type='file'
                    src={category.imageUrl}
                    alt={category.title}
                    className='h-4/5 w-full rounded-t-lg object-cover'
                  />
                  <div className='w-full h-1/5 flex flex-col justify-center items-start ml-5'>
                    <h2 className='text-lg font-bold'>{category.title}</h2>
                  </div>
                </Link>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </article>
    </section>
  )
}

export default Categories
