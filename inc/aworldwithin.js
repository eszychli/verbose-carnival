const constraints = {
    video: true
  };
  
  var images = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
  var last_filter=0;
  var send_snap=1;

    const video = document.querySelector('video');
    //const screenshotButton = document.querySelector('#screenshot-button');
    const img = document.querySelector('#screenshot-img');
    const desc_text = document.querySelector('#desc_text');
  
    const canvas = document.createElement('canvas');


    function openCam2(){
        video.muted=true;
        video.play();
      
        navigator.mediaDevices.getUserMedia(constraints).
            then((stream) => {video.srcObject = stream});
    }  
  
  screenshotButton.onclick = video.onclick = function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    //canvas.getContext('2d').drawImage(video, 0, 0);
    canvasContext = canvas.getContext('2d');
    canvasContext.translate(canvas.width , 0);
    canvasContext.scale(-1, 1);
    canvasContext.drawImage(video, 0, 0);
  
    // Other browsers will fall back to image/png
    images = [canvas.toDataURL('image/webp'),null,null,null,null]
    img.src = images[0];
    send_snap=1
    setFilter(0,0);
    last_filter=0;
    pxl(2);
  };
  
  function setFilter(btnId,filterId,bg_mask) {
    if (filterId==-1) {
      set_vis(1);
      desc_text.innerHTML ="";
    } else {
        set_vis(2);
        if (images[filterId]!=null) {
          img.src = images[filterId];
          set_btns(btnId);
          set_desc_text(filterId);
        } else {
            set_btns(-1);
            var canvasData = images[0]; //canvas.toDataURL("image/png");
            img.src = images[last_filter];
              //alert("test : "+canvas.width +"/"+canvas.height);
  
            executeAsync(function() {
                var ajax = new XMLHttpRequest();
                ajax.open("POST", "web_snapshot", true);
                ajax.timeout=30000;
                ajax.onreadystatechange = function() {
                  if(ajax.readyState === XMLHttpRequest.DONE) {
                      set_btns(btnId);
                      console.log(ajax.responseText);
                      img.src = images[filterId] = ajax.responseText;
                      last_filter = filterId;
                      //alert('post finished:'+ajax.responseText)
                      set_desc_text(filterId);
                  }
                }
                ajax.setRequestHeader("Content-Type", "application/upload");
                ajax.send("?first="+send_snap+"&filter_id="+filterId+"&bg_mask="+bg_mask+"&img="+canvasData);
                send_snap=0;
  
            },0);
            pxl(3,filterId);
        }
    }
  }
  
  function set_desc_text(filterId) {
        var ajax2 = new XMLHttpRequest();
        ajax2.open("POST", "web_desc_text", true);
        ajax2.timeout=30000;
        ajax2.onreadystatechange = function() {
          if(ajax2.readyState === XMLHttpRequest.DONE) {
              //alert("desc: "+ajax2.responseText);
              desc_text.innerHTML =ajax2.responseText;
          }
        }
        ajax2.send("?filter_id="+filterId+"&ignore=0");
  }
  
  function executeAsync(func,milli) {
      setTimeout(func, milli);
  }
  function handleSuccess(stream) {
    screenshotButton.disabled = false;
    video.srcObject = stream;
  }
  
  set_vis(1);
  
  last_pixel = 0 ;
  pxl(1);
  