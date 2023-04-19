toggle = document.getElementById('themeToggle');
textarea = document.querySelector('textarea');

toggle.onclick = () => {
    document.body.classList.toggle('dark');
    document.body.classList.add('transition');
}

textarea.oninput = () => {
    textarea.style.height = '100%';
    if(textarea.scrollHeight <= textarea.offsetHeight) return;
    let difference = textarea.scrollHeight - textarea.offsetHeight;
    textarea.style.height = textarea.offsetHeight + difference + 'px';
}