$(document).ready(function() {
  var seq = [0, 2, 4, 7, 9, 12]
  var count = 0
  function seqCount(seq) {
    note = seq[count%seq.length]
    count += 1
    return note
  }

  $("button").click(function(){
    saw.play({
      pitch : mtof(seqCount(seq) + 72),
    })
  })
})



var saw = new Wad({
  source : 'triangle',
  volume : .5,
  env : {
    attack : 0.0,
    decay : .6,
    sustain : .2,
    hold : .1,
    release : 2
  },
})



function randPitch() {
  return Math.floor(Math.random() * 12)
}

function mtof(m) {
  return Math.pow(2,(m-69)/12) * 440
}
