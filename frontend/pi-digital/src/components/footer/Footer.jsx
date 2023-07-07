const Footer = () => {
  return (
    <footer className='w-full h-16  flex justify-center items-center mt-5 bg-stone-950 '>
      <article className='w-11/12 text-sm '>
        <div className='flex items-center'>
          <img
            src='https://dhart-images.s3.us-east-2.amazonaws.com/logosDhart/DHart_blanco.png'
            alt='Logo'
            height='55'
            width='55'
            className=''
          />

          <span className='ml-3 text-xs font-semibold text-white'>
            &copy; 2023
          </span>
        </div>
        <div></div>
      </article>
    </footer>
  )
}

export default Footer
