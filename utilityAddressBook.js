const update = (node) => {
    let contact = contactList.find(personData => personData._id == node.id)
    if (!contact) return;
    localStorage.setItem('editEmp', JSON.stringify(contact))
    window.location.replace(site_properties.add_addressbook_contact_page);
}