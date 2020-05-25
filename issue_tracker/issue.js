document.getElementById('issueInputForm').addEventListener('submit', 'saveIssue');

const issueService = {
    getIssues() {
        const issues = localStorage.getItem(issues);

        return issues ? JSON.parse(issues) : []
    },
    getIssue(id) {
        return this.getIssues.find(issue => issue.id === id);
    },
    saveIssue(issue) {
        const issues = this.getIssues();
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    },
    deleteIssue(id) {
        const issues = this.getIssues.filter(issue => issue.id !== id);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
};

function createIssueTemplate({ id, status, description, severity, assignedTo }) {
    return (
        `<div class="well">
        <h6>Issue ID:  ${id} </h6>
        <p><span class="label label-info">${status}</span></p>
        <h3>${description}</h3>
        <p><span class="glyphicon glyphicon-time"></span>${severity}
        <span class="glyphicon glyphicon-user"></span>${assignedTo}</p>
        <a href="#" class="btn btn-warning" onclick="setStatusClosed('${id}')">Close</a>
        <a href="#" class="btn btn-danger" onclick="deleteIssue('${id}')">Delete</a>
        </div>`
    );
}

function issueList() {
    return localStorage.getItem('issues') ?
        JSON.parse(localStorage.getItem('issues')) : [];
}

function fetchIssue() {
    const issue = this.issueList();
    const issueList = document.getElementById('issueList');
    let issueListHtml = '';

    if (issues) {
        issues.forEach(element => issueListHtml += createIssueTemplate(element));
    }

    issueList.innerHTML = issueListHtml;
}

function saveIssue(e) {
    const id = chance.guid();
    const description = document.getElementById('issueDescInput').value || 'Ingen beskrivelse gitt';
    const severity = document.getElementById('issueSeverityInput').value;
    const assignedTo = document.getElementById('issueAssignedToInput').value || 'Ingen brukere tildelt';
    const issues = JSON.parse(localStorage.getItem('issues')) || [];

    issues.push(
        {
            id,
            description,
            severity,
            assignedTo,
            status: 'Open/Åpen'
        }
    );

    localStorage.setItem('issues', JSON.stringify(issues))
    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}

function setStatusClosed(id) {
    const issues = this.issueList();

    if (issues.length) {
        const updateIssue = issues.find(issueToClose => issueToClose.id === id);

        const indOf = issues.indexOf(updateIssue)
        issues.splice(indOf, 1)
        issues.push(
            {
                id: updateIssue.id,
                description: updateIssue.description,
                severity: updateIssue.severity,
                assignedTo: updateIssue.assignedTo,
                status: 'Closed/Lukket'
            }
        )

        localStorage.setItem('issues', JSON.stringify(issues));

        fetchIssues();
    }
}