var seq
var scale = [0, 2, 4, 7, 9, 12, 14, 16, 19, 24, 26, 28, 31, 36, 38, 40]
$(document).ready(function () {
  loadDemoSong()
  renderGrid(grid)
  seq = makeSeq(grid)
  $('#play').click(function () {
    // loopSeq(seq)
    Tone.Transport.bpm.value = 86
    loop.start()
    Tone.Transport.start()
  })
  $('#stop').click(function () {
    Tone.Transport.stop()
  })
})

$(document).on('contextmenu', '.block', function (e) {
  return false
})

function loadDemoSong () {
  grid[0][0] = 'x'
  grid[4][2] = 'x'
  grid[7][1] = 'x'
  grid[8][0] = 'x'
  grid[9][1] = 'x'
  grid[10][3] = 'x'
  grid[13][2] = 'x'
  grid[0][6] = 'o'
  grid[0][9] = 'o'
}

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
    setTimeout(function(){
      renderGrid(grid)
      seq = makeSeq(grid)
    },0)
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
        step.push(j + 1000)
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

var loop = new Tone.Loop(function(time){
    playStep(seqCount(seq))
}, "16n");


function playStep (step) {
  if (step.length > 0) {
    for (var i = 0; i < step.length; i++) {
      if (step[i] < 1000) {
        var p = mtof(scale[step[i]]+52)
      } else {
        var p = mtof(scale[step[i - 1000] + Math.floor(Math.random() * 6 - 3)]  + 52)
      }
      synth.triggerAttackRelease(p,"16n")
    }
  }
}

var synth = new Tone.PolySynth(10, Tone.SimpleSynth, {
  "oscillator" : {
    type: "triangle"
  },
  "envelope": {
    "attack":0.03,
    "decay":0.4,
    "sustain":.2,
    "release":6
  },
  "volume" : -6
}).toMaster();

function mtof (m) {
  return Math.pow(2, (m - 69) / 12) * 440
}
