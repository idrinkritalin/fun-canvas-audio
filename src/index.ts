import * as Urpflanze from 'urpflanze'

const FFT_SIZE = 1024
const audioContext = new AudioContext()
let spectrum = null
let peakVolume = 0
let volume = 0

const getRMS = (spectrum: any) => {
  let rms = 0
  for (let i = 0; i < spectrum.length; i++) {
    rms += spectrum[i] * spectrum[i]
  }
  rms /= spectrum.length
  rms = Math.sqrt(rms)

  return rms
}

const processSound = (stream: any) => {
  const analyser = audioContext.createAnalyser()
  analyser.smoothingTimeConstant = 0.2
  analyser.fftSize = FFT_SIZE
  const node = audioContext.createScriptProcessor(FFT_SIZE * 2, 1, 1)

  node.onaudioprocess = function () {
    spectrum = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(spectrum)
    const vol = getRMS(spectrum)
    if (vol > peakVolume) peakVolume = vol
    volume = vol
  }

  const input = audioContext.createMediaStreamSource(stream)
  input.connect(analyser)
  analyser.connect(node)
  node.connect(audioContext.destination)
}

const getMic = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    processSound(stream)
  } catch (err) {
    console.error(err)
  }
}

window.addEventListener('resize', () => {
  const { innerWidth, innerHeight } = window
  drawer.resize(innerWidth, innerHeight, innerWidth / innerHeight)
  drawer.startAnimation()
})

const scene = new Urpflanze.Scene({
  width: window.innerWidth,
  height: window.innerHeight
})

const rect = new Urpflanze.Rect({
  repetitions: [1, FFT_SIZE / 2],
  sideLength: 1,
  translate: ({ repetition }) => {
    let x = 0
    let y = 0

    y = -spectrum[repetition.col.index - 1] * 2
    x = -scene.width * 0.4 + repetition.col.offset * scene.width * 0.8

    return [x, y]
  },
  style: {
    fill: () => `rgba(255, 255, 255, ${volume * 0.05}`
  }
})

scene.add(
  new Urpflanze.Shape({
    shape: rect,
    repetitions: 20,
    distance: 160,
    scale: 0.2,
    rotateZ: Math.PI
  })
)

const drawer = new Urpflanze.DrawerCanvas(scene, document.body)

getMic()
drawer.startAnimation()
