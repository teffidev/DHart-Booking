import { useLoaderData, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { DatePicker, Space } from "antd"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import ConfirmReservation from "../../components/confirmReservationModal/ConfirmReservation"
import useAuth from "../../components/hooks/useAuth"
import useDataArt from "../../components/hooks/useDataArt"
import StarRating from "../../components/starRating/StarRating"
import { getArtwork } from "../../../data/artworks"
import { categories } from "../../utilities/utilities"
import { locationsList } from "../../../data/locations"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { BiChevronLeft } from "react-icons/bi"
import { RxLapTimer } from "react-icons/rx"
import { GrLocation } from "react-icons/gr"
import styles from "./artReservation.module.css"
import axios from "axios"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import es from "antd/es/date-picker/locale/es_ES"
import "dayjs/locale/es"
dayjs.locale("es")
es.lang.locale = "es"

export async function loader({ params }) {
  const artwork = await getArtwork(params.id)
  return artwork
}

const schema = yup.object({
  select: yup.string().required("La ciudad es requerida"),
  dates: yup.date().required("La fecha de inicio y fin son requeridas")
})

const ArtReservation = () => {
  const [city, setCity] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const artwork = useLoaderData()
  const { auth } = useAuth()
  const { disabledDates } = useDataArt()
  const [averageScore, setAverageScore] = useState(0.0)

  const {
    title,
    // author,
    // description,
    location,
    id,
    // technique,
    // year,
    // priceHour,
    // available,
    idCategory,
    urlList
    // features
  } = artwork
  const categoryName = categories(idCategory)

  const getAverageScore = async () => {
    axios(`${import.meta.env.VITE_API_URL}/scores/average/${id}`).then(
      ({ data }) => {
        setAverageScore(data)
      }
    )
  }

  useEffect(() => {
    getAverageScore()
  }, [])

  dayjs.extend(customParseFormat)
  const { RangePicker } = DatePicker

  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day")
  }

  const handleDateChange = (date) => {
    console.log(date)
    setSelectedDate(date)
  }

  const newDates = disabledDates.map((disabledDate) => {
    const [year, month, day] = disabledDate.split("-")
    return new Date(year, month - 1, day)
  })

  const isDateDisabled = ({ date }) => {
    return newDates.some(
      (newDate) =>
        date.getFullYear() === newDate.getFullYear() &&
        date.getMonth() === newDate.getMonth() &&
        date.getDate() === newDate.getDate()
    )
  }

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  })

  const formSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main>
      <div className='w-full h-full'>
        <article
          className={`w-full h-28  flex justify-between items-center px-3  py-2 ${styles.articleT} ${styles.articleD} bg-stone-400`}
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
        <form
          className='w-full h-full grid '
          onSubmit={handleSubmit(formSubmit)}
        >
          <div
            className={`items-center tablet:px-6 laptop:px-10 py-3 ${styles.divD} grid grid-cols-1 desktop:grid-cols-3 desktop:row-span-3 gap-8 px-3 mb-8`}
          >
            <h2 className='text-xl font-bold uppercase'>Completa tus Datos</h2>
            <article className='grid tablet:grid-cols-2 gap-5 desktop:col-start-1 desktop:col-span-2 bg-white'>
              <div>
                <div className='mb-2 block'>
                  <label htmlFor='firstName' className='text-sm font-medium'>
                    Nombre
                  </label>
                </div>
                <div className='flex'>
                  <div className='relative w-full'>
                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  rounded-lg p-2.5 text-sm '
                      defaultValue={auth.firstName}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className='mb-2 block'>
                  <label htmlFor='lastName' className='text-sm font-medium'>
                    Apellido
                  </label>
                </div>
                <div className='flex'>
                  <div className='relative w-full'>
                    <input
                      type='text'
                      id='lastName'
                      name='lastName'
                      className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  rounded-lg p-2.5 text-sm '
                      defaultValue={auth.lastName}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className='mb-2 block'>
                  <label htmlFor='email' className='text-sm font-medium'>
                    Correo Electrónico
                  </label>
                </div>
                <div className='flex'>
                  <div className='relative w-full'>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900  rounded-lg p-2.5 text-sm '
                      defaultValue={auth.userEmail}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className='mb-2 block'>
                  <label
                    htmlFor='city'
                    className='text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Ciudad
                  </label>
                </div>
                <select
                  name='city'
                  id='city'
                  className={`h-10 text-sm  tablet:text-base shadow rounded p-2 w-full mb-1 border-hidden ${
                    errors.select && city === "" ? "bg-red-300" : ""
                  }`}
                  value={city}
                  control={control}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value='' className='text-xs'>
                    ¿Lugar de recepción de la Obra?
                  </option>
                  {locationsList.map((location) => (
                    <option value={location} key={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <p className='text-red-600'>
                  {errors.select && city === "" ? errors.select.message : ""}
                </p>
              </div>
            </article>
            <article className={`grid desktop:col-start-1 desktop:col-span-2`}>
              <h2 className=' text-lg font-bold mb-5'>
                Disponibilidad para la reserva
              </h2>
              <div className='flex justify-center'>
                <Calendar className=' tablet:hidden w-full rounded-lg shadow-md border-none text-thirdColor bg-white brdrs p-10' />
                <Calendar
                  showDoubleView={true}
                  className='w-[420px] hidden tablet:grid tablet:w-full desktop:w-[65%] rounded-b-lg desktop:rounded-lg shadow-md p-5  border-none'
                  tileDisabled={isDateDisabled}
                />
              </div>
            </article>
            <article className='grid desktop:col-start-1 desktop:col-span-2'>
              <div className='bg-white grid gap-5'>
                <span className=' flex items-center gap-2 text-lg font-bold'>
                  <RxLapTimer className='text-2xl' />
                  Selecciona la fecha de la reserva
                </span>
                <div className='flex flex-col gap-2'>
                  <Space direction='vertical' size={12}>
                    <RangePicker
                      disabledDate={disabledDate}
                      format='YYYY-MM-DD '
                      changeOnBlur={true}
                      placeholder={["Fecha Inicio", "Fecha final"]}
                      value={selectedDate}
                      onChange={handleDateChange}
                      className='hover:border-black '
                      status={selectedDate == null ? "error" : ""}
                      locale={es}
                    />
                    <p className='text-red-600'>
                      {errors.select && selectedDate == null
                        ? errors.dates.message
                        : ""}
                    </p>
                  </Space>
                </div>
              </div>
            </article>

            {/* seccion  */}

            <article className='grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-1 desktop:col-start-3 desktop:row-start-1 desktop:row-end-4 bg-white brdrs gap-5'>
              <div className=''>
                <h2 className='text-secundaryColor text-xl font-bold my-2 desktop:my-5 py-8'>
                  Detalle de la reserva
                </h2>
                <img
                  src={urlList[0]}
                  alt=''
                  className='tablet:w-[400px] desktop:w-full tablet:h-[250px] desktop:h-[500px] tablet:mx-8 desktop:mx-0 object-cover'
                />
              </div>
              <div className='mx-16 mt-28'>
                <div className='grid gap-2 my-15'>
                  <p className='t opacity-50'>{categoryName}</p>
                  <h2 className=' text-2xl font-bold'>{title}</h2>
                  <aside className='flex  gap-3'>
                    <div className=''>
                      <p className=' text-lg text-left text-amber-500 font-bold'>
                        Excelente
                      </p>
                      <span className='text-base  flex'>
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
                  <aside className='flex items-center gap-1 '>
                    <GrLocation className='text-2xl  ' />
                    <span className='text-lg font-bold'>{location}</span>
                  </aside>
                </div>

                <div className='mt-8'>
                  <button
                    className='bg-amber-600 text-white font-bold px-4 py-1 hover:bg-stone-400 rounded w-52 text-lg'
                    onClick={() =>
                      city && selectedDate
                        ? setShowModal(true)
                        : setShowModal(false)
                    }
                  >
                    Reservar
                  </button>

                  {showModal ? (
                    <ConfirmReservation
                      auth={auth}
                      artwork={artwork}
                      // reservationDone={reservationDone}
                      categoryName={categoryName}
                      setShowModal={setShowModal}
                      city={city}
                      selectedDate={selectedDate}
                    />
                  ) : null}
                </div>
              </div>
            </article>
          </div>
        </form>
      </div>
    </main>
  )
}

export default ArtReservation
