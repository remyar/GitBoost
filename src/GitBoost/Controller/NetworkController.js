var git = require("../Git/Client");
var config = require("../../../config");

function _get (req, res, next , render)
{
    let objRet = {}
    objRet.repo = req.query.repo;
    
    let repository = git.getRepositoryFromName(config.git.repositories, req.query.repo);
    
    if ( req.query.tree == undefined )
    {
        req.query.tree = git.getHead(repository);
    }

    objRet.branch = req.query.tree;
    objRet.branches = git.getBranches(repository);
    objRet.tags = git.getTags(repository);
    objRet.networkMenuActive = true;
    switch ( req.query.action)
    {
        case ( "view"):
        {
            objRet.graphLogs = git.getLogsForGraph(repository);
            objRet.graphData = git.getdataForGraph(repository);
            objRet.graphLines = git.getGraph(repository);
            res.send(JSON.stringify(objRet));
            break;
        }
        default:
        {
            return objRet;
        }
    }
}


module.exports.get = _get;
