console.log('hello from arc');



function updateTextInput(val, id) {
    console.log('changin input');
    document.getElementById('textInput').value = val;
    var display = document.getElementById(id);
    console.log(display);
    var display_width = 10 * val / 5 + '%';
    var display_height = 10 * val / 50 + '%';
    display.style.width = display_width;
    display.style.height = display_height;
    var containers = display.getElementsByTagName('i-container');
    console.log(containers);
    // for (let i = 0; i < containers.length; i++) {
    //     console.log(containers[i]);
    //     // containers[i].style.width = "100px";
    //     console.log(i + ' ' + containers[i] + 'width' + containers[i].getBoundingClientRect.width);
    //     containers[i].getBoundingClientRect.width = val;
    // }
    console.log('this is the width:' + display_width);
}

function updateBoxHeight(val, id) {
    console.log('changin input');
    document.getElementById('textInput').value = val;
    var display = document.getElementById(id);
    console.log(display);
    // var display_width = 10 * val / 5 + '%';
    var display_height = 10 * val / 50 + 'vh';
    // display.style.width = display_width;
    display.style.height = display_height;
    var containers = display.getElementsByTagName('i-container');
    console.log(containers);
    // for (let i = 0; i < containers.length; i++) {
    //     console.log(containers[i]);
    //     // containers[i].style.width = "100px";
    //     console.log(i + ' ' + containers[i] + 'width' + containers[i].getBoundingClientRect.width);
    //     containers[i].getBoundingClientRect.width = val;
    // }
    console.log('this is the width:' + display_width);
}


function CopyDiv() {
    console.log('copy div');
    var overall_view = document.getElementById('overall_view');
    var side_view = document.getElementById('side_view');
    side_view.innerHTML = overall_view.innerHTML;
    side_view.classList.add('check_CLASS');
}
var aft_all = document.getElementsByTagName('i-aft');
var for_all = document.getElementsByTagName('i-for');

function _init_Shipyard() {
    Set_AFT();
    Set_FOR();
    // alert('There are ' + aft_all.length + ' AFTS in this document');
}

function Set_AFT() {
    num = aft_all.length;
    for (let i = 0; i < num; i++) {
        aft_all[i].addEventListener('mouseover', hover_AFT);
        aft_all[i].addEventListener('mouseout', hover_AFT);
    }
}

function Set_FOR() {
    num = for_all.length;
    for (let i = 0; i < num; i++) {
        for_all[i].addEventListener('mouseover', hover_FOR);
        for_all[i].addEventListener('mouseout', hover_FOR);
    }
}


function changeDefOver() {
    console.log('over');
    num = aft_all.length;
    for (let i = 0; i < num; i++) {
        // console.log('hello from def' + ' ' + e[i]);
        aft_all[i].classList.toggle('hovered');
        // aft_all[i].addEventListener('mouseOut', changeDefOver);

    }
    // e.target.classList.toggle('hovered');
}

function changeDefOut() {
    console.log('out');
    num = aft_all.length;
    for (let i = 0; i < num; i++) {
        // console.log('hello from def' + ' ' + e[i]);
        aft_all[i].classList.toggle('hovered');
        // aft_all[i].addEventListener('mouseOut', changeDefOver);
    }
    // aft_all = e;
}

function hover_AFT() { num = aft_all.length; for (let i = 0; i < num; i++) { aft_all[i].classList.toggle('hovered'); } }

function hover_FOR() { num = for_all.length; for (let i = 0; i < num; i++) { for_all[i].classList.toggle('hovered'); } }
