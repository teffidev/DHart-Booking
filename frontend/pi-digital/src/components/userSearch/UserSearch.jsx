import { useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { getUsersByEmail } from "../../../data/artworks"
import useDataArt from "../hooks/useDataArt"

export async function loader({ params }) {
  const usersSearch = await getUsersByEmail(params.search)
  return usersSearch
}

const UserSearch = () => {
  const searchTerm = useParams()
  console.log(searchTerm.search)

  const navigate = useNavigate()
  const usersSearch = useLoaderData()

  const [list, setList] = useState([usersSearch])
  const { setResultSearchUser, setTermSearchUser } = useDataArt()
  setResultSearchUser(usersSearch)

  return (
    <>
      <div className='w-full h-full'>
        <h2 className='font-bold text-xl text-center mt-5 text-stone-400'>
          Resultado de la búsqueda
        </h2>
        {list.length ? (
          <div className='flex justify-center mt-10 gap-2'>
            {list?.map((user) => (
              <div
                className='m-5 bg-white shadow-md px-5 py-10 rounded-xl'
                key={user.idUsuario}
              >
                <p className='font-bold mb-3 text-stone-500'>
                  Nombre del usuario: {""}
                  <span className='font-normal normal-case'>
                    {user.firstName} {""} {user.lastName}
                  </span>
                </p>
                <p className='font-bold mb-3 text-stone-500'>
                  Email: {""}
                  <span className='font-normal normal-case'>{user.email}</span>
                </p>
                <p className='font-bold mb-3 text-stone-500'>
                  Rol: {""}
                  <span className='font-normal normal-case'>
                    {user.roles[0].name}
                  </span>
                </p>

                <div className='flex justify-center mt-10 gap-2'>
                  <button
                    type='button'
                    className='bg-amber-600 text-white font-bold px-4 py-1 hover:bg-stone-400 rounded w-52 h-10 text-lg'
                    onClick={() =>
                      navigate(`/admin/admin-user/${searchTerm.search}/edit`)
                    }
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='mt-10 text-center font-bold text-red-700'>
            Ningún usuario encontrado
          </p>
        )}
      </div>
    </>
  )
}

export default UserSearch
