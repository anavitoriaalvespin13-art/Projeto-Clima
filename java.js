

async function buscar(){
    const cidade = document.getElementById('cidade').value

    let chave = "cbf0cb8ec21b1035f6a5cdb9d4a17476"
    let endereco1 = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`

       // cria uma variavel caixa com que é uma div
    let caixa = document.querySelector('.caixa-resposta')

      //Vai nas API e busca os dados 
    let respostaServidor = await fetch(endereco1)

     //trasforma os dados da API em dados possivel de entender
    let dadosJson = await respostaServidor.json() 

     document.getElementById('cidade').value = '' //limpa o impute depois da pesquisa

    // pego a varivael Cixa e adiciona algo dentro
    caixa.innerHTML = `
     
<div class = resposta>

      <h2>${dadosJson.name}</h2> 

    <div class = "imgTmp">
      <p class= "temp">${dadosJson.main.temp} °C</p>
      <img class ="icone" src="https://openweathermap.org/img/wn/${dadosJson.weather[0].icon}@2x.png">
    </div > 

      <p class ="clima" >${dadosJson.weather[0].description} </p>

    <div class = "detalhes">

      <div class = "fundo_detalhes">
       <p>min <span>:</span><p/>
       <p>${Math.round(dadosJson.main.feels_like)}<p/>
      </div >

      <div class = "fundo_detalhes">
        <p>Umidade <span>:</span><p/>
        <p> ${dadosJson.main.humidity}<p/>
      </div >

      <div class = "fundo_detalhes">
        <p>máx <span>:</span><p/>
        <p>${dadosJson.main.humidity}<p/>
      </div >
   </div >

</div >
 `
 
//     -------- PARTE DOS 5 DIAS ------------     ///


 let endereco2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`
 
 let caixa5Dias = document.querySelector('.caixa5dias')

 let apiInfor5Dias = await fetch(endereco2)

 let respostaJson2 = await apiInfor5Dias.json() 

 console.log(respostaJson2)

 let listadedias = {}  /*Vai pecorrer toda a lista e armazer em previsão*/ 

  for(let previsao of respostaJson2.list){

   const converterData = new Date(previsao.dt * 1000).toLocaleDateString() /* New Date tem a funçao de converter data */

    if (!listadedias[converterData]) {
      listadedias[converterData] = previsao
    }
 } 

const proximos5dias = Object.values(listadedias).slice(0,5);

console.log(listadedias)


caixa5Dias.innerHTML = `

 <div class="caixa2">
         
   <p class = "titulo">Previsão dos proximos 5 dias </p>

   <div class ="listaDias"> 
   </div>

 </div>

`

const lista = document.querySelector('.listaDias')

lista.innerHTML = ""

for(let previsao of proximos5dias){

  const data = new Date(previsao.dt* 1000)

  const diaSemana = data.toLocaleDateString('pt-BR', {
    weekday: 'long'
  })

  const dia = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)


lista.innerHTML += `

<div class = "dia">
  <p class ="nomeDia"> ${dia}</p>

  <img class ="imags" src="https://openweathermap.org/payload/api/media/file/${previsao.weather[0].icon}.png"/>

  <p class ="nome-clima" >${previsao.weather[0].description}</p>
  
  <p>
    ${previsao.main.temp_min} /
    ${previsao.main.temp_max} 
  <p/>
</div>
`
}}
