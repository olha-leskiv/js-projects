function changeBackground(number) {
    switch (number) {
        case "1":
            document.body.classList.toggle('background-1');
            document.body.classList.remove('background-2', 'background-3');
            break;
        case "2":
            document.body.classList.toggle('background-2');
            document.body.classList.remove('background-1', 'background-3');
            break;
        case "3":
            document.body.classList.toggle('background-3');
            document.body.classList.remove('background-2', 'background-1');
            break;
        default:
            break;
    }
}