// ROTATIONS handleMarquee

console.log('hellow from ui');
var box = document.querySelector('.box');
var radioGroup = document.querySelector('.radio-group');
var currentClass = '';

function changeSide() {
    var checkedRadio = radioGroup.querySelector(':checked');
    var showClass = 'show-' + checkedRadio.value;
    if (currentClass) {
        box.classList.remove(currentClass);
    }
    box.classList.add(showClass);
    currentClass = showClass;
}
// set initial side
changeSide();

radioGroup.addEventListener('change', changeSide);



// END OF ROTAITONS




// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}

var mybtn = document.getElementsByClassName("testbtn")[0];
mybtn.click();

// Accordions
function myAccFunc(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Slideshows
var slideIndex = 1;

function plusDivs(n) {
    slideIndex = slideIndex + n;
    showDivs(slideIndex);
}

function showDivs(n) {
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    };
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}

showDivs(1);

// Progress Bars
function move() {
    var elem = document.getElementById("myBar");
    var width = 5;
    var id = setInterval(frame, 10);

    function frame() {
        if (width == 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function toggle_cases_summary(toggle) {
    if (toggle == 0) {
        document.getElementById('case_off').style.display = "block";
        document.getElementById('head2').style.display = "none";
    } else {
        document.getElementById('case_off').style.display = "none";
        document.getElementById('head2').style.display = "block";

    }
    console.log("COMAND")
}


function handleMarquee() {
    const marquee = document.querySelectorAll('.marquee');
    let speed = 4;
    let lastScrollPos = 0;
    let timer;
    marquee.forEach(function(el) {
        const container = el.querySelector('.inner');
        const content = el.querySelector('.inner > *');
        //Get total width
        const elWidth = content.offsetWidth;
        //Duplicate content
        let clone = content.cloneNode(true);
        container.appendChild(clone);
        let progress = 1;

        function loop() {
            progress = progress - speed;
            if (progress <= elWidth * -1) {
                progress = 0;
            }
            container.style.transform = 'translateX(' + progress + 'px)';
            container.style.transform += 'skewX(' + speed * 0.4 + 'deg)';
            window.requestAnimationFrame(loop);
        }
        loop();
    });
    window.addEventListener('scroll', function() {
        const maxScrollValue = 12;
        const newScrollPos = window.scrollY;
        let scrollValue = newScrollPos - lastScrollPos;
        if (scrollValue > maxScrollValue) scrollValue = maxScrollValue;
        else if (scrollValue < -maxScrollValue) scrollValue = -maxScrollValue;
        speed = scrollValue;
        clearTimeout(timer);
        timer = setTimeout(handleSpeedClear, 10);
    });

    function handleSpeedClear() {
        speed = 4;
    }
};
handleMarquee();


var timer;

function setTimer() {
    timer = setTimeout(showPage, 333);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

var openTab = document.getElementById("firstTab");
openTab.click();

var openInbox = document.getElementById("myBtn");
openInbox.click();
openMail("Borge")

function openMail(personName) {
    var i;
    var x = document.getElementsByClassName("person");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x = document.getElementsByClassName("test");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" w3-light-grey", "");
    }
    document.getElementById(personName).style.display = "block";
    event.currentTarget.className += " w3-light-grey";
}