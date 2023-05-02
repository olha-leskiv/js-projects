let clicks = 0;

window.onclick = () => {
    if(clicks % 2 != 1) {
        document.querySelector(".counter-active").style.marginBottom = 100 * 3 + "%";
    } else {
        document.querySelector(".counter-active").style.marginBottom = 0;
    }
    clicks++;
}