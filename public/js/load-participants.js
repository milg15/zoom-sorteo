
async function loadParticipantes() {
    const data = await fetch('/.netlify/functions/send-participants')
      .then((res) => res.json())
      .catch((err) => console.error(err));

    let lis = '';
    const idUsers = [];
    data.users.forEach(element=>{
        let obj = element.object
        if("participant" in obj){
          console.log(obj)
          let user = obj.participant
          if (!idUsers.includes(user.user_id)){
            idUsers.push(user.user_id)
            lis += '<li>' + user.user_name+ '</li>';
          }
      }
    });
    const container = document.querySelector('#participants');

    container.innerHTML = lis;
}

loadParticipantes();