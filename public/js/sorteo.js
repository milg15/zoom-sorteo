function doSorteo(){
    const participantes = document.getElementById("participants")
    const users = participantes.getElementsByTagName('li')
    const winner = users[Math.floor(Math.random()*users.length)]

    return winner.innerText.replace("-", "")
}



function showWinner(){
    const winner = document.getElementById("winner")
    document.getElementById("celebrate").classList.add("pyro");
    winner.innerText = doSorteo();
}

document.getElementById("Button").addEventListener("click", showWinner);

