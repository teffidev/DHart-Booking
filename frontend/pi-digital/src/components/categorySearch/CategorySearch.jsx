import { useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { getCategoriesByName } from "../../../data/artworks"
import useDataArt from "../hooks/useDataArt"
import Swal from "sweetalert2"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export async function loader({ params }) {
  const categoriesSearch = await getCategoriesByName(params.search)
  return categoriesSearch
}

const CategorySearch = () => {
  const searchTerm = useParams()
  const navigate = useNavigate()
  const categoriesSearch = useLoaderData()
  const [list, setList] = useState(categoriesSearch)
  const { setTermSearchCategory, setResultSearchCategory } = useDataArt()

  const removeCategory = async (id) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/categories/${id}`
    )
    console.log(data)
    const updatedList = list.filter((item) => item.id !== id)
    setList(updatedList)
    setTermSearchCategory("")
    setResultSearchCategory(true)
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
        title: "¿Desea eliminar esta categoría?",
        text: "El proceso no puede ser revertido!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F59E0B",
        cancelButtonColor: "#BDBDBD",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          removeCategory(id)
          navigate("/admin/edit-delete-categories")
          setTermSearchCategory("")
          Swal.fire("Borrada!", "La categoria ha sido borrado.", "success")
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
          <div className='flex mt-5  '>
            {list?.map((category) => (
              <div
                className='m-5 bg-white shadow-md px-5 py-10 rounded-xl'
                key={category.id}
              >
                <p className='font-bold mb-3 text-stone-500'>
                  Nombre de la categoría: {""}
                  <span className='font-normal normal-case'>
                    {category.title}
                  </span>
                </p>
                <p className='font-bold mb-3 text-stone-500'>
                  Descripción: {""}
                  <span className='font-normal normal-case'>
                    {category.description}
                  </span>
                </p>

                <div className='flex justify-center mt-10 gap-2'>
                  <button
                    type='button'
                    className='bg-amber-600 text-white font-bold px-4 py-1 hover:bg-stone-400 rounded w-52 h-10 text-lg'
                    onClick={() => handleEdit(category.id)}
                  >
                    Editar
                  </button>
                  <button
                    type='button'
                    className='bg-stone-400 text-white font-bold px-4 py-1 hover:bg-stone-600 rounded w-52 h-10 text-lg'
                    onClick={() => handleRemove(category.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='mt-10 text-center font-bold text-red-700'>
            Ninguna categoría encontrada
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

export default CategorySearch
