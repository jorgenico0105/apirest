import { countries } from '../../data/countries';
import { useState } from 'react';
import styles from './Form.module.css'
import { SearchType } from '../../types';
import { ChangeEvent,FormEvent } from 'react';
import Alert from '../Alert/Alert';
type FormProps={
    fetchWeater: (search:SearchType)=>Promise<void>
}
export default function Form({fetchWeater}: FormProps) {

    const [search,setSearch]=useState<SearchType>({
        city:'',
        country:''
    })
    const [alert,setAlert]=useState('')
const handleChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) =>{
    setSearch({
        ...search,
        [e.target.name]:e.target.value
    })
}
const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(Object.values(search).includes('')){
        setAlert('Por favor llenar todos los campos')
        return
    }
    fetchWeater(search)
}
  return (
    <div>
      <form className={styles.form} 
      onSubmit={handleSubmit}
      >
        {alert && <Alert>{alert}</Alert>}
        <div className={styles.field}>
            <label htmlFor="city">Ciudad</label>    
            <input type="text" 
            id="city" 
            name="city"
            placeholder="Ciudad"
            value={search.city}
            onChange={handleChange}
            />
        </div>
        <div className={styles.field}>
            <label htmlFor="country">Pais</label>
            <select
            id='country'
            name='country'
            value={search.country}
            onChange={handleChange}
            >
            <option value="">--Seleccione un Pais--</option>
                {countries.map(country=>(
                        <option 
                        value={country.code}
                        key={country.code}
                        >
                            {country.name}
                        </option>
                ))}
            </select>  
        </div>
        <input className={styles.submit} type='submit' value='Consultar Clima'></input>
      </form>
    </div>
  )
}
