import React,{useState} from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
    const [data,setData] = useState({})
    const [location,setLocation] = useState('');
    const [error,setError] = useState(false);
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=80cf39d86d4d06c37c503afcf4d6e689`

    const searchLocation = (e)=>{
        setError(false)
        if(e.key==='Enter'){
            axios.get(url)
            .then(res=>{
                setData(res.data);
            })
            .catch(err=>{
                setError(true);
            })
            // setLocation('');
        }
    }
    if(!location){
        axios.get('https://api.openweathermap.org/data/2.5/weather?q=kathmandu&appid=80cf39d86d4d06c37c503afcf4d6e689')
        .then(res=>{
            setData(res.data);
        })
    }
  return (
    <div className="App">
    <h2>Weather App</h2>
      <div className="container">
        <div className="contents">
            <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} onKeyPress={searchLocation} placeholder='Enter City Name' className='search' />
            {error?
            (
                <p style={{color:"red", fontSize:25}}>No City Found!!</p>
            ):
            (
            <>
                <div className="top">
                    <h1>{data?data.name:'Kathmandu'}</h1>
                    {/* <p>{Date}</p> */}
                    {data.weather?<p>{data.weather[0].main}</p>:null}
                </div>
                <div className="bottom">
                    <div className="feels">
                        <p>{data.main?<p>{data.main.feels_like} °F</p>:null}</p>
                        <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                        <p>{data.main?<p>{data.main.humidity} %</p>:null}</p>
                        <p>Humidity</p>
                    </div>
                    <div className="wind">
                        <p>{data.wind?<p>{data.wind.speed} MPH</p>:null}</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </>
            )}
        </div>
      </div>
    </div>
  )
}

export default App