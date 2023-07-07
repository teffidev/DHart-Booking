import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import useDataArt from "../hooks/useDataArt"
import styles from "./form.module.css"
import { registrarImages } from "../../services/product.service"

const Form = () => {
  const { categories } = useDataArt()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [location, setlocation] = useState("")
  const [technique, setTechnique] = useState("")
  const [year, setYear] = useState()
  const [priceHour, setPriceHour] = useState()
  const [available, setAvailable] = useState(true)
  const [urlList, setUrlList] = useState([])
  const [imagesPath, setImagesPath] = useState({})
  const [idCategory, setIdCategory] = useState()
  const [features, setFeatures] = useState([])

  const changeUploadImages = (e) => {
    e.preventDefault()
    console.log(e)
    setImagesPath(e.target.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const imagesToSend = new FormData()
    Object.values(imagesPath).forEach((imageFile) =>
      imagesToSend.append("files", imageFile)
    )
    const imagesUrlsUploaded = await registrarImages(imagesToSend)
    const listImgs = imagesUrlsUploaded.data.map(({ url }) => url)

    const dataInput = {
      title,
      description,
      location,
      author,
      technique,
      year,
      priceHour,
      available,
      urlList: listImgs,
      idCategory,
      imagePath: listImgs[0],
      imageUrl: listImgs[0],
      features
    }

    console.log(dataInput)

    try {
      const data = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        dataInput
      )
      if (data) {
        toast.success("¡Obra guardada con éxito!", {
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
      setAuthor("")
      setDescription("")
      setIdCategory()
      setAvailable(true)
      setTitle("")
      setTechnique("")
      setYear()
      setlocation("")
      setPriceHour()
      setUrlList([""])
      window.location.reload()
    } catch (error) {
      if (error.response.status === 409) {
        toast.warning("¡La obra ingresada ya existe!", {
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
      } else if (error.response.status === 401) {
        toast.warning("No fue posible crear la obra, intenta más tarde", {
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
    }
  }

  return (
    <section className='w-full h-full flex justify-center items-center bg-opacity-10 bg-slate-400'>
      <article className='w-11/12 max-w-5xl flex flex-col justify-center items-center gap-5 my-14 '>
        <h2 className='text-2xl mt-5 text-center mb-10 '>
          Agrega las obras y {""}
          <span className='stone-600 font-bold '>adminístralas</span>
        </h2>

        <form
          className='w-full flex flex-col justify-between gap-10 text-base'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col gap-4'>
            <div className={`grid grid-cols-4 gap-4`}>
              <div className='mb-5'>
                <label
                  htmlFor='artwork'
                  className='block text-stone-700 font-bold'
                >
                  Título
                </label>
                <input
                  id='title'
                  type='text'
                  placeholder='Titulo de la obra'
                  className='border-2 w-full p-2 mt-2 placeholder-stone-400 rounded-md text-sm placeholder:italic'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className='mb-5'>
                <label
                  htmlFor='propietario'
                  className='block text-stone-700 font-bold'
                >
                  Autor
                </label>
                <input
                  id='author'
                  type='text'
                  placeholder='Autor'
                  className='border-2 w-full p-2 mt-2 placeholder-stone-400 rounded-md text-sm placeholder:italic'
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className='mb-5'>
                <label
                  htmlFor='technique'
                  className='block text-stone-700 font-bold'
                >
                  Técnica
                </label>
                <input
                  id='technique'
                  type='text'
                  placeholder='Técnica aplicada'
                  className='border-2 w-full p-2 mt-2 placeholder-stone-400 rounded-md text-sm placeholder:italic'
                  value={technique}
                  onChange={(e) => setTechnique(e.target.value)}
                />
              </div>

              <div className='mb-5'>
                <label
                  htmlFor='year'
                  className='block text-stone-700 font-bold'
                >
                  Año
                </label>
                <input
                  id='title'
                  type='number'
                  placeholder='Año de creación'
                  className='border-2 w-full p-2 mt-2 placeholder-stone-400 rounded-md text-sm placeholder:italic'
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className={`grid grid-cols-4 gap-5`}>
              <div className='mb-5'>
                <label
                  htmlFor='location'
                  className='block text-stone-700 font-bold'
                >
                  Ubicación
                </label>
                <input
                  id='location'
                  type='text'
                  placeholder='Ubicación actual de la obra'
                  className='border-2 w-full p-2 mt-2 placeholder-stone-400 rounded-md text-sm placeholder:italic'
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                />
              </div>
              <div className={`flex flex-col ${styles.divformT} gap-4`}>
                <div className='mb-5'>
                  <label
                    htmlFor='priceHour'
                    className='block text-stone-700 font-bold'
                  >
                    Precio
                  </label>
                  <input
                    id='priceHour'
                    type='number'
                    placeholder='Precio por hora'
                    className='border-2 w-full p-2 mt-2 placeholder-stone-400 rounded-md text-sm placeholder:italic'
                    value={priceHour}
                    onChange={(e) => setPriceHour(parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className={`flex flex-col ${styles.divformT} gap-4`}>
                <div className='mb-5'>
                  <label
                    htmlFor='artwork'
                    className='block text-stone-700 font-bold'
                  >
                    Disponible
                  </label>
                  <select
                    className='border-2 w-full p-2 mt-2 placeholder-stone-400 rounded-md text-sm placeholder:italic'
                    name='available'
                    id='available'
                    value={available}
                    onChange={(e) => setAvailable(e.target.value)}
                  >
                    <option value=''>-- Selecciona --</option>
                    <option value={true}>Sí</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>
              <div className={`flex flex-col ${styles.divformT} gap-4`}>
                <div className='mb-5'>
                  <label
                    htmlFor='idCategory'
                    className='block text-stone-700 font-bold'
                  >
                    Categoría
                  </label>
                  <select
                    className='border-2 w-full p-2 mt-2 placeholder-stone-400 rounded-md text-sm placeholder:italic'
                    name='idCategory'
                    id='idCategory'
                    value={idCategory}
                    onChange={(e) =>
                      setIdCategory(parseInt(e.target.value), 10)
                    }
                  >
                    <option value=''>-- Selecciona --</option>
                    {categories?.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className='mb-5'>
              <label
                htmlFor='imagen'
                className='block text-stone-700 font-bold'
              >
                Imagen
              </label>
              <input
                id='imagen'
                type='file'
                multiple={true}
                placeholder='Selecciona archivos desde el computador'
                className='border-2 w-full p-2 mt-2 placeholder-stone-400 rounded-md text-sm placeholder:italic'
                onChange={(e) => changeUploadImages(e)}
              />
            </div>

            <div className='mb-5'>
              <label
                htmlFor='description'
                className='block text-stone-700 font-bold'
              >
                Descripción
              </label>
              <textarea
                id='description'
                className='border-2 w-full p-2 mt-2 placeholder-stone-400 rounded-md text-sm placeholder:italic'
                placeholder='Describe datos relevantes de la obra y/o del artista'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className='flex justify-center items-center'>
              <input
                type='submit'
                className='bg-amber-600 text-white font-bold px-4 py-1 hover:bg-stone-400 rounded w-52 h-10 text-lg'
                value={"Guardar"}
              />
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

export default Form
