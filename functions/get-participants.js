const { Octokit } = require("@octokit/rest"),
      owner = 'milg15',
      repo = 'zoom-sorteo';

exports.handler = async (event) => {
  try {
    const octokit = new Octokit({auth:'57bab71f6cfe98ad6c1e9f5888102f2b858d8b21'});

    if(!event.body) {
      return { 
          statusCode: 500, 
          body: 'Information has to be sent.'
      };
    }
    const body = JSON.parse(event.body);
    const newParticipant = body.payload
    
    let path = 'crr_users.json';
    return octokit.repos.getContent({
      owner,
      repo,
      path
    }).then(res => {
      console.log(res);
      let buff = Buffer.from(res.data.content, 'base64');
      let usersRaw = buff.toString('utf-8');
      let usersJSON = JSON.parse(usersRaw);
      let message = 'Updated users';
      let content = '';
      let sha = res.data.sha;
      usersJSON.users.push(newParticipant);
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