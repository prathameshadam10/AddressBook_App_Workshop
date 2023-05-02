let contactList;
window.addEventListener('DOMContentLoaded', (event) => {
    contactList = getAddressBookDataFromStorage();
    document.querySelector('.person-count').textContent = contactList.length;
    createInnerHtml();
    localStorage.removeItem('editPerson');
});

const getAddressBookDataFromStorage = () => {
  return localStorage.getItem('ContactList') ? 
                    JSON.parse(localStorage.getItem('ContactList')) : [];
}

const createInnerHtml = () => {
const headerHtml ="<th>FullName</th><th>Address</th><th>City</th><th>State</th><th>Zip code</th><th>Phone Number</th><th>Delete-Edit</th>";
    
        
if(contactList.length == 0)return;
let innerHtml = `${headerHtml}`;
for(const contact of contactList){
innerHtml = `${innerHtml}
      <tr>
        
        <td>${contact._name}</td>
        <td>${contact._address}</td>
        <td>${contact._city}</td>
        <td>${contact._state}</td>
        <td>${contact._zip}</td>
        <td>${contact._phoneNumber}</td>

        
        <td>
        <img id="${contact._id}" src="./assets/delete.svg" alt="delete" id="1" onclick="remove(this)">
        <img id="${contact._id}" src="./assets/edit.svg" alt="edit" id="1" onclick="update(this)">
        </td>
    </tr>`;
}
document.querySelector('#table-display').innerHTML = innerHtml;
}

  

  const remove = (node) => {
    let contact = contactList.find( personData => personData._id == node_id);
    if(!contact) return;
    const index = contactList.map(personData => personData._id).indexOf(contact._id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("ContactList", JSON.stringify(contactList));
    document.querySelector(".person-count").textContent = contactList.length;
    createInnerHtml();

  }
  
  