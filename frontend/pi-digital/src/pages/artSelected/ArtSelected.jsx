import { useEffect, useState } from "react"
import { BiChevronLeft, BiHeart } from "react-icons/bi"
import { useLoaderData, Link, useNavigate } from "react-router-dom"
import { GrShareOption, GrLocation } from "react-icons/gr"
import { AiFillCloseCircle } from "react-icons/ai"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import axios from "axios"
import { getArtwork } from "../../../data/artworks"
import { categories } from "../../utilities/utilities"
import { Carousel } from "react-carousel-minimal"
import useDataArt from "../../components/hooks/useDataArt"
import useAuth from "../../components/hooks/useAuth"
import StarRating from "../../components/starRating/StarRating"
import styles from "./artSelected.module.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export async function loader({ params }) {
  const artwork = await getArtwork(params.id)
  return artwork
}

const ArtSelected = () => {
  const { auth } = useAuth()
  const [averageScore, setAverageScore] = useState(0.0)
  const { setDisabledDates } = useDataArt()
  const [unavailableDates, setUnavailableDates] = useState([])

  const navigate = useNavigate()
  const [isCarouselOn, setIsCarouselOn] = useState(false)
  const artwork = useLoaderData()
  const {
    title,
    author,
    description,
    location,
    id,
    technique,
    year,
    priceHour,
    idCategory,
    urlList
  } = artwork

  const showingCarousel = () => {
    setIsCarouselOn(!isCarouselOn)
  }
  const categoryName = categories(idCategory)
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    top: "90%",
    right: "0"
  }

  const unAuthorized = () => {
    if (!localStorage.getItem("token")) {
      navigate("/Login")
      toast.warning("Recuerda Iniciar Sesión", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }
  const unAuthorizedReservation = (e) => {
    e.preventDefault()
    if (!localStorage.getItem("token")) {
      navigate("/Login")
      toast.warning("Recuerda Iniciar Sesión", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      return
    }
    navigate(`/artwork/reservation/${id}`)
  }

  const getAverageScore = async () => {
    axios(`${import.meta.env.VITE_API_URL}/scores/average/${id}`).then(
      ({ data }) => {
        setAverageScore(data)
      }
    )
  }

  const getAnavailableDates = async () => {
    const { data } = await axios(
      `${import.meta.env.VITE_API_URL}/bookings/unavailable-dates/${id}`
    )

    setUnavailableDates(data)
    setDisabledDates(data)
  }

  useEffect(() => {
    getAverageScore()

    getAnavailableDates()
  }, [])

  const newDates = unavailableDates.map((unavailableDate) => {
    const [year, month, day] = unavailableDate.split("-")
    return new Date(year, month - 1, day)
  })

  const isDateDisabled = ({ date }) => {
    // Verificar si la fecha está en el array de fechas deshabilitadas
    return newDates.some(
      (newDate) =>
        date.getFullYear() === newDate.getFullYear() &&
        date.getMonth() === newDate.getMonth() &&
        date.getDate() === newDate.getDate()
    )
  }

  return (
    <main className=''>
      <section className='w-full h-full'>
        <article
          className={`w-full h-28  flex justify-between items-center px-3 py-2 ${styles.articleT} ${styles.articleD} bg-stone-400`}
        >
          <aside>
            <p className='text-sm font-semibold italic tracking-widest '>
              {categoryName}
            </p>
            <h2
              className={`text-3xl  ${styles.h2D} font-bold tracking-widest `}
            >
              {title}
            </h2>
          </aside>
          <Link to='/'>
            <BiChevronLeft className='text-6xl font-bold hover:text-amber-500' />
          </Link>
        </article>
        <article
          className={`w-full bg-opacity-10 bg-slate-400 flex justify-between items-center px-3 tablet:px-6 laptop:px-10 py-3 ${styles.divT} ${styles.divD}`}
        >
          <aside className='flex items-center gap-1 '>
            <GrLocation className='text-2xl  ' />
            <span className='text-lg font-bold'>{location}</span>
          </aside>
          <Link onClick={unAuthorized}>
            <aside className='flex justify-center items-center gap-3'>
              <div className='text-right'>
                <p className=' text-lg text-left text-amber-600 font-bold'>
                  Excelente
                </p>
                <span className={`${styles["text-base"]} flex`}>
                  <StarRating
                    productId={id}
                    userId={auth.id}
                    onSetScore={getAverageScore}
                  />
                </span>
              </div>
              <p className='w-10 h-10 flex items-center justify-center text-white bg-stone-600 text-lg font-bold rounded-lg m-2 p-5'>
                {averageScore}
              </p>
            </aside>
          </Link>
        </article>
        <section className='w-full py-4'>
          <div className='grid gap-2'>
            <div
              className={`w-full flex gap-3 px-4 ${styles.divT} ${styles.divD} `}
            >
              <BiHeart className='text-xl' />
              <GrShareOption className='text-xl' />
            </div>
            <section>
              <article
                className={`${
                  isCarouselOn
                    ? "hidden"
                    : `h-[500px] hidden  grid-cols-4 grid-rows-2 gap-2 desktop:grid desktop:px-10 mx-auto cursor-pointer relative ${styles.divT} ${styles.divD}`
                }   `}
              >
                <img
                  src={urlList[0]}
                  alt=''
                  className={`object-cover  w-full h-full col-span-2 row-span-2 desktop:rounded-lg`}
                />
                {urlList?.slice(1, 5).map((image) => (
                  <img
                    key={image.id}
                    src={image}
                    alt=''
                    className={`object-cover w-full h-full desktop:rounded-lg`}
                  />
                ))}
                <div className='col-span-4 justify-end self-end flex '>
                  <button
                    className='text-lg text-amber-600 font-bold'
                    onClick={showingCarousel}
                  >
                    Ver más
                  </button>
                </div>
              </article>
              {isCarouselOn && (
                <div style={{ textAlign: "center" }}>
                  <AiFillCloseCircle
                    className='text-5xl cursor-pointer absolute ml-80 z-10'
                    onClick={showingCarousel}
                  />
                  <div
                    style={{
                      padding: "0 20px"
                    }}
                  >
                    <Carousel
                      data={urlList.map((image) => {
                        return { image }
                      })}
                      time={4000}
                      width='850px'
                      height='500px'
                      radius='10px'
                      slideNumber={true}
                      slideNumberStyle={slideNumberStyle}
                      automatic={true}
                      dots={true}
                      slideBackgroundColor='darkgrey'
                      slideImageFit='cover'
                      thumbnails={false}
                      thumbnailWidth='100px'
                      style={{
                        textAlign: "center",
                        maxWidth: "850px",
                        maxHeight: "500px",
                        margin: "40px auto"
                      }}
                    />
                  </div>
                </div>
              )}
              <div className='  h-auto tablet:h-auto w-full desktop:hidden'>
                <div className='relative h-full w-full'>
                  <div
                    style={{
                      padding: "0 20px"
                    }}
                  >
                    <Carousel
                      key={id}
                      data={urlList.map((image) => {
                        return { image }
                      })}
                      time={4000}
                      width='850px'
                      height='500px'
                      radius='10px'
                      slideNumber={true}
                      slideNumberStyle={slideNumberStyle}
                      automatic={true}
                      dots={true}
                      slideBackgroundColor='darkgrey'
                      slideImageFit='cover'
                      thumbnails={false}
                      thumbnailWidth='100px'
                      style={{
                        textAlign: "center",
                        maxWidth: "850px",
                        maxHeight: "500px",
                        margin: "40px auto"
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            <article
              className={`w-full px-3 ${styles.articleT} ${styles.articleD} py-5 flex justify-between items-center mt-10 mb-10`}
            >
              <div className='w-1/2'>
                <h2 className='text-lg font-bold  mb-5'>
                  <p className='text-lg font-bold'>{author}</p>
                  <p className='text-xs font-light italic'>Artista </p>
                </h2>
                <span className='text-sm font-bold '>Técnica: </span>
                <p className='text-sm mb-3'>{technique}</p>
                <span className='text-sm font-bold '>Año:</span>
                <p className='text-sm mb-3'>{year}</p>
                <span className='text-sm font-bold '>Valor por día: </span>
                <p className='text-sm mb-3'>${priceHour}</p>
              </div>
              <div className='w-1/2'>
                <span className='text-sm font-bold'>Descripción:</span>
                <p className='text-sm mb-3'>{description}</p>
              </div>
            </article>
            <article
              className={`w-full px-3 ${styles.articleD} py-5`}
            >
              <p className='text-sm font-bold mb-2 '>
                Características de la Obra
              </p>
              <div className='flex justify-evenly w-full mt-4 border-t-2 border-amber-500'>
                {artwork.features.map((feature, index) => (
                  <div className='flex justify-start w-full mt-4' key={index}>
                    <span>
                      <img
                        className='w-7'
                        src={feature.icon}
                        alt={feature.name}
                      />
                    </span>
                    <span className='text-sm mb-3 ml-0 px-1.5'>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
        <section
          className={`w-full bg-opacity-10 bg-slate-400 flex justify-center items-center px-3 tablet:px-6 laptop:px-10 py-3 ${styles.divD}`}
        >
          <article className='w-full grid'>
            {/* <h2 className='text-lg font-bold t my-3'>Fechas disponibles</h2> */}
            <div className='w-full flex flex-col desktop:items-center gap-5 justify-between'>
              <div className='desktop:w-[25%] desktop:h-32 desktop:bg-[#FFFFFF] rounded-lg desktop:shadow-md grid tablet:grid-cols-2 desktop:grid-cols-1 desktop:grid-rows-2 items-center p-5 gap-10 '>
                <p className='text-sm flex justify-center itmes-center'>
                  ¡Fechas disponibles!
                </p>
                <Link onClick={unAuthorizedReservation}>
                  <button
                    className='bg-amber-600 text-white font-bold px-4 py-1 hover:bg-stone-400 rounded w-full text-lg'
                  >
                    Iniciar reserva
                  </button>
                </Link>
              </div>
            </div>
          </article>
        </section>
      </section>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  )
}

export default ArtSelected
