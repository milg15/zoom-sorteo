const { Octokit } = require("@octokit/rest"),
      owner = 'milg15',
      repo = 'zoom-sorteo';

exports.handler = async (event) => {
  try {
    const octokit = new Octokit({auth:process.env.GITHUB_TOKEN});

    if(!event.body) {
      return { 
          statusCode: 500, 
          body: 'Title and link are required.'
      };
    }
    const body = JSON.parse(event.body);
    const newItem = {"test": "testing"};

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
      let linksRaw = buff.toString('utf-8');
      let linksJSON = JSON.parse(linksRaw);
      let message = 'Updated links';
      let content = '';
      let sha = res.data.sha;
      linksJSON.links.push(newItem);
      linksRaw = JSON.stringify(linksJSON);
      buff = Buffer.from(linksRaw);
      content = buff.toString('base64');
      return octokit.repos.createOrUpdateFile({
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