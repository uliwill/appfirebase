import React, { Component } from 'react';
import firebase from './fireConnection';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: '',
      user: null
    };

    this.cadastrar = this.cadastrar.bind(this);
    this.logar = this.logar.bind(this);
    this.auth = this.auth.bind(this);
    this.sair = this.sair.bind(this);
  }

  componentDidMount(){
    this.auth();
  }

  auth(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user: user});
      }
    });
  }
  
  cadastrar(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha).catch((error) => {
     alert('Código de erro: ' + error.code);
    });
    
  }

  logar(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha).catch((error) => {
      alert('Código de erro: ' + error.code);
     });
  }

  sair(){
    firebase.auth().signOut().then(()=>{
      this.setState({user: null})
    });
  }
  
  
  
  render() {
   
    return (
      <div>
        {this.state.user ?
        <div>
          <p>Painel Administrativo</p>
          <button onClick={this.sair}>Sair</button>
        </div>
        :
        <div>
          <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} placeholder="E-mail" /><br />
          <input type="password" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})} placeholder="Senha" /><br />
          <button onClick={this.cadastrar}>Cadastrar</button>
          <button onClick={this.logar}>Login</button>
        </div>
        }
      </div>
    );
  }
}

export default App;