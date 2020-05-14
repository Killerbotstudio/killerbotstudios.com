<script>
function myMove() {
  var elem = document.getElementById("myAnimation");
  var pos = 0;
  var id = setInterval(frame, 10);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}



var i = 0;
var images = [];
var time = 3;

images[0] = "webassets/bots3Dw.png";
images[1] = "webassets/bots.jpg";
images[2] = "webassets/bs1.jpg";
images[3] = "webassets/bs2.jpg";

function changeImg(){

  document.slide.src = images[i];
  if(i<images.length -1 ){
    i++;
  }else {
    i=0;
  }
}

</script>
