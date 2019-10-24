import React, { Component } from 'react';
import firebase from './fireConnection';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: ''
    };

    this.cadastrar = this.cadastrar.bind(this);
  
  }
  
  cadastrar(e){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha).catch((error) => {
      if(error.code === 'auth/invalid-email'){
        alert('E-mail inválido!');
      }
      if(error.code === 'auth/weak-password'){
        alert('Senha fraca!');
      } else {
        alert('Código de erro: ' + error.code);
      }
    });
    e.preventDefault();
  }
  
  
  render() {
   
    return (
      <div>
        <form onSubmit={this.cadastrar}>
          <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} placeholder="E-mail" /><br />
          <input type="password" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})} placeholder="Senha" /><br />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    );
  }
}

export default App;