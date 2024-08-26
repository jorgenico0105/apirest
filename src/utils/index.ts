export const formatTemp=(temp:number):number=>{
    const kelvin=273.17
    return parseInt((temp - kelvin).toString())
}