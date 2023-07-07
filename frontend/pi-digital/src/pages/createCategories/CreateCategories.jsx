import { useState } from "react"
import { useNavigate } from "react-router"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import styles from "./createCategories.module.css"
import { registrarImages } from "../../services/product.service"

const CreateCategories = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imagePath, setImagePath] = useState("")

  const navigate = useNavigate()

  const changeUploadImages = (e) => {
    e.preventDefault()
    console.log(e)
    setImagePath(e.target.files)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    // navigate((to = "/admin/admin-users"))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const imagesToSend = new FormData()
    Object.values(imagePath).forEach((imageFile) =>
      imagesToSend.append("files", imageFile)
    )
    const imagesUrlsUploaded = await registrarImages(imagesToSend)
    const listImgs = imagesUrlsUploaded.data.map(({ url, key }) => {
      return { url, key }
    })

    const dataInput = {
      title,
      description,
      imageUrl: listImgs[0].url,
      imagePath: listImgs[0].key
    }
    console.log(dataInput)
    navigate(-1)
    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/categories`,
        dataInput
      )

      if (data) {
        toast.success("¡Categoria guardada con exito!", {
          position: "top-center",
          autoClose: 5000,
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
      setTitle("")
      setDescription("")
      setImageUrl("")
    } catch (error) {
      if (error.response.status === 409) {
        toast.warning("¡La categoria ya existe!", {
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
      } else if (error.response.status === 401) {
        toast.warning(
          "¡No fue posible crear la categoría, intenta más tarde!",
          {
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
          }
        )
      }
    }
  }

  return (
    <section className='w-full h-full flex justify-center items-center bg-opacity-10 bg-slate-400'>
      <article className='w-4/6 max-w-5xl flex flex-col justify-center items-center gap-5 my-14 '>
        <h2 className='font-bold text-2xl text-center mb-6'>Nueva categoría</h2>
        <form
          className='w-full flex flex-col justify-between gap-10 text-base'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col gap-3'>
            <div className={` ${styles.divformT} gap-4`}>
              <div className='  mb-5 w-full '>
                <label
                  htmlFor='title'
                  className='w-full block text-gray-700 font-bold'
                >
                  Nombre
                </label>
                <input
                  id='title'
                  type='text'
                  placeholder='Nombre de la categoría'
                  className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-sm placeholder:italic'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <label htmlFor='imagen' className='block text-gray-700 font-bold'>
                Imagen
              </label>
              <input
                id='imagen'
                type='file'
                placeholder='Selecciona una imagen'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-sm placeholder:italic'
                onChange={(e) => changeUploadImages(e)}
              />
            </div>

            <div className='mb-5'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold'
              >
                Descripción
              </label>
              <textarea
                id='description'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md text-sm placeholder:italic'
                placeholder='Descripción de la categoría'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='flex justify-center items-center'>
              <button
                type='submit'
                className={`bg-amber-600 text-white font-bold px-4 py-1 hover:bg-stone-400 rounded w-52 h-10 text-lg`}
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </article>
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
    </section>
  )
}

export default CreateCategories
