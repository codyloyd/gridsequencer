var seq2
$(document).ready(function () {
  grid[0][0] = 'x'
  grid[0][4] = 'x'
  grid[4][7] = 'x'
  renderGrid(grid)
  seq2 = makeSeq(grid)
  $('button').click(function () {
    loopSeq(seq2)
  })

})

function blockListener () {
  $('.block').click(function () {
    grid[$(this).attr("x")][$(this).attr("y")] = "x"
    renderGrid(grid)
    seq2 = makeSeq(grid)
    console.log(seq2)
  })
}

var grid = generateGrid(16)
function generateGrid (x) {
  var grid = []
  for (var i = 0; i < x; i++)   {
    grid.push(function generateRow () {
      var array = []
      for (var ii = 0; ii < x; ii++) {
        array.push(" ")
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
      $('#column' + i + '').append('<div class="block" x=' + i + ' y=' + j + '>' + grid[i][j] + '</div>')
    }
  }
  blockListener()
}

function makeSeq (grid) {
  var seq = []
  for (var i = 0; i < grid.length; i++) {
    var step = []
    for (var j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== " ") {
        step.push(j)
      }
    }
    seq.push(step)
  }
  return seq
}

var seq7 = [[0,14], [2], [], [4], [7], [12], [0,9], [2], [], [4], [7], [12]]
var count = 0

function seqCount (seq) {
  var note = seq[count % seq.length]
  count += 1
  return note
}

function loopSeq (seq) {
  playStep(seqCount(seq2))
  setTimeout(function () { loopSeq(seq2) }, 200)
}

function playStep (step) {
  if (step.length > 0 ) {
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
