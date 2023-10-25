import express from 'express'
import path from 'path'

// incluir y utilizar cors
import cors from 'cors'

const app = express()
console.log(process.cwd())
// configurar el servidor para que pueda recibir json

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd() , '/index.html'))
})
app.post('/calcular', (req, res) => {
  const { ingreso1, ingreso2, montoAPagar } = req.body

  // pasar a float ingreso 1 e ingreso 2 y total
  const totalAPagar = parseFloat(montoAPagar)
  const num1 = parseFloat(ingreso1)
  const num2 = parseFloat(ingreso2)
  // sumar los dos numeros
  const totalIngresado = num1+num2
  
  // calcular el porcentaje de cada monto segun el total
  const porcentaje1 = (num1*100)/totalIngresado
  const porcentaje2 = (num2*100)/totalIngresado
  // calcular cuanto se le debe pagar a cada uno con dos decimales
  const total1 = cuantoPago(totalAPagar, porcentaje1)
  const total2 = cuantoPago(totalAPagar, porcentaje2)
  res.json({ 
    porcentaje1, 
    porcentaje2, 
    total1, 
    total2,
  })
})

function cuantoPago(total, porcentaje){
  return total*(porcentaje/100).toFixed(2)
}
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})


