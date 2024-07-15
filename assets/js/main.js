// Seleciona os elementos través de uma função $() e todos elementos _$()
var $  = document.querySelector.bind(document)
var _$ = document.querySelectorAll.bind(document)

// Adiciona evento aos elementos através do método on()
HTMLElement.prototype.on = function(evento, callback){
  this.addEventListener(evento, callback)
  return this
}

var btnModoEscuro = $('#btn-modo-escuro')
    btnModoEscuro.on('click', ()=> modoEscuro())

function modoEscuro(){
   let root = $(':root')
       root.classList.toggle('modo-escuro')
}

var qrCodeConfigs = {
     width: 180,
     height: 180,
     text : '',
     colorLight: '#eee',
     colorDark: '#000000',
     logo: '',
     logoWidth: 40,
     logoHeight: 40,
     logoBackgroundColor: '#eee',
     quietZone: 15,
     drawer: 'canvas',
     onRenderingEnd: ()=> abrirModal(),
}

let inputText = $('#input')
let btnSubmit = $('#btn-submit')
let btnDownload = $('.modal #btn-download')

// Gerar um QR Code ao clicar no botão
btnSubmit.on('click', ()=> gerarQRCode(qrCodeConfigs) )


// Gera o QR Code
function gerarQRCode( configs = {}){
 // Pega o valor da caixa de texto e adiciona no objeto.
 qrCodeConfigs.text = String(inputText.value)
 // Seleciona o elemento que exibirá o qr code
  let qrCodeModal = $('.modal #qrcode')
 //Limpa o qr code antigo
      qrCodeModal.innerHTML = ''
 // Verifica se a caixa de texto está preenchida, caso esteja, cria o qr code
 
     if( inputText.value.trim()){
        var qrCode = new QRCode(qrCodeModal, configs)
        btnDownload.onclick = ()=> baixarQRCode(qrCode)
     }else{
        navigator.vibrate([100, 150])
        inputText.focus()
     }
}

// Abre o modal
function abrirModal(){
   let cor = qrCodeConfigs.colorDark
   let modal = $('.modal')
       modal.style.setProperty('--cor-principal', cor)
       modal.show()
}

// Baixa o qr code
function baixarQRCode( obj ) {
   obj.download('QR-Code')
}

// Gera uma paleta de cores
function gerarPaletaDeCores(){
  const cores =  ['#000000','#E62424','#E64524','#F49325','#EACA2C','#90A312','#62A312','#50BD1F','#049514','#21D387','#0AAFCD','#0A75CD','#0A20CD','#854FF4','#430CB1','#BF1FFA','#FA1FDE','#7C066C','#7C0644','#7C0606']
  
 // Cria os blocos de cores
 function criarBlocos(arr = []){
  const paleta = $('.paleta')
  
   arr.forEach((cor, i)=>{
  let opcao = document.createElement('span')
      opcao.classList.add('opcao')
      opcao.style.setProperty('background-color', cor)
      cor === '#000000' ? (opcao.classList.add('selecionada')) : null
      paleta.appendChild(opcao)
   })
   // Retorna os blocos
   return paleta.querySelectorAll('span')
 }
 
 // Remove as classes de um grupo de elementos
 function removerClasses(grupo, classe){
    grupo = Array.from(grupo)
    grupo.forEach(( item )=>{
       item.classList.remove(classe)
    })
 }
 
   let blocos = criarBlocos(cores)
       blocos.forEach((bloco)=>{
           bloco.on('click', ()=>{
               removerClasses(blocos, 'selecionada')
               bloco.classList.add('selecionada')
               let cor  = getComputedStyle(bloco).getPropertyValue('background-color')
                qrCodeConfigs.colorDark = cor
           })
       })
}

gerarPaletaDeCores()


// Faz o upload da imagem

let imagemPreview  = $('#imagem-preview')
let inputFile      = $('input[type*=file]')
let btnRemoverLogo = $('.bx-x')

    inputFile.on('change', ()=> uploadImagem())
    inputFile.on('click',  ()=> navigator.vibrate([50, 70]))

// Faz o upload da imagem 
 function uploadImagem(){
  let file = inputFile.files[0]
  
  // Verifica se o arquivo selecionado é uma imagem e executa o algoritmo
  
  if( String(file.type).startsWith('image/')){
   
     const FILE_READER = new FileReader()
     
           FILE_READER.onload = function(e){
             const SRC = e.target.result
                   imagemPreview.src = SRC
                   imagemPreview.style.setProperty('display','block')
                   btnRemoverLogo.style.setProperty('display', 'inline-block')
                   qrCodeConfigs.logo = SRC
           }
           
           FILE_READER.readAsDataURL(file)
  }
 }
 
  
btnRemoverLogo.onclick = function(e){
  e.preventDefault()
  removerImagemSelecionada()
}

// Remove a imagem selecionada 
function removerImagemSelecionada(){
   inputFile.files[0] = undefined
   imagemPreview.src = ''
   imagemPreview.style.setProperty('display','none')
   btnRemoverLogo.style.setProperty('display', 'none')
   qrCodeConfigs.logo = ''
}


// Chama a biblioteca ScrollReveal e define os parâmetros

const $scrollReveal = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1200,
    delay: 150,
    interval: 1200,
    reset: true,
});


let telaDeAbertura = document.querySelector('.abertura')
    telaDeAbertura.on('animationend', ()=>{
           telaDeAbertura.remove()
                     
          $scrollReveal.reveal('.apresentacao span,.label-file')
          $scrollReveal.reveal('.caixa-de-texto, .paleta, #btn-submit, footer *',{
             distance: '25px'
          })
          $scrollReveal.reveal('.flexbox button, .ilustracao, h4, .personalizacao',{
            origin: 'bottom'
          })
    })
    
 $('#btn-scroll').on('click', ()=> rolarPagina())
 
 function rolarPagina(){
    const elm = $('.personalizacao')
      let y   = elm.offsetTop - 100
      
    window.scroll(0, y)
 }