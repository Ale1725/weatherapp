console.log("dada")

const $tabContainer = document.querySelector('#tabs');

const $tabList = $tabContainer.querySelectorAll('.tab')

const today = new Date()
let weekday = today.getDay()

const week = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sábado'

]


//debugger

function nextDay(day) {
  if(day === 6){
    return 0
  }
  return day + 1
}

$tabList.forEach(( $tab, index) => {

  $tab.addEventListener('click' , handleSelectTabClick)

  if(index === 0){
    $tab.textContent = "Hoy"
    weekday = nextDay(weekday)
    return false
  }

  $tab.textContent = week[weekday]
  weekday = nextDay(weekday)
})

// Convension propia para manejar click (handleSelectTabClick)
function handleSelectTabClick(event) {

  //Selección general
  const $tabSelected = event.target

  // Selección de aria-selected para que sea dinámico
  const $tabActive = document.querySelector('.tab[aria-selected="true"]')
  $tabActive.removeAttribute('aria-selected')
  $tabSelected.setAttribute('aria-selected', true)

  //Selección de id y aria-labelledby
  const id = $tabSelected.id

  // QuerySelector del id
  const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`)
  const $tabPanelSelected = document.querySelector(`.tabPanel:not([hidden])`)
  $tabPanel.hidden = false
  $tabPanelSelected.hidden = true


  //debugger
}




