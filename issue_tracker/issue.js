document.getElementById('issueInputForm').addEventListener('submit', 'saveIssue');

const issueService = {
    getIssues() {
        const issues = localStorage.getItem(issues);

        return issues ? JSON.parse(issues) : []
    },
    getIssue(id) {
        return.this.getIssues.find(issue => issue.id === id);
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

function