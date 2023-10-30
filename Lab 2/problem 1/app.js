let contacts = [];

function addContact() {
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!validateContact(name, mobile, email)) {
        document.getElementById("error").style.display = "block";
        return;
    }
    document.getElementById("error").style.display = "none";
    const contact = { name, mobile, email };
    contacts.push(contact);
    updateTable();
    resetFields();
}

function validateContact(name, mobile, email) {
    const namePattern = /^[A-Za-z\s]{1,20}$/;
    const mobilePattern = /^[0-9]{10}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!name.match(namePattern) || !mobile.match(mobilePattern) || !email.match(emailPattern)) {
        return false;
    }
    return true;
}

function updateTable(contactsArray) {
    const table = document.getElementById("contactTable");
    table.innerHTML = "";

    const contactsToDisplay = contactsArray || contacts; // Use filtered contacts if provided, otherwise use all contacts.

    contactsToDisplay.forEach(contact => {
        const row = table.insertRow(table.rows.length);
        row.insertCell(0).textContent = contact.name;
        row.insertCell(1).textContent = contact.mobile;
        row.insertCell(2).textContent = contact.email;
    });

    document.getElementById("error").style.display = "none";
}


function resetFields() {
    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("email").value = "";
}

let ascendingSort = true;

function sortTable(column) {
    contacts.sort((a, b) => {
        const valueA = a[Object.keys(a)[column]];
        const valueB = b[Object.keys(b)[column]];
        return ascendingSort ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });

    ascendingSort = !ascendingSort;
    updateTable();
}

function filterContacts() {
    const search = document.getElementById("search").value.trim();
    const filteredContacts = contacts.filter(contact => contact.mobile.includes(search));
    const noResultDiv = document.getElementById("noResult");

    if (filteredContacts.length === 0) {
        noResultDiv.style.display = "block";
    } else {
        noResultDiv.style.display = "none";
    }

    updateTable(filteredContacts);
}