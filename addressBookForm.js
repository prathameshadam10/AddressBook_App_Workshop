let isUpdate = false;
let addressBookObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.name-error');
    if(name){
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            nameError.textContent = " ";
            return;
        }
        try {
            (new Contact()).name = name.value;;
            nameError.textContent = " ";
        }
        catch (e) {
            nameError.textContent = e;
        }

        });
      }
      
        const address = document.querySelector('#address');
        const addressError = document.querySelector('.address-error');
        if(address){
        address.addEventListener('input', function() {
            if(address.value.length == 0) {
                addressError.textContent = " ";
                return;
            }
            try {
                (new Contact()).address = address.value;;
                addressError.textContent = " ";
            }
            catch (e) {
                addressError.textContent = e;
            }
    
            });
        }
            
            const phoneNumber = document.querySelector('#phoneNumber');
            const phoneNumberError = document.querySelector('.tel-error');
            if(phoneNumber){
            phoneNumber.addEventListener('input', function() {
            if(phoneNumber.value.length == 0) {
                phoneNumber.textContent = " ";
                return;
            }
            try {
                (new Contact()).phoneNumber = phoneNumber.value;;
                phoneNumberError.textContent = " ";
            }
            catch (e) {
                phoneNumberError.textContent = e;
            }
    
            });
          }
            
            const zip = document.querySelector('#zip');
            const zipError = document.querySelector('.zip-error');
            if(zip){
            zip.addEventListener('input', function() {
            if(zip.value.length == 0) {
                zip.textContent = " ";
                return;
            }
            try {
                (new Contact()).zip = zip.value;;
                zipError.textContent = " ";
            }
            catch (e) {
                zipError.textContent = e;
            }
    
            });
            checkForUpdate();
        };
      
      });

const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  
   try {
    setAddressBookObject();
    createAndUpdateStorage();
    resetForm();
      window.location.replace(site_properties.home_page);
  } catch (e) {
      return;
  }
}

  const setAddressBookObject = () => {
    
    addressBookObj._name = document.querySelector('#name').value;
    addressBookObj._address = document.querySelector('#address').value;
    addressBookObj._city = document.querySelector('#city').value;
    addressBookObj._state = document.querySelector('#state').value;
    addressBookObj._zip = document.querySelector('#zip').value;
    addressBookObj._phoneNumber = document.querySelector('#phoneNumber').value;
    

   
    
  }

  function createAndUpdateStorage(contact) {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if (contactList) {
      let contact = contactList.
                                  find(personData => personData._id == addressBookObj._id);
      if(!contact) {
        contactList.push(createContact());
      }else {
        const index = contactList
                              .map(personData => personData._id)
                              .indexOf(contact._id);
              contactList.splice(index, 1, createEmployeePayrollData(contact._id));

      }                            
        
    } else {
        contactList = [createContact()];
    }
    alert(contactList.toString());
    localStorage.setItem("ContactList", JSON.stringify(contactList));
  }

  const createContact = (id) => {
    let contact = new Contact();
    if(!id) contact.id = createNewContactId();
    else contact.id = id;
    setContact(contact);
    return contact
  }
  const setContact = (contact) => {
    try {
      contact.name = addressBookObj._name;
    } catch (e) {
      setTextValue('.name-error', e);
      throw e;
    }
    contact._name = addressBookObj._name;
    contact._address = addressBookObj._address;
    contact._city = addressBookObj._city;
    contact._state = addressBookObj._state;
    contact._zip = addressBookObj._zip;
    contact._phoneNumber = addressBookObj._phoneNumber;
    
  
  
    alert(contact.toString());

  }
   const createNewContactId = () => {
    let personID = localStorage.getItem("PersonID");
    personID = !personID ? 1 : (parseInt(personID)+1).toString();
    localStorage.setItem("EmployeeID", personID);
    return personID
  }

  const createPersonContact = () => {
      let contact = new Contact();
      try {
          contact.name = getInputValueById('#name');
      } catch (e) {
          setTextValue('.name-error', e);
          throw e;
      }

      contact.city = getSelectedValues('[name=city]').pop();
      contact.state = getSelectedValues('[name=state]').pop();
      contact.zip = getInputValueById('#zip');
      contact.address = getInputValueById('#address');
      contact.name = getInputValueById('#name');
      contact.phoneNumber = getInputValueById('#phoneNumber');
      
      alert(contact.toString());
      return contact; 
  }
      const getSelectedValues = (propertyValue) => {
          let allItems = document.querySelectorAll(propertyValue);
          let selItems = [];
          allItems.forEach(item => {
              if(item.checked) selItems.push(item.value);
          });
          return selItems;
      };
      const getInputValueById = (id) => {
          let value = document.querySelector(id).value;
          return value;
      };

      const getInputElementValue = (id) => {
          let value = document.getElementById(id).value;
          return value;
      };
      




const setForm = () => {
  setValue('#name', addressBookObj._name);
  setSelectedValues('[name=city]', addressBookObj._city);
  setSelectedValues('[name=state]', addressBookObj._state);
  
  setValue('#address', addressBookObj._address);
  setValue('#zip', addressBookObj._zip);
  setValue('#phoneNumber', addressBookObj._phoneNumber);
 
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    if(Array.isArray(value)) {
      if(value.includes(item.value)){
        item.checked = true;
      }
    }
    else if (item.value == value)
        item.checked = true;
  });
}


const resetForm = () => {
  setValue('#name', '');
  unsetSelectedValues('[name=city]');
  unsetSelectedValues('[name=state]');
  setValue('#phoneNumber');
  setValue('#address');
  setValue('#zip', '');
  
}

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      item.checked = false;
  });
}

const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

const setSelectedIndex = (id , index) => {
  const element = document.querySelector(id);
  element.selectedIndex = index;
}
const checkForUpdate = () => {
  const contactJson = localStorage.getItem('editPerson');
  isUpdate = contactJson ? true : false;
  if(!isUpdate) return;
  addressBookObj = JSON.parse(contactJson);
  setForm();
}
