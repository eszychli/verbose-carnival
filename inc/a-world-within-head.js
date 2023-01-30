num_of_filters=100

function hasGetUserMedia() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

if (hasGetUserMedia()) {
  // Good to go!
} else {
  alert('Camera access is not supported by your browser');
//  document.querySelector("#maindiv").style.display= "none"
//  document.querySelector("#errdiv").style.display= "block"
}


function set_vis(div_id) {

    for (i=1;i<=num_of_filters;i++) {
        try{
            if (div_id==i) {
               set_btns(-1);
               document.querySelector("#step"+i).style.display= "block"
            } else {
               document.querySelector("#step"+i).style.display = "none"
            }
        }catch(error) {}
    }
}

function set_btn(btn,selected) {
    if (selected) {
        btn.style.backgroundColor = 'white';
        btn.style.color = 'black';
    } else {
        btn.style.backgroundColor = 'black';
        btn.style.color = 'white';
     }
}

function set_btns(active_id) {
    try{
        //set_btn(document.querySelector("#screenshot-button"),false);
        //set_btn(document.querySelector("#camerabtn"),false);
        if (active_id>=0) {
            document.querySelector("#step2btns").style.display= "block"
            document.querySelector("#step2loading").style.display= "none"
            for (i=0;i<=num_of_filters;i++) {
                try {
                    btn = document.querySelector("#filter"+i+"btn");
                    //set_btn(btn,i==active_id);
                }catch(error) {}
            }
        } else {
            document.querySelector("#step2btns").style.display= "none"
            document.querySelector("#step2loading").style.display= "block"
        }
    }catch(error) {}
}

function pxl(id,comment="XXX") {
      if (id>0) { // (id>last_pixel) {
          executeAsync(function() {
              var ajax = new XMLHttpRequest();
              ajax.open("POST", "pxl", true);
              ajax.onreadystatechange = function() {
                if(ajax.readyState === XMLHttpRequest.DONE) {
                    last_pixel = id;
                    // alert("pixel sent: "+id);
                }
              }
              ajax.setRequestHeader("Content-Type", "application/upload");
              ajax.send("?id="+id+"&r="+comment+"&a=1");
          },0);
      }
}