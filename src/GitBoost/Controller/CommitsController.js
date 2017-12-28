var git = require("../Git/Client");
var config = require("../../../config");

function _get (req, res, next , render)
{
    let objRet = {};
    objRet.repo = req.query.repo;

    let repository = git.getRepositoryFromName(config.git.repositories, req.query.repo);

    if ( req.query.tree == undefined )
    {
        req.query.tree = git.getHead(repository);
    }

    objRet.branch = req.query.tree;
    objRet.branches = git.getBranches(repository);
    objRet.tags = git.getTags(repository);

    objRet.commits = [];

    let obj = {};
    git.getCommits(repository).map(function ( commit )
    {
        let idx = new Date( commit.dateCommit ).toDateString();

        if ( obj[idx] == undefined)
            obj[idx] = [];

        obj[idx].push(commit);

    });

    for ( let key in obj )
    {
        objRet.commits.push({dateCommit : key , commit : obj[key]});
    }


    return objRet;
}
function _post (req, res, next)
{

    return {};
}

module.exports.post = _post;
module.exports.get = _get;