const defaultConfig = {
  open: true,
  debug: true,
  animatable: true,
}


export default function draggable($element, config = defaultConfig) {
  if(!($element instanceof HTMLElement)){
    return console.warn(`Elemento invalido se esperaba un HTMLElement y se recibió ${$element}`)
  }
  //debugger
  
  /*start Declaraciones de variable */
  let isOpen = config.open
  let isDragging = false
  const elementRect = $element.getBoundingClientRect()
  const ELEMENT_BLOCK_SIZE = elementRect.height
  const $marker = $element.querySelector('[data-marker]')
  const MARKET_BLOCK_SIZE = $marker.getBoundingClientRect().height


  const VISIBLE_Y_POSITION = 0
  const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKET_BLOCK_SIZE
  let widgetPosition = VISIBLE_Y_POSITION
  

  let startY = 0
  $marker.addEventListener('click', handleClick)
  $marker.addEventListener('pointerdown', handPointerDown)
  $marker.addEventListener('pointerup', handPointerUp)
  $marker.addEventListener('pointerout', handPointerOut)
  $marker.addEventListener('pointercancel', handPointerCancel)
  $marker.addEventListener('pointermove', handPointerMove)

  if(config.animatable){
    setAnimations()
  }

  function handPointerUp() {
    logger('Pointer UP')
    dragEnd()
  }
  function handPointerOut() {
    logger('Pointer OUT')
    dragEnd()
  }
  function handPointerCancel() {
    logger('Pointer Cancel')
    dragEnd()
  }
  function handPointerDown(event) {
    logger('Pointer Down')
    startDrag(event)
  }
  function handPointerMove(event) {
    logger('Pointer MOVE')
    drag(event)
  }

  function pageY(event) {
    return event.pageY || event.touches[0].pageY
  }

  function handleClick(event) {
    logger('CLICK')
    toggle()
  }

  function startDrag(event) {
    isDragging = true
    startY = pageY(event)
    //debugger
    //logger({y})
  }

  function setAnimations() {
    $element.style.transition = 'margin-bottom .3s'
  }

  function bounce() {
    if(widgetPosition < ELEMENT_BLOCK_SIZE / 2 ){
      return open()
    }
      return close()
  }

  function dragEnd() {
    logger('DRAG END')
    isDragging = false
    bounce()
  }

  function toggle() {
    if(!isDragging){
      if(!isOpen){
        return open()
      }
        return close()
    }
}


  /* end */

  isOpen ? open() : close()

  function logger(message) {
    if(config.debug){
      console.info(message)
    }
  }

  function open() {
    logger('Abrir Widget')
    isOpen = true
    widgetPosition = VISIBLE_Y_POSITION
    setWidgetPosition(widgetPosition)
  }

  function close() {
    logger('Cerrar Widget')
    isOpen = false
    widgetPosition = HIDDEN_Y_POSITION
    setWidgetPosition(widgetPosition)
  }

  function setWidgetPosition(value) {
    $element.style.marginBottom = `-${value}px`
  }
  //setWidgetPosition(50)

  function drag(event) {
    const cursorY = pageY(event)
    const movementY = cursorY - startY
    widgetPosition = widgetPosition + movementY
    //logger(movementY)
    startY = cursorY
    if(widgetPosition > HIDDEN_Y_POSITION ){
      return false
    }
    setWidgetPosition(widgetPosition)
  }
}

