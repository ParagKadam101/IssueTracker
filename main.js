document.getElementById('issueForm').addEventListener('submit', submitIssue);

function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issueList = document.getElementById('issuesList');

    if(!issues) return;

    issueList.innerHTML = '';
    for(var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].desc;
        var severity = issues[i].severity;
        var assignee = issues[i].assignee;
        var status = issues[i].status;

        issueList.innerHTML += '<div class="jumbotron">' +
                           '<h6>Issue Id:'+ id +'</h6>' + 
                           '<p><span class="label label-info">'+ status +'</span></p>' +
                           '<h3>'+ desc +'</h3>' +
                           '<p><span class="glyphicon glyphicon-time"></span>'+ severity +'</p>' +
                           '<p><span class="glyphicon glyphicon-user"></span>'+ assignee +'</p>' +
                           '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a>' +
                           '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
                           '</div>';
    }
    
}

function submitIssue(e){
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignee = document.getElementById('issueAssigneeInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        desc: issueDesc,
        severity: issueSeverity,
        assignee: issueAssignee,
        status: issueStatus
    }

    if(localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueForm').reset();
    fetchIssues();
    e.preventDefault();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i = 0; i < issues.length; i++) {
        if(issues[i].id === id) {
            issues[i].status = 'Closed';
            break;
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i = 0; i < issues.length; i++) {
        if(issues[i].id === id) {
            issues.pop(issues[i]);
            break;
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

