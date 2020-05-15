    
    call();
    Answerer();

var getUserMedia = (function () {
    if(navigator.getUserMedia) {
        return navigator.getUserMedia.bind(navigator)
    }
    if(navigator.webkitGetUserMedia) {
      return navigator.webkitGetUserMedia.bind(navigator)
    }
    if(navigator.mozGetUserMedia) {
      return navigator.mozGetUserMedia.bind(navigator)
    }
  })();

  function onReceiveStream(stream){
    var audio = document.querySelector('audio');
    audio.srcObject = stream;
    audio.onloadedmetadata = function(e){
        console.log('now playing the audio');
        audio.play();
    }
  }

function call(){
var callBtn =  document.getElementById('call-btn');

    callBtn.addEventListener('click',function(){
       var PersonToCall =  document.getElementById('callings').value;
       console.log("Estamos llamando" + PersonToCall);
       var peer = new Peer();
        getUserMedia({video: false, audio: true}, function(stream) {
            var call = peer.call(PersonToCall, stream);
            call.on('stream', function(remoteStream) {
                onReceiveStream(remoteStream);
        });
        }, function(err) {
        console.log('Failed to get local stream' ,err);
        });
    });

}

function Answerer(){
    var Contestar = document.getElementById('Answer');

    Contestar.addEventListener('click',function(){
        var peer = new Peer();
        peer.on('open', (id) =>{
            document.getElementById('peerid').innerHTML = "<b>Este es tu código: </b>" + id;
        });

        peer.on('call', function(call) {
        getUserMedia({video:false,audio: true}, function(stream) {
            call.answer(stream); // Answer the call with an A/V stream.
            call.on('stream', function(remoteStream) {
                onReceiveStream(remoteStream);
            });
        }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    });

    });
}

// function CallRules(){
//     var InputCodeToCall = document.getElementById("callings");
//     var CallBtn = document.getElementById("call-btn");
 
  
//             if(InputCodeToCall!= null){
//                 if(InputCodeToCall.value != ""){
//                     CallBtn.removeAttribute("disabled");
//                 }
//             }
     
// }











