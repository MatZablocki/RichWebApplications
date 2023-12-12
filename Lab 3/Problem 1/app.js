const noteText = document.getElementById('note-text');
const noteColor = document.getElementById('note-color');
const addButton = document.getElementById('add-button');
const notesContainer = document.querySelector('.notes');

const { fromEvent } = rxjs;
const { map, switchMap, takeUntil } = rxjs.operators;


// Convert DOM elements to observables
const addButtonClick$ = fromEvent(addButton, 'click');

// Function to create a stream for the 'Edit' button click event
function createEditButtonClickStream(editButton) {
    return fromEvent(editButton, 'click');
}

// Function to create a stream for the 'Delete' button click event
function createDeleteButtonClickStream(deleteButton) {
    return fromEvent(deleteButton, 'click');
}

// Function to create a stream for the 'Edit' button click event with text input
function createEditNoteTextStream(editButton, noteTextElement) {
    return fromEvent(editButton, 'click').pipe(
        switchMap(() =>
            fromEvent(document, 'keydown').pipe(
                takeUntil(fromEvent(document, 'click')),
                map(() => noteTextElement.textContent)
            )
        )
    );
}

// Modify the addNote function to use RxJS streams
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

    const editButton = createButton('Edit');

    const deleteButton = createButton('Delete');

    const noteButtons = document.createElement('div');
    noteButtons.className = 'note-buttons';
    noteButtons.appendChild(editButton);
    noteButtons.appendChild(deleteButton);

    note.appendChild(noteTextElement);
    note.appendChild(noteButtons);
    notesContainer.appendChild(note);

    // Create streams for 'Edit' and 'Delete' button clicks
    const editButtonClick$ = createEditButtonClickStream(editButton);
    const deleteButtonClick$ = createDeleteButtonClickStream(deleteButton);

    // Subscribe to the streams
    editButtonClick$.subscribe(() => {
        const editNoteText$ = createEditNoteTextStream(editButton, noteTextElement);
        editNoteText$.subscribe((newText) => {
            noteTextElement.textContent = newText;
        });
    });

    deleteButtonClick$.subscribe(() => {
        notesContainer.removeChild(note);
    });

    noteText.value = '';
}