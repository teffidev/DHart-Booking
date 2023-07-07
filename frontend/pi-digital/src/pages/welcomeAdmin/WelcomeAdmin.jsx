import React from "react"

const WelcomeAdmin = () => {
  return (
    <section className='w-full h-full flex justify-center items-center bg-opacity-10 bg-slate-400'>
      <article className='w-11/12 max-w-5xl flex flex-col justify-center items-center gap-5  '>
        <h2 className='font-bold text-amber-500 text-2xl text-center  uppercase'>
          Administración
        </h2>
        <img
          src='https://dhart-images.s3.us-east-2.amazonaws.com/logosDhart/DHart_color.png'
          alt=''
          width={200}
          height={200}
          className=''
        />
      </article>
    </section>
  )
}

export default WelcomeAdmin
