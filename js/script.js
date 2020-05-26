// Navigation Bar
$(document).ready(function () {
	$(".hamburger").click(function () {
		$(".wrapper").toggleClass("collapse");
	});
});

// Pil
$(document).ready(function () {

	$(window).scroll(function () {
		if ($(this).scrollTop() > 40) {
			$('#arrowBtn').fadeIn();
		} else {
			$('#arrowBtn').fadeOut();
		}
	});

	$('#arrowBtn').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 0);
	});
});

//Legg til Ansatt
function addMember(event) {
	event.preventDefault();

	const name = document.querySelector("[name='name']").value;

	// sjekke input feltet- varsle om å skrive ned navn
	if (name === '') {
		alert('Skriv et navn');
	} else {
		const member = { 'member': name };

		const memberList = JSON.parse(window.localStorage.getItem("members")) || [];
		memberList.push(member);
		window.localStorage.setItem('members', JSON.stringify(memberList));
	}
}

//Legg til arbeidsoppgave
function addTask(event) {
	event.preventDefault();

	const task = document.querySelector("[name='task']").value;

	// // Sjekk om input arbeid er tom eller ikke varsle om å skrive ned arbeidsoppgave
	if (task === '') {
		alert('Skriv arbeidsoppgave');
	} else {
		const newTask = { 'task': task };

		const taskList = JSON.parse(window.localStorage.getItem("tasks")) || [];
		taskList.push(newTask);
		window.localStorage.setItem('tasks', JSON.stringify(taskList));
	}
}
//oppgave
function listAssignments() {
	const assignmentList = JSON.parse(window.localStorage.getItem("assignments")) || [];

	const list = document.getElementById("overview_list");

	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}

	for (const i in assignmentList) {
		const newAssignment = document.createElement("li");
		newAssignment.className = "list_items list_items_assignment";
		list.appendChild(newAssignment);
		newAssignment.innerHTML = `<span class="list_items_member">[${assignmentList[i].member}]</span> <span style="color:#cccc22;"> ➔  </span><span class="list_items_task">[${assignmentList[i].task}]</span>`;
        newAssignment.draggable = true;
	}
}

listAssignments();

//ansatt/medlem 
function listMembers() {
	const memberList = JSON.parse(window.localStorage.getItem("members")) || [];

	const list = document.getElementById("member_list");

	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}

	for (const i in memberList) {
		const newMember = document.createElement("li");
		newMember.className = "list_items list_items_member";
		list.appendChild(newMember);
		newMember.innerHTML = `${memberList[i].member}`;

		newMember.addEventListener("click", selectMember);
		// newMember.addEventListener("mouseover", onHover);
		// newMember.addEventListener("mouseout", onLeave);
	}

}

listMembers();

//oppgave
function listTasks() {
	const taskList = JSON.parse(window.localStorage.getItem("tasks")) || [];

	const list = document.getElementById("task_list");

	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}

	for (const i in taskList) {
		const newTask = document.createElement("li");
		newTask.className = "list_items list_items_task";
		list.appendChild(newTask);
		newTask.innerHTML = `${taskList[i].task}`;

		newTask.addEventListener("click", selectTask);
		// newTask.addEventListener("mouseover", onHover);
		// newTask.addEventListener("mouseout", onLeave);
	}

}

listTasks();




//////////////////////////////////

//legg til Oppgaver
let selectedMember = null;
let selectedTask = null;
let prevMember = null;
let prevTask = null;
const selectedColor = "#333388";
const normalColor = "#333333";
const hoverColor = "#111111";
let prompted = false;


function selectMember() {
	if (prevMember) {
		prevMember.style.backgroundColor = normalColor;
		prevMember = null;
	}

	if (selectedMember == this) {
		selectedMember.style.backgroundColor = normalColor;
		selectedMember = null;
	}
	else {
		selectedMember = this;
		selectedMember.style.backgroundColor = selectedColor;

		prevMember = selectedMember;
	}

	confirmAssignment();
}

function selectTask() {
	if (prevTask) {
		prevTask.style.backgroundColor = normalColor;
		prevTask = null;
	}

	if (selectedTask == this) {
		selectedTask.style.backgroundColor = normalColor;
		selectedTask = null;
	}
	else {
		selectedTask = this;
		selectedTask.style.backgroundColor = selectedColor;

		prevTask = selectedTask;
	}

	confirmAssignment();
}

function confirmAssignment() {
	const confirmSection = document.getElementById("confirm");

	const confirmButton = document.createElement("button");
	confirmButton.type = "button";
	confirmButton.innerHTML = "Bekreft arbeidsoppgave";
	confirmButton.className = "title_sections";
	confirmButton.id = "confirmButton";

	if (selectedMember && selectedTask) {
		if (!document.querySelector("#confirmButton")) {
			confirmSection.appendChild(confirmButton);
		}
		confirmButton.addEventListener("click", function () {
			confirmSection.removeChild(confirmButton);
			assign();
		});
		prompted = true;
	}
	else {
		if (prompted) {
			if (document.querySelector("#confirmButton")) {
				confirmSection.removeChild(document.querySelector("#confirmButton"));
				prompted = false;
			}
		}
	}
}

function assign() {
	if (selectedMember && selectedTask) {
		const assignmentList = JSON.parse(window.localStorage.getItem("assignments")) || [];

		const newAssignment =
		{
			'member': selectedMember.innerHTML,
			'task': selectedTask.innerHTML
		};

		assignmentList.push(newAssignment);
		window.localStorage.setItem('assignments', JSON.stringify(assignmentList));

		selectedMember.style.backgroundColor = normalColor;
		selectedTask.style.backgroundColor = normalColor;
		selectedMember = null;
		selectedTask = null;
	}

	listAssignments();
}

function onHover() {
	if (this != selectedMember && this != selectedTask) {
		this.style.backgroundColor = hoverColor;
	}
}

function onLeave() {
	if (this != selectedMember && this != selectedTask) {
		this.style.backgroundColor = normalColor;
	}
}

//QA
var accordions = document.getElementsByClassName("accordion");

for (var i = 0; i < accordions.length; i++) {
	accordions[i].onclick = function () {
		var content = this.nextElementSibling;

		if (content.style.maxHeight) {
			//accordion is open, we need to close it
			content.style.maxHeight = null;
		} else {
			//accordion is closed
			content.style.maxHeight = content.scrollHeight + "px";
		}
	}
}



// DRAG AND DROP

const overviewList = document.querySelector('.list_items_assignment');
const empties = document.querySelectorAll('.empty');

// Fill listeners
overviewList.addEventListener('dragstart', dragStart);
overviewList.addEventListener('dragend', dragEnd);

// Loop through empty boxes and add listeners
for (const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

// Drag Functions

function dragStart() {
  this.className += ' hold';
  setTimeout(() => (this.className = 'invisible'), 0);
}

function dragEnd() {
  this.className = 'fill';
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.className += ' hovered';
}

function dragLeave() {
  this.className = 'empty';
}

function dragDrop() {
  this.className = 'empty';
  this.append(overviewList);
}
