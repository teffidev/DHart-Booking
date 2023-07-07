import { useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { getProduct } from "../../../data/artworks"
import useDataArt from "../hooks/useDataArt"
import Swal from "sweetalert2"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export async function loader({ params }) {
  const artworkSearch = await getProduct(params.search)
  return artworkSearch
}

const ProductsSearch = () => {
  const searchTerm = useParams()
  console.log(searchTerm)
  const navigate = useNavigate()
  const artworkSearch = useLoaderData()
  const [list, setList] = useState(artworkSearch)
  const { termSearch, setTermSearch, setResultSearch } = useDataArt()

  const removeArt = async (id) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    )
    console.log(data)
    const updatedList = list.filter((item) => item.id !== id)
    setList(updatedList)
    setTermSearch("")
    setResultSearch(true)
  }

  const handleEdit = (id) => {
    toast.warning("Funcionalidad no disponible", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  const handleRemove = (id) => {
    try {
      Swal.fire({
        title: "Desea eliminar esta obra?",
        text: "El proceso no puede ser revertido!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F59E0B",
        cancelButtonColor: "#BDBDBD",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          removeArt(id)

          navigate(`/admin/delete-products`)
          setTermSearch("")

          Swal.fire("Borrada!", "La obra ha sido borrado.", "success")
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='w-full h-full'>
        <h2 className='font-bold text-xl text-center mt-5 text-stone-400'>
          Resultado de la búsqueda
        </h2>
        {list.length ? (
          <div className='flex justify-center mt-10 gap-2'>
            {list?.map((item) => (
              <div
                className='m-5 bg-white shadow-md px-5 py-10 rounded-xl'
                key={item.id}
              >
                <p className='font-bold mb-3 text-stone-500'>
                  Titulo de la obra: {""}
                  <span className='font-normal normal-case'>{item.title}</span>
                </p>
                <p className='font-bold mb-3 text-stone-500'>
                  Autor: {""}
                  <span className='font-normal normal-case'>{item.author}</span>
                </p>

                <div className='flex justify-center mt-10 gap-2'>
                  <button
                    type='button'
                    className='bg-amber-600 text-white font-bold px-4 py-1 hover:bg-stone-400 rounded w-52 h-10 text-lg'
                    onClick={() => handleEdit(item.id)}
                  >
                    Editar
                  </button>
                  <button
                    type='button'
                    className='bg-stone-400 text-white font-bold px-4 py-1 hover:bg-stone-600 rounded w-52 h-10 text-lg'
                    onClick={() => handleRemove(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='mt-10 text-center font-bold text-red-700'>
            Ninguna obra encontrada
          </p>
        )}
      </div>
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

export default ProductsSearch
