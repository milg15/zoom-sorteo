
function createProductFromTemplate(part) {
    const template = document.querySelector('#participants');
    const participant = template.content.cloneNode(true);
  
    participant.querySelector('h2').innerText = part.name;
    //participant.querySelector('.description').innerText = part.description;
  
    const img = participant.querySelector('img');
    img.src = part.image;
    img.alt = part.name;
    console.log(template, participant)
    return participant;
   }
export async function loadParticipantes() {
    const data = await fetch('/.netlify/functions/get-participants')
      .then((res) => res.json())
      .catch((err) => console.error(err));
  
    const container = document.querySelector('.participants');
  
    data.forEach((part) => {
      const participant = createProductFromTemplate(part);
      console.log(container)
      container.appendChild(participant);
    });
  }