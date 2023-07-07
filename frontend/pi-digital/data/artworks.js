export async function getArtworks() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products/productRandom`
  )
  const result = await response.json()

  return result
}

export async function getArtworksNormal() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products`)
  const result = await response.json()

  return result
}

export async function getArtwork(id) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`)
  const result = await response.json()

  return result
}

export async function getCategories(id) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products/byCategory/${id}`
  )
  const result = await response.json()

  return result
}

export async function getCategoriesList() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`)
  const result = await response.json()

  return result
}

export async function deleteProducts(id) {
  try {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/products/${id}`,
      {
        method: "DELETE"
      }
    )
    await respuesta.json()
  } catch (error) {
    console.log(error)
  }
}

export async function getProduct(search) {
  const respuesta = await fetch(
    `${import.meta.env.VITE_API_URL}/products/byTitleOrAuthor/${search}`
  )
  const resultado = await respuesta.json()
  return resultado
}

export async function getUsersByEmail(email) {
  const respuesta = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/email/${email}`
  )
  const resultado = await respuesta.json()
  return resultado
}

export async function getCategoriesByName(search) {
  const respuesta = await fetch(
    `${import.meta.env.VITE_API_URL}/categories/byName/${search}`
  )
  const resultado = await respuesta.json()
  return resultado
}

export async function updateUserRole(id, role) {
  try {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/users/${id}/role`,
      {
        method: "PUT",
        body: JSON.stringify(role),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    await respuesta.json()
  } catch (error) {
    console.log(error)
  }
}

