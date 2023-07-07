import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useDataArt from "../../components/hooks/useDataArt"
import styles from "./editUser.css"

const EditUser = () => {
  const { resultSearchUser, rolesList } = useDataArt()
  const [roleName, setRoleName] = useState("")

  const navigate = useNavigate()

  const { idUsuario, email, firstName, lastName, roles } = resultSearchUser

  const handleSubmit = async (id) => {
    const newRole = {
      roleName
    }

    try {
      const data = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/users/${id}/role`,
        newRole
      )
      console.log(data)
      if (data.status === 200) {
        toast.success("Rol cambiado con éxito", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      }
      navigate(-1)
    } catch (error) {}
  }
  const handleClick = (e) => {
    e.preventDefault()
    handleSubmit(idUsuario)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <section className='w-full h-full flex justify-center items-center bg-opacity-10 bg-slate-400'>
        <article
          className={`w-11/12 max-w-2xl flex flex-col justify-center items-center gap-5 my-14 `}
        >
          <h2 className='font-bold text-xl text-center mt-5 text-stone-600'>
            A continuación podrás modificar los datos de un Usuario
          </h2>
          <div className='flex justify-end'></div>
          <form className='w-4/5 flex flex-col justify-center gap-10 text-base'>
            <div className='flex flex-col gap-3'>
              <div className={`flex flex-col ${styles.divformT} gap-4`}>
                <div className='w-full'>
                  <div>
                    <div className='mb-2 block'>
                      <label
                        htmlFor='firstName'
                        className='block text-gray-700 font-bold'
                      >
                        Nombre
                      </label>
                    </div>
                    <input
                      type='text'
                      name='firstName'
                      id='firstName'
                      className={`h-10 text-sm  ${styles.labelT} shadow rounded p-2 w-full mb-1 border-hidden`}
                      defaultValue={firstName}
                      disabled
                    />
                  </div>
                </div>
                <div className='grid w-full'>
                  <div>
                    <div className='mb-2 block'>
                      <label
                        htmlFor='lastName'
                        className='block text-gray-700 font-bold'
                      >
                        Apellido
                      </label>
                    </div>
                    <input
                      type='text'
                      name='lastName'
                      id='lastName'
                      className={`h-10 text-sm  ${styles.labelT} shadow rounded p-2 w-full mb-1 border-hidden `}
                      defaultValue={lastName}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className='mb-2 block'>
                  <label
                    htmlFor='email'
                    className='block text-gray-700 font-bold'
                  >
                    Correo electrónico
                  </label>
                </div>
                <input
                  type='text'
                  name='email'
                  id='email'
                  className={`h-10 text-sm  ${styles.labelT} shadow rounded p-2 w-full mb-1 border-hidden `}
                  defaultValue={email}
                  disabled
                />
              </div>
              <div className='w-full'>
                <div>
                  <div className='mb-2 block'>
                    <label
                      htmlFor='role'
                      className='block text-gray-700 font-bold'
                    >
                      Rol
                    </label>
                  </div>
                  <select
                    name='role'
                    id='role'
                    className={`h-10 text-sm  ${styles.labelT} shadow rounded p-2 w-full mb-1 border-hidden`}
                    onChange={(e) => setRoleName(e.target.value)}
                  >
                    <option value={roles[0].name}>{roles[0].name}</option>
                    {rolesList?.map((rol) => (
                      <option value={rol.name} key={rol.idRole}>
                        {rol.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-10 gap-2'>
              <button
                className='bg-amber-600 text-white font-bold px-4 py-1 hover:bg-stone-400 rounded w-52 text-lg'
                onClick={handleClick}
              >
                Guardar
              </button>
              <button
                className='bg-stone-400 text-white font-bold px-4 py-1 hover:bg-stone-600 rounded w-52 h-10 text-lg'
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </article>
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
    </>
  )
}

export default EditUser
