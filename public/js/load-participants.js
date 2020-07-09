
async function loadParticipantes() {
    const data = await fetch('/.netlify/functions/send-participants')
      .then((res) => res.json())
      .catch((err) => console.error(err));

    let lis = '';
    console.log(data)
    data.users.forEach(element=>{
        lis += '<li>' + JSON.stringify(element)+ '</li>';
    });
    parte.innerHTML = lis;
}

loadParticipantes();