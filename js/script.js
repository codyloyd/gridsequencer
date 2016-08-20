$(document).ready(function () {
  $('button').click(function () {
    loopSeq()
  })
})

var seq = [0, 2, 9, 4, 7, 12]
var count = 0
function seqCount (seq) {
  var note = seq[count % seq.length]
  count += 1
  return note
}

function loopSeq () {
  saw.play({
    pitch: mtof(seqCount(seq) + 72)
  })
  setTimeout(function () { startSeq() }, 300)
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
