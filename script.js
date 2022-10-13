const DEFAULT_COLOR = '#ff0000'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 24

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
  currentColor = newColor
}

function setCurrentMode(newMode) {
  activateButton(newMode)
  currentMode = newMode
}

function setCurrentSize(newSize) {
  currentSize = newSize
}

const colorChoose = document.getElementById('colorChoose')
const colorButton = document.getElementById('colorButton')
const rainbowButton = document.getElementById('rainbowButton')
const eraseButton = document.getElementById('eraseButton')
const clearAllButton = document.getElementById('clearAllButton')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')
const grid = document.getElementById('grid')

colorChoose.oninput = (e) => setCurrentColor(e.target.value)
colorButton.onclick = () => setCurrentMode('color')
rainbowButton.onclick = () => setCurrentMode('rainbowColors')
eraseButton.onclick = () => setCurrentMode('eraser')
clearAllButton.onclick = () => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => changeSize(e.target.value)

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeSize(value) {
  setCurrentSize(value)
  updateSizeValue(value)
  reloadGrid()
}

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`
}

function reloadGrid() {
  clearGrid()
  setupGrid(currentSize)
}

function clearGrid() {
  grid.innerHTML = ''
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div')
    gridElement.classList.add('grid-element')
    gridElement.addEventListener('mouseover', colorChange)
    gridElement.addEventListener('mousedown', colorChange)
    grid.appendChild(gridElement)
  }
}

function colorChange(e) {
  if (e.type === 'mouseover' && !mouseDown) return
  if (currentMode === 'rainbowColors') {
    const randomRed = Math.floor(Math.random() * 256)
    const randomGreen = Math.floor(Math.random() * 256)
    const randomBlue = Math.floor(Math.random() * 256)
    e.target.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#D3D3D3'
  }
}

function activateButton(newMode) {
  if (currentMode === 'rainbowColors') {
    rainbowButton.classList.remove('active')
  } else if (currentMode === 'color') {
    colorButton.classList.remove('active')
  } else if (currentMode === 'eraser') {
    eraseButton.classList.remove('active')
  }

  if (newMode === 'rainbowColors') {
    rainbowButton.classList.add('active')
  } else if (newMode === 'color') {
    colorButton.classList.add('active')
  } else if (newMode === 'eraser') {
    eraseButton.classList.add('active')
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
}
