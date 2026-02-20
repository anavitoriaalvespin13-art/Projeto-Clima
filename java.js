

async function buscar(){
    const cidade = document.getElementById('cidade').value

    let chave = "cbf0cb8ec21b1035f6a5cdb9d4a17476"
    let endereco1 = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`
    let endereco2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${chave}&units=metric&lang=pt_br`
  


       // cria uma variavel caixa com que é uma div
    let caixa = document.querySelector('.caixa-resposta')
    let caixa5Dias = document.querySelector('.caixa5dias')
      //Vai nas API e busca os dados 
    let respostaServidor = await fetch(endereco1)
    let apiInfor5Dias = await fetch(endereco2)

     //trasforma os dados da API em dados possivel de entender
    let dadosJson = await respostaServidor.json() 
    let respostaJson2 = await apiInfor5Dias.json() 

     document.getElementById('cidade').value = '' //limpa o impute depois da pesquisa

     console.log(respostaJson2)


    // pego a varivael Cixa e adiciona algo dentro
    caixa.innerHTML = `
     
      <div class = resposta>

      <h2>${dadosJson.name}</h2> 

      <p class= "temp">${dadosJson.main.temp} °C</p>

      <img class ="icone" src="https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}.png">
       
      <p class ="nome-clima" >${dadosJson.weather[0].description} </p>

<div class = "detalhes">
      <p>Sensação térmica: ${Math.round(dadosJson.main.feels_like)}<p/>
      <p>Umidade: ${dadosJson.main.humidity}<p/>
      <p>Pressão: ${dadosJson.main.humidity}<p/>
</div >

</div >
 `
 
//     -------- PARTE DOS 5 DIAS ------------     ///

caixa5Dias.innerHTML = `

 <div class="caixa2">

 </div>





`
}