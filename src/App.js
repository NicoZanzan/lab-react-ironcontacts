import logo from './logo.svg';
import './App.css';
import contacts from "./contacts.json";

import React, { Component } from 'react'

export default class App extends Component {
  state = {
    contacts: contacts.slice(0,5)
  }
 
  addRandomContact = () => {
    //const stateContactsId = this.state.contacts.map((contact) => contact.id)
    //let nonStateContacts=contacts.filter(contact=>{return  !this.state.list.includes(contact)})
    //const restOfTheContacts = contacts.filter(contact => !stateContactsId.includes(contact.id))
    const restOfTheContacts = contacts.filter(contact => !this.state.contacts.includes(contact))
    const randomContact = restOfTheContacts[Math.floor(Math.random() * restOfTheContacts.length)]
    //const newContacts = this.state.contacts.concat(randomContact)
    this.setState((state,props)=> ({
      contacts: [...this.state.contacts,randomContact]
    }))
  }

  sortByName = () => {
    const sortedContacts = this.state.contacts.sort((a,b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    this.setState(()=> ({
      contacts: sortedContacts
    }))
  }

  sortByPopularity = () => {
    const sortedPopularity = this.state.contacts.sort((a,b) => {
      if (a.popularity > b.popularity) return -1
      if (a.popularity < b.popularity) return 1
      return 0
    })
    this.setState(()=> ({
      contacts: sortedPopularity
    }))
  }
  
  deleteContact = (id) => {
    const contactCopy = this.state.contacts
    const contactId = contactCopy.findIndex(contact => contact.id === id)
    contactCopy.splice(contactId,1)
    this.setState({
      contacts: contactCopy
    })
  }

  render() {
      return (
      <div>
        <h1>IronCONTACTS</h1>
        <button onClick={this.addRandomContact}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by Name</button>
        <button onClick={this.sortByPopularity}>Sort by Popularity</button>
        <table>
        <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Action</th>

        {this.state.contacts.map(item => (
    
            <tr key={item.id}> 
              <td><img style={{width:'80px'}} src={item.pictureUrl}/></td>
            
               <td>{item.name}</td>
              
               <td>{item.popularity.toFixed(2)}</td>
               <td><button onClick={() => this.deleteContact(item.id)}>Delete Contact</button></td>
               
            </tr>
          ))}      
        </table>
        
      </div>
    )
  }
}