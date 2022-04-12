'use strict'

let gElCanvas
let gCtx
let gCurrShape = 'squares'
let gStrokeColor = '#000000'
let gFillColor = '#FFFFFF'
let gLineWidth = 1
let gLength = 10
let gIsClicked = false
let gIsFill = true
let gStartPos
let gPencil = { x: 0, y: 0 }
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
    gStartPos = pos
    draw(pos.x, pos.y)

}

function onMove(ev) {
    if (!gIsClicked) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    movePencil(dx, dy)
    gStartPos = pos

    draw(pos.x, pos.y)
}

function onUp() {
    gIsClicked = false
    gPencil = { x: 0, y: 0 }

}
function drawLines(x, y) {
    gCtx.lineWidth = gLineWidth
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(x + gPencil.x, y + gPencil.y)
    gCtx.lineTo(x - gPencil.x, y - gPencil.y)
    gCtx.lineTo(x, y)
    gCtx.strokeStyle = gStrokeColor
    gCtx.stroke()
    gCtx.fillStyle = gFillColor
    if (gIsFill) gCtx.fill()
    gCtx.closePath()
}

function drawSquares(x, y) {
    gCtx.lineWidth = gLineWidth
    gCtx.beginPath()
    gCtx.rect(x, y, gLength, gLength)
    gCtx.strokeStyle = gStrokeColor
    gCtx.stroke()
    gCtx.fillStyle = gFillColor
    if (gIsFill) gCtx.fill()
    gCtx.closePath()
}

function drawCircles(x, y) {
    gCtx.lineWidth = gLineWidth
    gCtx.beginPath()
    gCtx.arc(x, y, gLength, 0, 2 * Math.PI)
    gCtx.strokeStyle = gStrokeColor
    gCtx.stroke()
    gCtx.fillStyle = gFillColor
    if (gIsFill) gCtx.fill()
    gCtx.closePath()
}

function drawTriangles(x, y) {
    gCtx.lineWidth = gLineWidth
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(x + gLength/2, y + gLength/2)
    gCtx.lineTo(x + gLength/2, y - gLength/2)
    gCtx.lineTo(x, y)
    gCtx.strokeStyle = gStrokeColor
    gCtx.stroke()
    gCtx.fillStyle = gFillColor
    if (gIsFill) gCtx.fill()
    gCtx.closePath()
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
        case 'lines':
            drawLines(x, y)
            break
    }
}

function onSetLineWidth(width) {
    gLineWidth = width
}

function onSetLineLength(length) {
    gLength = length
}

function onSetStrokeColor(color) {
    gStrokeColor = color
}

function onSetFillColor(color) {
    gFillColor = color
}


function movePencil(dx, dy) {
    gPencil.x += dx
    gPencil.y += dy
}

function onSetIsFill() {
    if (!gIsFill) gIsFill = true
    else gIsFill = false
    console.log(gIsFill);
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}
