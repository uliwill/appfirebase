import React, { Component } from 'react';
import firebase from 'firebase';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      nomeInput: '',
      idadeInput: '',
      token: 'Carregando...',
      nome: '',
      idade: ''
    };

    this.cadastrar = this.cadastrar.bind(this);

    // Your web app's Firebase configuration
    let firebaseConfig = {
      apiKey: "AIzaSyC6PsS1jNApokSdmFxFVfPRJGADT1-2T1I",
      authDomain: "reactapp-54dd5.firebaseapp.com",
      databaseURL: "https://reactapp-54dd5.firebaseio.com",
      projectId: "reactapp-54dd5",
      storageBucket: "reactapp-54dd5.appspot.com",
      messagingSenderId: "925496935502",
      appId: "1:925496935502:web:7136ebfe4f2e3084362f1f",
      measurementId: "G-STB4YTE6FS"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    firebase.database().ref('token').on('value', (snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });

    firebase.database().ref('usuarios').child(1).on('value', (snapshot) => {
      let state = this.state;
      state.nome = snapshot.val().nome;
      state.idade = snapshot.val().idade;
      this.setState(state);
    });
  }
  
  cadastrar(e){
    //firebase.database().ref('token').set(this.state.tokenInput);

    let usuarios = firebase.database().ref('usuarios');
    let chave = usuarios.push().key;
    usuarios.child(chave).set({
      nome: this.state.nomeInput,
      idade: this.state.idadeInput
    });
    e.preventDefault();
  }
  
  render() {
    const {token, nome, idade} = this.state;
    return (
      <div>
        <form onSubmit={this.cadastrar}>
          <input type="text" value={this.state.nomeInput} onChange={(e) => this.setState({nomeInput: e.target.value})} placeholder="Nome" /><br />
          <input type="text" value={this.state.idadeInput} onChange={(e) => this.setState({idadeInput: e.target.value})} placeholder="Idade" /><br />
          <button type="submit">Cadastrar</button>
        </form>
        <h1>Token: {token}</h1>
        <h1>Nome: {nome}</h1>
        <h1>Idade: {idade}</h1>
      </div>
    );
  }
}

export default App;