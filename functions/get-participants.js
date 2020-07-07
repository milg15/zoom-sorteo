const { Octokit } = require("@octokit/rest");
const owner = 'milg15';
const repo = 'zoom-sorteo';

exports.handler = async (event) => {
  try {
    const octokit = new Octokit({auth:'f4d72cf034a9c5f4005e027c0b9e0bad26699285'});
    if(false) {
      return { 
          statusCode: 500, 
          body: JSON.stringify(octokit)
      };
    }
    //const body = JSON.parse(event.body);
    const newItem = {};

    newItem.title = 'https://sorteos.netlify.app/';
    newItem.link = 'https://sorteos.netlify.app/';
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
    }
    let path = 'links.json';
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