const Button = ({ text }) => {
  return (
    <button className='bg-neutral-400 hover:bg-primary text-black font-bold py-1 px-2 rounded text-xs '>
      {text}
    </button>
  )
}

export default Button
