var seq
var scale = [0, 2, 4, 7, 9, 12, 14, 16, 19, 24, 26, 28, 31, 36, 38, 40]
$(document).ready(function () {
  grid[0][0] = 'o'
  renderGrid(grid)
  seq = makeSeq(grid)
  $('button').click(function () {
    loopSeq(seq)
  })
})

$(document).on('contextmenu', '.block', function (e) {
  return false
})

function blockListener () {
  $('.block').mousedown(function (event) {
    switch (event.which) {
      case 1:
        toggle(this, 'x')
        break
      case 2:
        toggle(this, ' ')
        break
      case 3:
        toggle(this, 'o')
        break
      default:
        alert('You have a strange Mouse!')
    }
    renderGrid(grid)
    seq = makeSeq(grid)
  })
}

function toggle (block, marker) {
  if (grid[$(block).attr('x')][$(block).attr('y')] === marker) {
    grid[$(block).attr('x')][$(block).attr('y')] = ' '
  } else {
    grid[$(block).attr('x')][$(block).attr('y')] = marker
  }
}

var grid = generateGrid(16)
function generateGrid (x) {
  var grid = []
  for (var i = 0; i < x; i++) {
    grid.push(function generateRow () {
      var array = []
      for (var ii = 0; ii < x; ii++) {
        array.push(' ')
      }
      return array
    }())
  }
  return grid
}

function renderGrid (grid) {
  $('.container').empty()
  for (var i = 0; i < grid.length; i++) {
    $('.container').append('<div class="column "id="column' + i + '"></div>')
    for (var j = 0; j < grid[i].length; j++) {
      $('#column' + i + '').append('<div class="block ' + grid[i][j] + '" x=' + i + ' y=' + j + '></div>')
    }
  }
  blockListener()
}

function makeSeq (grid) {
  var seq = []
  for (var i = 0; i < grid.length; i++) {
    var step = []
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'x') {
        step.push(j)
      } else if (grid[i][j] === 'o') {
        step.push(j + 100)
      }
    }
    seq.push(step)
  }
  return seq
}

var count = 0
function seqCount (seq) {
  var note = seq[count % seq.length]
  count += 1
  return note
}

function loopSeq () {
  playStep(seqCount(seq))
  setTimeout(function () { loopSeq(seq) }, 200)
}

function playStep (step) {
  if (step.length > 0) {
    for (var i = 0; i < step.length; i++) {
      if (step[i] > 99) {
        var randomNumber = Math.floor((Math.random() * 6) - 3)
        var p = mtof(scale[step[i] - 100 + randomNumber] + 60)
      } else {
        var p = mtof(scale[step[i]] + 60)
      }
      saw.play({
        pitch: p
      })
    }
  }
}

var saw = new Wad({
  source: 'triangle',
  volume: 0.3,
  env: {
    attack: 0.0,
    decay: 0.6,
    sustain: 0.2,
    hold: 0.1,
    release: 2
  }
})

function mtof (m) {
  return Math.pow(2, (m - 69) / 12) * 440
}
