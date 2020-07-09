const { Octokit } = require("@octokit/rest"),
      owner = 'milg15',
      repo = 'zoom-sorteo';

exports.handler = async (event) => {
  try {
    const octokit = new Octokit({auth:'b9dcf08361494eac8c1bec81c0376a1b6de83b6a'});

    if(!event.body) {
      return { 
          statusCode: 500, 
          body: 'Information has to be sent.'
      };
    }
    const body = JSON.parse(event.body);
    const newParticipant = body.payload.object
    if(event.body) {
      return { 
          statusCode: 200, 
          body: newParticipant
      };
    }
    /*newItem.title = body.title;
    newItem.link = body.link;
    if(!newItem.title) {
        return { 
            statusCode: 500, 
            body: 'title parameter required' 
        };
    }
    if(!newItem.link) {
        return { 
            statusCode: 500, 
            body: 'link parameter required' 
        };
    }*/
    let path = 'crr_users.json';
    return octokit.repos.getContent({
      owner,
      repo,
      path
    }).then(res => {
      console.log(res);
      let buff = Buffer.from(res.data.content, 'base64');
      let usersRaw = buff.toString('utf-8');
      let usersJSON = JSON.parse(linksRaw);
      let message = 'Updated users';
      let content = '';
      let sha = res.data.sha;
      //usersJSON.users.push(newItem);
      usersRaw = JSON.stringify(usersJSON);
      buff = Buffer.from(usersRaw);
      content = buff.toString('base64');
      return octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content,
        sha
      }).then(res => {
        return {
          statusCode:200, 
          body: '{"success":"true"}'
        }
      })
    });

    
  } catch (err) {[]
    return { statusCode: 500, body: err.toString() };
  }

};