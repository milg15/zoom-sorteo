const { Octokit } = require("@octokit/rest"),
      owner = 'milg15',
      repo = 'zoom-sorteo';

const Faunadb = require('faunadb'),
  q = Faunadb.query


exports.handler = async (event, context) => {
  try {
    const octokit = new Octokit({auth:process.env.GITHUB_TOKEN});
    var client = new Faunadb.Client({ secret: process.env.FAUNA_SECRET })

    if(!event.body) {
      return { 
          statusCode: 500, 
          body: 'Information has to be sent.'
      };
    }
    const body = JSON.parse(event.body);
    const newParticipant = body.payload
    

    var createP = client.query(
      q.Create(
        q.Collection('Participantes'),
        { data: { testField: 'testValue' } }
      )
    )


    let path = 'functions/data/crr_users.json';
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