import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import useAuth from "../../components/hooks/useAuth"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import styles from "./login.module.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const schema = yup.object({
  email: yup
    .string()
    .required("El correo es requerido")
    .email("Ingrese un correo válido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "Mínimo 6 caracteres")
})

const Login = () => {
  const { setAuth, setLoading1 } = useAuth()
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const formSubmit = async (loginData) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        loginData
      )
      localStorage.setItem("token", data.accessToken)
      setAuth(data)

      navigate("/")
    } catch (error) {
      console.log(error.response.data)

      toast.error(
        "¡No pudimos encontrar una cuenta con los datos ingresados!",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        }
      )
    } finally {
      setLoading1(false)
    }
  }

  return (
    <main>
      <section className='w-full h-full flex justify-center items-center bg-opacity-10 bg-slate-400'>
        <article className='w-11/12 max-w-2xl h-[540px] flex flex-col justify-center items-center gap-5 mb-[12%]'>
          <h2 className='font-bold text-2xl text-center mb-6'>
            Iniciar Sesión
          </h2>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className='w-4/5 flex flex-col justify-center gap-10 '
          >
            <div className='flex flex-col gap-3'>
              <div>
                <div className='mb-2 block'>
                  <label
                    htmlFor='email'
                    className='block text-gray-700 font-bold'
                  >
                    Correo Electrónico
                  </label>
                </div>
                <input
                  type='text'
                  name='email'
                  id='email'
                  className={`h-10 text-sm  ${
                    styles.inputT
                  } shadow rounded p-2 w-full mb-1 border-hidden ${
                    errors.email?.message ? "bg-red-300" : ""
                  }  `}
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
                    {" "}
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
                  }  `}
                  placeholder={`${
                    errors.password?.message ? "" : "Ingresa tu contraseña"
                  }  `}
                  {...register("password")}
                />
                <p className='text-red-600'>{errors.password?.message}</p>
              </div>
            </div>
            <div className='w-full flex flex-col gap-2'>
              <input
                type='submit'
                className={`cursor-pointer rounded-md   font-semibold mx-auto bg-amber-600 text-white px-4 py-1 hover:bg-stone-400 rounded w-52 h-10 text-lg`}
                value='Ingresar'
              />
              <p className='text-sm text-center'>
                ¿Aún no tienes cuenta?{" "}
                <Link to='/SignUp'>
                  <span className='text-amber-600'>Regístrate</span>
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

export default Login
