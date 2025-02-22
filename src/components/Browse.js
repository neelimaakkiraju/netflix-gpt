import React, { useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/constants'

const Browse = () => {
  const getMovies = async()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTIONS)
    const json = data.json()
    console.log(json)
  }
  useEffect(()=>{

    getMovies()

  },[])
  return (
    <div className='w-full'>
      <Header/>

    </div>
  )
}

export default Browse