import React, { Component } from 'react';
import firebase from './fireConnection';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: ''
    };

    this.cadastrar = this.cadastrar.bind(this);

    firebase.auth().signOut();

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        firebase.database().ref('usuarios').child(user.uid).set({
          nome: this.state.nome,
          email: this.state.email,
          senha: this.state.senha
        }).then(()=>{
          this.setState({nome: '', email: '', senha: ''});
        });
      }
    });
  
  }
  
  cadastrar(e){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha).catch((error) => {
     alert('Código de erro: ' + error.code);
    });
    e.preventDefault();
  }

  
  
  
  render() {
   
    return (
      <div>
        <form onSubmit={this.cadastrar}>
          <input type="text" value={this.state.nome} onChange={(e) => this.setState({nome: e.target.value})} placeholder="Nome" /><br />
          <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} placeholder="E-mail" /><br />
          <input type="password" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})} placeholder="Senha" /><br />
          <button type="submit">Cadastrar</button>
        </form>
        <br />
      </div>
    );
  }
}

export default App;