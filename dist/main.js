/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
eval("/* eslint-disable @typescript-eslint/ban-ts-comment */\n/* eslint-disable @typescript-eslint/no-unused-vars */\n/* eslint-disable @typescript-eslint/no-explicit-any */\nvar width = document.body.clientWidth;\nvar height = document.body.clientHeight;\nvar pointSize = 1;\nvar mouseX = 0;\nvar mouseY = 0;\nvar prevMouseX = 0;\nvar prevMouseY = 0;\nvar volume;\nvar oscillator;\nvar bPaint = false;\nvar bOscStared = false;\nvar canvas = document.createElement('canvas');\ncanvas.width = width;\ncanvas.height = height;\ncanvas.style.width = width + 'px';\ncanvas.style.height = height + 'px';\ndocument.body.appendChild(canvas);\nvar context = canvas.getContext('2d');\ncontext.fillStyle = '#000';\ncontext.fillRect(0, 0, canvas.width, canvas.height);\ncanvas.addEventListener('mousedown', function (e) {\n    bPaint = true;\n    if (!bOscStared) {\n        oscillator.start();\n        bOscStared = true;\n    }\n    volume.gain.value = 1;\n});\ncanvas.addEventListener('mouseup', function (e) {\n    bPaint = false;\n    volume.gain.value = 0;\n});\ncanvas.addEventListener('mousemove', function (e) {\n    requestAnimationFrame(function () {\n        mouseX = e.clientX;\n        mouseY = e.clientY;\n        paint();\n        prevMouseX = mouseX;\n        prevMouseY = mouseY;\n    });\n});\nvar initAudio = function () {\n    // @ts-ignore\n    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();\n    volume = audioCtx.createGain();\n    volume.connect(audioCtx.destination);\n    oscillator = audioCtx.createOscillator();\n    oscillator.type = 'sine';\n    oscillator.connect(volume);\n};\nvar paint = function () {\n    if (bPaint) {\n        volume.gain.value = mouseY / canvas.height;\n        oscillator.frequency.value = (mouseX / canvas.width) * 880;\n        var hue = (mouseX / canvas.width) * 360;\n        var lum = (mouseY / canvas.height) * 100;\n        var time = Date.now();\n        context.fillStyle = \"hsl(\" + hue + \", 100%, \" + lum + \"%)\";\n        var finalSize = pointSize + (0.5 * Math.sin(time / 300) + 0.5) * 20;\n        context.shadowBlur = 100;\n        context.shadowColor = \"hsl(\" + (time / 10) % 360 + \", 100%, 50%)\";\n        /* // TODO: disegnare frame tra cord mouse precedenti a correnti\n        const angle = Math.atan2(mouseY - prevMouseY, mouseX - prevMouseX)\n        const x = Math.cos(angle)\n        const y = Math.sin(angle)\n        for (let i = 0, len = Math.abs(Math.hypot(mouseX, mouseY) - Math.hypot(prevMouseX, prevMouseY)); i < len; i ++) {\n          context.fillRect(prevMouseX + i * x, prevMouseY + i * y, pointSize, pointSize)\n        } */\n        context.fillRect(mouseX - finalSize, mouseY - finalSize, finalSize, finalSize);\n    }\n};\ninitAudio();\n\n\n//# sourceURL=webpack://fun-canvas-audio/./src/index.ts?");
/******/ })()
;