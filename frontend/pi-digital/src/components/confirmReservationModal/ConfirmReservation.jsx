import {
  HiOutlineArchiveBox,
  HiOutlineSquares2X2,
  HiOutlineCalendarDays
} from "react-icons/hi2"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import cards from "../../../public/icons-cartas.png"
import styles from "./confirmReservation.module.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Swal from "sweetalert2"

const ConfirmReservation = ({
  auth,
  artwork,
  categoryName,
  setShowModal,
  city,
  selectedDate
}) => {
  const { title, author, priceHour, urlList, id } = artwork

  const [times, setTimes] = useState({ dateStart: "", dateEnd: "", days: 0 })
  const [prices, setPrices] = useState({
    discount: 200,
    tax: 20,
    shipCost: 20,
    priceByTotalDays: 0
  })

  const navigate = useNavigate()
  const setUpTimesFormat = () => {
    const time = selectedDate[1].$d.getTime() - selectedDate[0].$d.getTime()

    const days = time / (1000 * 3600 * 24)
    days === 0 ? days == 1 : days

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    }

    const dateStart = selectedDate[0].$d.toLocaleDateString("es-ES", options)
    const dateEnd = selectedDate[1].$d.toLocaleDateString("es-ES", options)

    setTimes({ dateStart, dateEnd, days })

    setPrices({ ...prices, priceByTotalDays: priceHour * days })
  }

  useEffect(() => {
    setUpTimesFormat()
  }, [selectedDate])

  const reservationData = {
    dateStart: `${selectedDate[0].$y}-${String(selectedDate[0].$M + 1).padStart(
      2,
      "0"
    )}-${String(selectedDate[0].$D).padStart(2, "0")}`,
    dateEnd: `${selectedDate[1].$y}-${String(selectedDate[1].$M + 1).padStart(
      2,
      "0"
    )}-${String(selectedDate[1].$D).padStart(2, "0")}`,
    totalPrice: String(
      prices.priceByTotalDays + prices.tax + prices.shipCost - prices.discount
    ),

    confirmed: "true",
    productId: id,
    usuarioId: auth.id,
    paymentMethodId: 1
  }

  const reservationDone = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        reservationData
      )

      setShowModal(false)
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "¡Felicidades!",
        text: "Su reserva, se ha realizado con exito",
        showConfirmButton: false,
        timer: 3000
      })
      navigate("/")
    } catch (error) {
      if (error.response.data === "Booking is not available") {
        toast.warning("La fecha seleccionada no está disponible", {
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
  }

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto mt-60 mb-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='block items-start justify-between pl-10 p-5 '>
              <h4 className='text-3xl ml font-semibold'>Resumen de reserva</h4>
              <p className='t opacity-50'>
                Ahora, solo necesitas confirmar tu reserva
              </p>
            </div>
            <div className={`pt-0 pl-10 pr-10 pb-10 ${styles.container}`}>
              <div>
                <img
                  src={urlList[0]}
                  alt=''
                  className={`tablet:w-[400px] desktop:w-full tablet:h-[250px] desktop:h-[500px] tablet:mx-8 desktop:mx-0 ${styles.artImgModal}`}
                />
                <div>
                  <h6 className='text-lg t opacity-50  mt-2.5 mb-2.5'>
                    Datos de contacto
                  </h6>
                  <p>
                    Nombre: {auth.firstName} {auth.lastName}
                  </p>
                  <p>Email: {auth.userEmail}</p>
                  <p>Ciudad: {city}</p>
                </div>
              </div>
              <div>
                <div className='flex justify-evenly'>
                  <div>
                    <h4 className=' text-lg t opacity-60 mb-2.5 mt-2.5'>
                      Usted seleccionó:
                    </h4>
                    <div className='flex'>
                      <HiOutlineSquares2X2 className='mr-2.5' />
                      <p className='font-medium'>{categoryName}</p>
                    </div>
                    <div className='flex'>
                      <HiOutlineArchiveBox className='mr-2.5' />
                      <h6 className='font-medium'>
                        {title} - {author}
                      </h6>
                    </div>

                    <div className='flex mt-3.5 justify-evenly'>
                      <div className={`${styles.artDatesContainer}`}>
                        <h5 className=' text-lg t opacity-50 '>Fecha inicio</h5>
                        <p className='font-medium'>{times.dateStart}</p>
                      </div>
                      <div className={`${styles.artDatesContainer}`}>
                        <h5 className=' text-lg t opacity-50  '>Fecha fin</h5>
                        <p className='font-medium'>{times.dateEnd}</p>
                      </div>
                    </div>

                    <h6 className='text-lg t opacity-50  mt-2.5 mb-2.5'>
                      Duración
                    </h6>
                    <div className='flex'>
                      <HiOutlineCalendarDays className='mr-2.5' />
                      <p className='font-medium'>{times.days} días</p>
                    </div>

                    <h6 className='text-lg t opacity-50  mt-2.5 mb-2.5'>
                      Forma de pago
                    </h6>
                    <div className='flex justify-evenly'>
                      <img src={cards} alt='' />
                      <div>
                        <p>Tarjeta de crédito</p>
                        <p>**** **** **** 2048</p>
                      </div>
                    </div>

                    <h6 className='text-lg t opacity-50  mt-2.5 mb-2.5'>
                      Resumen de precios
                    </h6>
                    <div className='flex justify-between border-b border-solid border-slate-200 mb-3.5'>
                      <p className='font-medium'>Obra por día</p>
                      <p className='font-bold'>$ {priceHour}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='font-medium'>
                        Precio por {times.days} días
                      </p>
                      <p className='font-bold'>$ {prices.priceByTotalDays}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='font-medium'>Descuento</p>
                      <p className='font-bold'>$ {prices.discount}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='font-medium'>Impuesto</p>
                      <p className='font-bold'>$ {prices.tax}</p>
                    </div>
                    <div className='flex justify-between border-b border-solid border-slate-200 mb-3'>
                      <p className='font-medium'>Costo envio</p>
                      <p className='font-bold'>$ {prices.shipCost}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='font-medium text-green-500'>Precio Total</p>
                      <p className='font-bold text-green-500'>
                        ${" "}
                        {prices.priceByTotalDays +
                          prices.tax +
                          prices.shipCost -
                          prices.discount}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                  <button
                    className='background-transparent font-bold text-lg text-stone-500 px-4 py-1 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={() => setShowModal(false)}
                  >
                    Editar
                  </button>
                  <button
                    className='bg-amber-500 text-white font-bold px-4 py-1 hover:bg-yellow-500 rounded w-52 h-10'
                    type='button'
                    onClick={reservationDone}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-70 fixed inset-0 z-40 bg-black'></div>
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
    </>
  )
}

export default ConfirmReservation
