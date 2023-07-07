import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { getArtworks } from "../../../data/artworks"
import axios from "axios"
import "./productList.module.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function loader() {
  const artworks = getArtworks()
  return artworks
}

const ProductList = () => {
  const artworksList = useLoaderData()
  const shortList = artworksList.slice(0, 1)
  const [list, setList] = useState(shortList)

  const removeArt = async (id) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    )
    const updatedList = list.filter((item) => item.id !== id)
    setList(updatedList)
  }

  const handleRemove = (id) => {
    try {
      toast.info("¿Deseas eliminar esta obra?", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
        closeButton: false,
        draggable: false,
        closeOnClick: false,
        pauseOnHover: false,
        progress: undefined,
        className: "toast-custom-style",
        bodyClassName: "toast-custom-body",
        buttons: [
          {
            text: "¡Si, borrar!",
            onClick: () => {
              removeArt(id)
              toast.dismiss()
              toast.info("La obra ha sido borrada.")
            }
          },
          {
            text: "¡Mejor no!",
            onClick: () => {
              toast.dismiss()
              toast.info("¡La acción ha sido cancelada!")
            }
          }
        ]
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='tablet:w-1/2 desktop:w-3/5 tablet:h-screen tablet:overflow-y-scroll'>
      <h2 className='font-bold text-3xl text-center'>Listado de Obras</h2>

      {list?.map((item) => (
        <div
          className='m-5 bg-white shadow-md px-5 py-10 rounded-xl'
          key={item.id}
        >
          <p className='font-bold mb-3 text-stone-700 uppercase'>
            Titulo de la obra: {""}
            <span className='font-normal normal-case'>{item.title}</span>
          </p>
          <p className='font-bold mb-3 text-stone-700 uppercase'>
            Autor: {""}
            <span className='font-normal normal-case'>{item.author}</span>
          </p>

          <div className='flex justify-between mt-10'>
            <button
              type='button'
              className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg'
              onClick={() => handleRemove(item.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
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

export default ProductList
