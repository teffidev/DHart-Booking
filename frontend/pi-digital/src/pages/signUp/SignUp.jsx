import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import { yupResolver } from "@hookform/resolvers/yup"
import styles from "./signUp.module.css"
import * as yup from "yup"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const schema = yup.object({
  firstName: yup
    .string()
    .required("El nombre es requerido")
    .min(2, "Mínimo 2 caracteres"),
  lastName: yup
    .string()
    .required("El apellido es requerido")
    .min(2, "Mínimo 2 caracteres"),
  email: yup
    .string()
    .required("El correo es requerido")
    .email("Ingrese un correo válido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "Mínimo 6 caracteres"),
  confirmPass: yup
    .string()
    .required(" ")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
  conditions: yup.bool(false).oneOf([true], "Accept Ts & Cs is required")
})

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const formSubmit = async (dataUser) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        dataUser
      )
      toast.info("¡Gracias!. Revsa tu correo electrónico", {
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
    } catch (error) {
      console.log(error)

      toast.error("Ya existe una cuenta con esta dirección de correo", {
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

  return (
    <main>
      <section className='w-full h-full flex justify-center items-center bg-opacity-10 bg-slate-400'>
        <article
          className={`w-11/12 max-w-2xl flex flex-col justify-center items-center gap-5 my-14 mb-[8%]`}
        >
          <h2 className='font-bold text-2xl text-center mb-6'>Crear cuenta</h2>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className='w-4/5 flex flex-col justify-center gap-10 text-base'
          >
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
                      className={`h-10 text-sm  ${
                        styles.labelT
                      } shadow rounded p-2 w-full mb-1 border-hidden ${
                        errors.firstName?.message ? "bg-red-300" : ""
                      }`}
                      placeholder={`${
                        errors.firstName?.message ? "" : "Ingresa tu nombre"
                      }  `}
                      {...register("firstName")}
                    />
                    <p className='text-red-600'>{errors.firstName?.message}</p>
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
                      className={`h-10 text-sm  ${
                        styles.labelT
                      } shadow rounded p-2 w-full mb-1 border-hidden ${
                        errors.lastName?.message ? "bg-red-300" : ""
                      }`}
                      placeholder={`${
                        errors.lastName?.message ? "" : "Ingresa tu apellido"
                      }  `}
                      {...register("lastName")}
                    />
                    <p className='text-red-600'>{errors.lastName?.message}</p>
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
                  className={`h-10 text-sm  ${
                    styles.labelT
                  } shadow rounded p-2 w-full mb-1 border-hidden ${
                    errors.email?.message ? "bg-red-300" : ""
                  } `}
                  placeholder={`${
                    errors.email?.message ? "" : "Ingresa tu correo"
                  }  `}
                  {...register("email")}
                />
                <p className='text-red-600'>{errors.email?.message}</p>
              </div>
              <div>
                <div className='mb-2 block'>
                  <label
                    htmlFor='password'
                    className='block text-gray-700 font-bold'
                  >
                    Contraseña
                  </label>
                </div>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className={`h-10 text-sm  ${
                    styles.labelT
                  } shadow rounded p-2 w-full mb-1 border-hidden ${
                    errors.password?.message ? "bg-red-300" : ""
                  } `}
                  placeholder={`${
                    errors.password?.message ? "" : "Mínimo 6 caracteres"
                  }  `}
                  {...register("password")}
                />
                <p className='text-red-600'>{errors.password?.message}</p>
              </div>
              <div>
                <div className='mb-2 block'>
                  <label
                    htmlFor='confirmPass'
                    className='block text-gray-700 font-bold'
                  >
                    Confirmar contraseña
                  </label>
                </div>
                <input
                  type='password'
                  id='confirmPass'
                  name='confirmPass'
                  className={`h-10 text-sm text-secundaryColor/70 ${
                    styles.labelT
                  } shadow rounded p-2 w-full mb-1 border-hidden ${
                    errors.confirmPass?.message ? "bg-red-300" : ""
                  } `}
                  {...register("confirmPass")}
                />
                <p className='text-red-600'>{errors.confirmPass?.message}</p>
              </div>
              <div className='flex justify-center items-center gap-2'>
                <input
                  type='checkbox'
                  name='conditions'
                  id='conditions'
                  className='h-4 w-4 rounded border border-gray-300 bg-gray-100 '
                />
                <label
                  htmlFor='conditions'
                  className='text-sm font-medium text-gray-900 '
                >
                  Estoy de acuerdo con los{" "}
                  <span className='hover:underline text-amber-600'>
                    {" "}
                    términos y condiciones.
                  </span>
                </label>
                <p className='text-red-600'>{errors.conditions?.message}</p>
              </div>
            </div>
            <div className='w-full flex flex-col gap-2'>
              <input
                type='submit'
                className={`cursor-pointer rounded-md   font-semibold mx-auto bg-amber-600 text-white px-4 py-1 hover:bg-stone-400 rounded w-52 h-10 text-lg`}
                value='Registrar'
              />
              <p className='text-sm text-center text-sm font-medium text-gray-900 '>
                ¿Ya tienes una cuenta?{" "}
                <Link to='/Login'>
                  <span className='hover:underline text-amber-600'>
                    Iniciar sesión
                  </span>
                </Link>{" "}
              </p>
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
    </main>
  )
}

export default SignUp
