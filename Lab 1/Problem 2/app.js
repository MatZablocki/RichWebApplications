const noteText = document.getElementById('note-text');
const noteColor = document.getElementById('note-color');
const addButton = document.getElementById('add-button');
const notesContainer = document.querySelector('.notes');

addButton.addEventListener('click', addNote);

function addNote() {
    const text = noteText.value.trim();
    const color = noteColor.value;

    if (text === '') {
        return;
    }

    const note = document.createElement('div');
    note.className = 'note';
    note.style.backgroundColor = color;

    const noteTextElement = document.createElement('div');
    noteTextElement.className = 'note-text';
    noteTextElement.textContent = text;

    const editButton = createButton('Edit', () => {
        editNoteText(noteTextElement);
    });

    const deleteButton = createButton('Delete', () => {
        notesContainer.removeChild(note);
    });

    const noteButtons = document.createElement('div');
    noteButtons.className = 'note-buttons';
    noteButtons.appendChild(editButton);
    noteButtons.appendChild(deleteButton);

    note.appendChild(noteTextElement);
    note.appendChild(noteButtons);
    notesContainer.appendChild(note);

    noteText.value = '';
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

function editNoteText(noteTextElement) {
    const newText = prompt('Edit the note:', noteTextElement.textContent);
    if (newText !== null) {
        noteTextElement.textContent = newText;
    }
}
