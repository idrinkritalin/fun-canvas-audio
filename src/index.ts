/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const width = document.body.clientWidth
const height = document.body.clientHeight
const pointSize = 1
let mouseX = 0
let mouseY = 0
let prevMouseX = 0
let prevMouseY = 0
let volume: any
let oscillator: any
let bPaint = false
let bOscStared = false

const canvas = document.createElement('canvas')
canvas.width = width
canvas.height = height
canvas.style.width = width + 'px'
canvas.style.height = height + 'px'
document.body.appendChild(canvas)

const context = canvas.getContext('2d')
context.fillStyle = '#000'
context.fillRect(0, 0, canvas.width, canvas.height)

canvas.addEventListener('mousedown', e => {
  bPaint = true
  if (!bOscStared) {
    oscillator.start()
    bOscStared = true
  }
  volume.gain.value = 1
})

canvas.addEventListener('mouseup', e => {
  bPaint = false
  volume.gain.value = 0
})

canvas.addEventListener('mousemove', e => {
  requestAnimationFrame(() => {
    mouseX = e.clientX
    mouseY = e.clientY
    paint()
    prevMouseX = mouseX
    prevMouseY = mouseY
  })
})
const initAudio = () => {
  // @ts-ignore
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  volume = audioCtx.createGain()
  volume.connect(audioCtx.destination)

  oscillator = audioCtx.createOscillator()
  oscillator.type = 'sine'
  oscillator.connect(volume)
}

const paint = () => {
  if (bPaint) {
    volume.gain.value = mouseY / canvas.height
    oscillator.frequency.value = (mouseX / canvas.width) * 880
    const hue = (mouseX / canvas.width) * 360
    const lum = (mouseY / canvas.height) * 100
    const time = Date.now()
    context.fillStyle = `hsl(${hue}, 100%, ${lum}%)`

    const finalSize = pointSize + (0.5 * Math.sin(time / 300) + 0.5) * 20
    context.shadowBlur = 100
    context.shadowColor = `hsl(${(time / 10) % 360}, 100%, 50%)`

    /* // TODO: disegnare frame tra cord mouse precedenti a correnti
    const angle = Math.atan2(mouseY - prevMouseY, mouseX - prevMouseX)
    const x = Math.cos(angle)
    const y = Math.sin(angle)
    for (let i = 0, len = Math.abs(Math.hypot(mouseX, mouseY) - Math.hypot(prevMouseX, prevMouseY)); i < len; i ++) {
      context.fillRect(prevMouseX + i * x, prevMouseY + i * y, pointSize, pointSize)
    } */

    context.fillRect(mouseX - finalSize, mouseY - finalSize, finalSize, finalSize)
  }
}

initAudio()
