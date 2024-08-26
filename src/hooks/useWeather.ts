import axios from "axios"
import { SearchType } from "../types";
import { z} from 'zod'
import { useMemo, useState } from "react";

//zod
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp:z.number(),
        temp_max:z.number(),
        temp_min:z.number(),
    })
})

export  type Weather = z.infer<typeof Weather>
export default function useWeather() {
    const [problem,setProblem]=useState(false)
    const [weather,setWeather]=useState({
        name: '',
        main:{
            temp:0,
            temp_max:0,
            temp_min:0,
        } 
    })
    const [loading,setLoading]=useState(false)
    const fetchWeater= async(search:SearchType)=>{
        const appId=import.meta.env.VITE_API_KEY
      setLoading(true)
      setWeather({
        name: '',
        main:{
            temp:0,
            temp_max:0,
            temp_min:0,
        } 
    })
    setProblem(false)
        try {
            const geoUrl=`https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const {data} = await axios(geoUrl)
            // Comprobar si existe 
            if(!data[0]){
                setProblem(true)
                return
            }
            const lat = data[0].lat
            const lon = data[0].lon
            const weather =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            //ZOD PARA AUTOTIPADO
            const { data:weatherres }=await axios(weather)
            const result = Weather.safeParse(weatherres)
            if(result.success){
                setWeather(result.data)
            }
            console.log(result)
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
   
        }
    }
    const hasWeaData=useMemo(()=>weather.name,[weather])
  return {
    fetchWeater,
    weather,
    loading,
    hasWeaData,
    problem
  }
}
