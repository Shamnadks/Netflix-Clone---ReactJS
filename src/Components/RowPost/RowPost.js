import React,{useEffect,useState} from 'react'
import './RowPost.css'
import axios from '../../axios'
import {imageUrl,apiKey } from '../../Constants/Constants'
import YouTube from 'react-youtube'
function RowPost(props) {
  const [movies,setMovies]=useState([])
  const [urlId,setUrlId]=useState('')
  useEffect(()=>
    {
      axios.get(props.url).then((response)=>
      {
        console.log(response.data)
        setMovies(response.data.results)
      })
    },[])
    const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      }
    }
    const handleMovie=(id)=>
    {
      console.log(id)
      axios.get(`/movie/${id}/videos?api_key=${apiKey}&language=en-US`).then((response)=>
      {
        if(response.data.results.length!==0)
        {
          setUrlId(response.data.results[0])
        }
        else
        {
          console.log('0 elements found')
        }
      })
    }
  return (
    
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj)=>
          
            <img onClick={()=>
            {
              handleMovie(obj.id)
            }} src={`${imageUrl+obj.backdrop_path }`} alt="imggg" className={props.isSmall?"smallPoster":"poster"} />
          )
        }
      </div>
      { urlId && <YouTube videoId={urlId.key} opts={opts}/>}
    </div>
  )
}

export default RowPost
