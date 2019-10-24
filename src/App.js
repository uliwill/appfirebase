import React, { Component } from 'react';
import firebase from './fireConnection';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: ''
    };

    this.logar = this.logar.bind(this);
    this.sair = this.sair.bind(this);

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        alert('Usuário logado com sucesso!')
      }
    });
  
  }
  
  logar(e){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha).catch((error) => {
      if(error.code === 'auth/wrong-password'){
        alert('Senha incorreta!');
      } else {
        alert('Código de erro: ' + error.code);
      }
    });
    e.preventDefault();
  }

  sair(){
    firebase.auth().signOut();
    alert('Deslogado com sucesso!');
  }
  
  
  render() {
   
    return (
      <div>
        <form onSubmit={this.logar}>
          <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} placeholder="E-mail" /><br />
          <input type="password" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})} placeholder="Senha" /><br />
          <button type="submit">Entrar</button>
        </form>
        <br />
        <button onClick={this.sair}>Sair</button>
      </div>
    );
  }
}

export default App;