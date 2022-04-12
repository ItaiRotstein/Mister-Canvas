'use strict'

let gElCanvas
let gCtx
let gCurrShape = 'squares'
let gColor = '#000000'
let gIsClicked = false
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function init() {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')

    gElCanvas.width = document.body.offsetWidth - 100

    addListeners()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', resizeCanvas)
}


function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)

}

function onDown(ev) {
    const pos = getEvPos(ev)
    gIsClicked = true
    draw(pos.x, pos.y)

}

function onMove(ev) {
    if (!gIsClicked) return

    const pos = getEvPos(ev)
    draw(pos.x, pos.y)
}

function onUp(ev) {
    gIsClicked = false

}

function drawSquares(x, y) {
    gCtx.rect(x, y, 50, 50)
    // gCtx.fillStyle = gColor
    // gCtx.fillRect(x, y, 50, 50)
    gCtx.strokeStyle = gColor
    gCtx.stroke()
}

function drawCircles(x, y, size = 60) {
    gCtx.beginPath()
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.strokeStyle = gColor
    gCtx.stroke()
}

function drawTriangles(x, y, length = 50) {
    gCtx.moveTo(x, y)
    gCtx.lineTo(x + length, y + length)
    gCtx.lineTo(x - length, y + length)
    gCtx.lineTo(x, y)
    gCtx.strokeStyle = gColor
    gCtx.stroke()
}


function onSetShape(value) {
    gCurrShape = value
}

function resizeCanvas() {
    gElCanvas.width = document.body.offsetWidth - 100
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function draw(x, y) {

    switch (gCurrShape) {
        case 'squares':
            drawSquares(x, y)
            break
        case 'circles':
            drawCircles(x, y)
            break
        case 'triangles':
            drawTriangles(x, y)
            break
    }
}

function onSetColor(color) {
    gColor = color
}