function borrarParticipante(el){
  var element = document.getElementById(`name${el}`);
  element.remove();
}

async function loadParticipantes() {
    const data = await fetch('/.netlify/functions/send-participants')
      .then((res) => res.json())
      .catch((err) => console.error(err));

    let lis = '';
    const idUsers = [];
    let id = 0;
    data.users.forEach((element)=>{
        let obj = element.object
        if("participant" in obj){
          let user = obj.participant
          if (!idUsers.includes(user.user_id)){
            idUsers.push(user.user_id)
            lis += `<li id="name${id}">${user.user_name} <span class="borrar" onclick="borrarParticipante(${id})">-</span></li>`;
            id+=1;
          }  
      }
    });
    const container = document.querySelector('#participants');

    container.innerHTML = lis;
}



loadParticipantes();