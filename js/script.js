var seq
$(document).ready(function () {
  grid[0][0] = 'x'
  renderGrid(grid)
  seq = makeSeq(grid)
  $('button').click(function () {
    loopSeq(seq)
  })
})

function blockListener () {
  $('.block').click(function () {
    grid[$(this).attr('x')][$(this).attr('y')] = 'x'
    renderGrid(grid)
    seq = makeSeq(grid)
  })
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
      $('#column' + i + '').append('<div class="block ' + grid[i][j] + '" x=' + i + ' y=' + j + '>' + grid[i][j] + '</div>')
    }
  }
  blockListener()
}

function makeSeq (grid) {
  var seq = []
  for (var i = 0; i < grid.length; i++) {
    var step = []
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== ' ') {
        step.push(j)
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
      var p = mtof(step[i] + 72)
      saw.play({
        pitch: p
      })
    }
  }
}

var saw = new Wad({
  source: 'triangle',
  volume: 0.5,
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
