import { Link, useHref, useNavigate } from "react-router-dom"
import { BiX } from "react-icons/bi"
import { HiMenu } from "react-icons/hi"
import { FiLogOut } from "react-icons/fi"
import styles from "./header.module.css"
import useAuth from "../hooks/useAuth"
import { useState, useEffect } from "react"
import { AiFillCloseCircle } from "react-icons/ai"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"

import { Button, Drawer, Radio, Space } from "antd"

const Header = () => {
  const url = useHref()
  const navigate = useNavigate()
  const [showInfo, setShowInfo] = useState(false)
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState("right")
  const { auth, setAuth } = useAuth()
  const [bookings, setBookings] = useState([]) // Estado para almacenar el historial de reservas
  const [product, setProduct] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])

  const showDrawer = () => {
    setOpen(true)
  }
  const onChange = (e) => {
    setPlacement(e.target.value)
  }
  const onClose = () => {
    setOpen(false)
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleSubmit = () => {
    navigate("/")
    setAuth({})
    setShowInfo(false)
    localStorage.removeItem("token")

    toast.success("¡Ha cerrado sesión con exito!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-custom-style",
      bodyClassName: "toast-custom-body",
      progressClassName: "toast-custom-progress"
    })
  }

  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/products/${productId}`
      )
      const productData = response.data
      setSelectedProducts((prevProducts) => [...prevProducts, productData])
    } catch (error) {
      console.error("Error al obtener los datos del producto:", error)
    }
  }

  useEffect(() => {
    // Obtener los datos de los productos al abrir el drawer
    if (drawerVisible && bookings.length > 0) {
      setSelectedProducts([])
      bookings.forEach((booking) => {
        fetchProductById(booking.productId)
      })
    }
  }, [drawerVisible, bookings])

  const fetchBookings = async (usuarioId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/bookings/user/${usuarioId}`
      )
      const bookingsData = response.data
      setBookings(bookingsData)

      bookingsData.forEach((booking) => {
        fetchProductById(booking.productId)
      })
    } catch (error) {
      console.error("Error al obtener el historial de reservas:", error)
    }
  }

  useEffect(() => {
    // Obtener el usuarioId del objeto auth
    const usuarioId = auth.id

    if (usuarioId) {
      fetchBookings(usuarioId)
    }
  }, [auth.id])

  return (
    <div className='sticky top-0 z-20'>
      <header className={`${styles.container} p-3  bg-stone-950 `}>
        <nav className=' flex justify-between items-center'>
          <a href='/' className='flex gap-1 items-end'>
            <img
              src={
                "https://dhart-loadimages.s3.amazonaws.com/2e4b0709-638f-4247-a764-a450bd0e305a.png"
              }
              alt='Logo'
              height='90'
              width='90'
              className='cursor-pointer w-25 ml-9'
            />
            <span
              className={`mb-8 ml-2 text-sm font-extralight italic  ${styles.spanText} text-amber-400 tex`}
            >
              Hacemos de tu espacio una Obra Maestra
            </span>
          </a>
          <aside
            className={`duration-200 flex flex-col h-screen fixed z-10 right-[-100%]  w-3/4  top-0 ${styles.asideDisplayT} ${styles.asideDisplay}  bg-blue-500 `}
          >
            <div className='h-52  flex flex-col justify-between px-5 pt-5 pb-2'>
              <BiX className='text-2xl text-white' />
              <h2 className=' text-right font-bold text-xl '>MENÚ</h2>
            </div>
            <div className='hidden'></div>
            <div className='grow flex flex-col justify-between'>
              <div className='flex flex-col gap-10 p-5 '>
                <Link href='' className='text-base  text-right '>
                  Crear cuenta
                </Link>
                <Link href='' className='text-base  text-right '>
                  Iniciar sesión
                </Link>
              </div>
              <div className='w-full flex flex-col'>
                <div className='hidden'>
                  <p className=' text-right text-sm py-1 pr-5'></p>
                </div>
                <div></div>
              </div>
            </div>
          </aside>
          <div>
            <HiMenu className={`text-2xl ${styles.hiMenu} text-white`} />
          </div>

          <div className={`mr-12 hidden  ${styles.containerDivButton} `}>
            <div className='flex gap-2'>
              <Link to='/SignUp'>
                <button
                  className={` ${
                    !url.startsWith("/SignUp")
                      ? !url.startsWith("/admin")
                        ? localStorage.getItem("token")
                          ? "hidden"
                          : " bg-stone-300 hover:bg-stone-700 hover:text-white text-black font-medium py-1 px-2 rounded  text-sm"
                        : "hidden"
                      : "hidden"
                  } `}
                >
                  Crear cuenta
                </button>
              </Link>
              <Link to='/Login'>
                <button
                  className={` ${
                    !url.startsWith("/Login")
                      ? !url.startsWith("/admin")
                        ? localStorage.getItem("token")
                          ? "hidden"
                          : " bg-stone-300 hover:bg-stone-700 hover:text-white text-black font-medium py-1 px-2 rounded  text-sm"
                        : "hidden"
                      : "hidden"
                  } `}
                >
                  Iniciar sesión
                </button>
              </Link>
              <div
                className={` ${
                  localStorage.getItem("token")
                    ? "hidden tablet:flex"
                    : "hidden"
                }`}
              >
                <article className='flex justify-center items-center gap-5'>
                  <div className=''>
                    <Link
                      to='/admin'
                      className={` ${
                        auth.role === "ADMIN"
                          ? `text-base font-bold text-white text-left`
                          : "hidden"
                      }`}
                    >
                      Administración
                    </Link>
                  </div>
                  <div className='w-1 h-10 border border-amber-500 bg-amber-500'></div>
                  <button
                    className='w-12 h-12 bg-white rounded-full text-xl font-bold'
                    onClick={toggleInfo}
                  >
                    {auth.initials}
                  </button>
                  {showInfo && (
                    <div className='  bg-stone-200 bg-opacity-25 mt-100 p-4 rounded flex flex-col justify-between'>
                      <AiFillCloseCircle
                        className='text-black text-right  ml-80 cursor-pointer'
                        onClick={toggleInfo}
                      />

                      <p className='font-semibold text-xs text-white'>
                        Perfil: {""}
                        <span className='text-amber-500 text-sm '>
                          {auth.role}
                        </span>
                      </p>
                      <p className='font-semibold text-xs text-white'>
                        E-mail: {""}
                        <span className='text-amber-500 text-sm'>
                          {auth.userEmail}
                        </span>
                      </p>
                      {/* Drawer */}
                      <div className='mt-3 justify-center flex '>
                        <Space className=''>
                          <Button
                            onClick={showDrawer}
                            className='bg-stone-600 text-white font-bold px-4 py-1 hover:bg-stone-950 active:bg-stone-300 focus:outline-false focus:outline-stone-200 w-full'
                          >
                            Ver historial de reservas
                          </Button>
                        </Space>
                        <Drawer
                          title='Historial de Reservas'
                          placement={placement}
                          width={500}
                          onClose={onClose}
                          visible={open}
                        >
                          {/* Renderizar los datos del historial de reservas */}
                          {bookings.map((booking) => {
                            const selectedProduct = selectedProducts.find(
                              (product) => product.id === booking.productId
                            )

                            return (
                              <div
                                key={booking.id}
                                className='max-w-sm w-full lg:max-w-full lg:flex mb-7 shadow-xl rounded-lg'
                              >
                                <div class='w-full  flex flex-row  rounded-lg xl:rounded-t-none xl:rounded-l text-left overflow-hidden'>
                                  <div className='w-2/5'>
                                    <img
                                      className='object-cover w-full h-full'
                                      src={selectedProduct.urlList[0]}
                                      alt='Imagen del producto'
                                    />
                                  </div>
                                  <div className='w-3/5 bg-stone-300  lg:border-l-0 lg:border-t lg:border-gray-400  rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
                                    <div className=' text-gray-900 font-bold text-xl mb-2'>
                                      <p className='text-xs font-light italic'>
                                        Título:
                                      </p>
                                      <p className='text-sm font-bold uppercase mb-1.5'>
                                        {selectedProduct.title}
                                      </p>
                                      <p className='text-xs font-light italic'>
                                        Autor:
                                      </p>
                                      <p className='text-sm font-medium'>
                                        {selectedProduct.author}
                                      </p>
                                    </div>
                                    <div className='flex items-center'>
                                      <div className=' text-stone-700 text-xs'>
                                        <div
                                          className={`gap-2.5 mb-1 ${styles.historyDates}`}
                                        >
                                          <p className='text-stone-700 text-xs font-semibold'>
                                            {booking.dateStart}
                                          </p>
                                          <span> </span>
                                          <p className='text-stone-700 text-xs font-semibold'>
                                            {booking.dateEnd}
                                          </p>
                                        </div>
                                        <p className='text-stone-700 text-xs'>
                                          {product.confirmed
                                            ? "Confirmado"
                                            : "Pendiente"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </Drawer>
                      </div>

                      <div>
                        <a onClick={toggleInfo} className='cursor-pointer'></a>
                      </div>
                    </div>
                  )}
                  <div>
                    <p className='font-bold text-base text-right text-white'>
                      Hola,
                    </p>
                    <p className='font-bold text-base text-amber-500'>
                      {auth.firstName} {auth.lastName}
                    </p>
                  </div>
                  <div
                    className='text-4xl text-center text-[#6b1d1d] hover:text-[#b23b3b] my-1 mr-9 cursor-pointer'
                    onClick={handleSubmit}
                  >
                    <FiLogOut className='text-white hover:text-amber-500' />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </nav>
      </header>
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
    </div>
  )
}

export default Header
