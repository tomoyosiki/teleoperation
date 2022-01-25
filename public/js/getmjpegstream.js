'use strict';

function handleSuccess(stream) {
    const image = document.querySelector('img');
    console.log(image)
    //const videoTracks = stream.getVideoTracks();
    //console.log('Got stream with constraints:', constraints);
    //console.log(`Using video device: ${videoTracks[0].label}`);
    //window.stream = stream; // make variable available to browser console
    image.src = stream;
  }

async function init(e) {
    handleSuccess("http://35.16.126.98:8080/stream?topic=/camera&quality=10");
    e.target.disabled = true;
    // try {
    //   let request = new XMLHttpRequest();
    //   request.open("GET", api);
    //   request.send();
    //   request.onload = () =>{
    //       console.log(request);
    //       if (request.status == 200){
    //           console.log(JSON.parse(request.response))
    //       }else{
    //           console.log('error');
    //       }
    //   }
    // } catch (e) {
    //   handleError(e);
    // }
  }
  
  document.querySelector('#showVideo').addEventListener('click', e => init(e));