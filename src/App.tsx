import styles from './app.module.css'
import Alert from './components/Alert/Alert';
import Form from './components/Form/Form';
import Spinner from './components/Spinner/Spinner';
import Weather from './components/WatherDetail/Weather';
import useWeather from './hooks/useWeather';

function App() {
  const {fetchWeater,weather,loading,hasWeaData,problem}=useWeather()
  
  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form
        fetchWeater={fetchWeater}
        ></Form>
        {loading && <Spinner></Spinner> }
        {hasWeaData && 
          <Weather
          weather={weather}
  
          >
          </Weather>
        }
        {problem && <Alert>Ciudad no Encontrada o no Existe</Alert>}
      </div>
    </>
  )
}

export default App
