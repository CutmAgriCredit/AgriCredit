import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import web3 from './web3';
import loan from './loan';
var db = [];
var loans = [];
var c2=0;
var records = [];
var status = [];
var db_l = [];
const divStyle = {
fontSize: 16
};

class App extends Component {
  state = {
    user: '',
    user_db: [],
    value: '',
    sender_db: [],
    receiver_db: [],
    value1: [],
    value_2: '',
    value3: '',
    user2:'',
    loan_db: [],
    value2: [],
    loan_no: '',
    message: '',
    message2: [],
    message3: '',
    message4: '',
    message5: '',
    message6: '',
    message7: '',
    message8: '',
    message9: '',
    message10: [],
    message11: '',
    message12: '',
    message13: [],
    message14: '',
  };
  async componentDidMount() {
    const user_db = await loan.methods.getUserDatabase().call();
    const sender_db = await loan.methods.getSenderAddress().call();
    const receiver_db = await loan.methods.getReceiverAddress().call();
    const value1 = await loan.methods.getValue().call();
    const loan_db=await loan.methods.getLoanAddress().call();
    const value2=await loan.methods.getLoanValue().call();
    const balance = await web3.eth.getBalance(loan.options.address);
    this.setState({user_db, sender_db, receiver_db, value1, loan_db, value2, balance});
  }
  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    this.setState({message: 'Please wait...'});
    console.log(accounts[0]);
    for(var j=0;j<this.state.user_db.length;j++){
      if(accounts[0]===this.state.user_db[j]){
        c2=1;
        console.log("already registered");
        break;
      } else {
        console.log("new user");
      }
    }
    if (c2===1){
        this.setState({message: 'You are already registered. Please login.'});
    } else{
    await loan.methods.signUp().send({
        from: accounts[0]
    });
    this.setState({message: 'You have been successfully registered. Please refresh the page to login.'});
    this.setState({message6: 'Your address is '+accounts[0]+'.'});
  }
};
  onSubmit2 = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    c2=0;
    console.log(accounts[0]);
    for(var j=0;j<this.state.user_db.length;j++){
      if(accounts[0]===this.state.user_db[j]){
        c2=1;
        console.log("successful login");
        break;
      } else {
        console.log("login failed");
      }
    }
    if (c2!==1){
      this.setState({message2: ["You do not have permission to view the database!"]});
    } else {
    console.log(this.state.user_db.length);
    for(var i=0;i<this.state.user_db.length;i++){
      db[i] = this.state.user_db[i];
      console.log(db[i]);
    }
    this.setState({message2: db});
  }
  };
  onSubmit3 = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    c2=0;
    console.log(accounts[0]);
    for(var j=0;j<this.state.user_db.length;j++){
      if(accounts[0]===this.state.user_db[j]){
        c2=1;
        console.log("successful login");
        break;
      } else {
        console.log("login failed");
      }
    }
    if (c2!==1){
      this.setState({message9: 'You are not a registered user!'});
    } else {
    this.setState({message9: 'Waiting on transaction success...'});
    // console.log(accounts[0]);
    // console.log(this.state.user);
    // console.log(this.state.value);
    await loan.methods.Lend(this.state.user).send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
    });
    console.log("sender_db: "+this.state.sender_db[0]);
    this.setState({message9: 'Transaction successful! Please refresh the page to view the updated ledger.'});
    this.setState({message3: 'Request approved.'});
    this.setState({message4: 'Your account '+accounts[0]+' successfully sent '+
    this.state.value+' ether to '+this.state.user});
  //   for(var m=0;m<this.state.loan_db.length;m++){
  //     if((Number(this.state.loan_no))-1===m){
  //       this.state.loan_db[m]=this.state.loan_db+" - paid!";
  //     }
  //   }
  // this.setState({message13: this.state.loan_db});
  }
  };

  onSubmit4 = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    c2=0;
    console.log(accounts[0]);
    for(var j=0;j<this.state.user_db.length;j++){
      if(accounts[0]===this.state.user_db[j]){
        c2=1;
        console.log("successful login");
        break;
      } else {
        console.log("login failed");
      }
    }
    if (c2!==1){
      this.setState({message14: 'Sorry! Only registered users can make loan requests.'});
    } else {
      this.setState({message14: 'Sending loan request...'});
      await loan.methods.Borrow().send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value_2, 'ether')
      });
    this.setState({message14: 'Successfully sent loan request. Please refresh the page to view the updated loan history.'});
    status = "Account "+accounts[0]+" has made a request for "+this.state.value_2+" ether";
    this.setState({message3: status});
    //console.log(accounts[0]);
    // console.log(this.state.user_b);
    // console.log(this.state.value);
  }
  };

  onSubmit5 = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    c2=0;
    console.log(accounts[0]);
    for(var j=0;j<this.state.user_db.length;j++){
      if(accounts[0]===this.state.user_db[j]){
        c2=1;
        console.log("successful login");
        break;
      } else {
        console.log("login failed");
      }
    }
      console.log(c2);
      if (c2===1){
        this.setState({message7: "Logged in successfully! Your account address is "+accounts[0]+"."});
      } else {
        this.setState({message7: "Please register!"});
      }
    };

    onSubmit6 = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      c2=0;
      console.log(accounts[0]);
      for(var j=0;j<this.state.user_db.length;j++){
        if(accounts[0]===this.state.user_db[j]){
          c2=1;
          console.log("successful login");
          break;
        } else {
          console.log("login failed");
        }
      }
      if (c2!==1){
        this.setState({message10: ["You do not have permission to view the database!"]});
      } else {
      // console.log("sender_db length: "+this.state.sender_db.length);
      // console.log(this.state.receiver_db.length);
      // console.log(this.state.value1.length);
      for(var k=0;k<this.state.sender_db.length;k++){
        records[k] = this.state.sender_db[k]+" sent "+web3.utils.fromWei(this.state.value1[k], 'ether')+" ether to "+this.state.receiver_db[k];
        console.log(records[k]);
      }
      this.setState({message10: records});
    }
    };

    onSubmit7 = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      c2=0;
      console.log(accounts[0]);
      for(var j=0;j<this.state.user_db.length;j++){
        if(accounts[0]===this.state.user_db[j]){
          c2=1;
          console.log("successful login");
          break;
        } else {
          console.log("login failed");
        }
      }
      if (c2!==1){
        this.setState({message12: 'You are not a registered user!'});
      } else {
      this.setState({message12: 'Waiting on transaction success...'});
      console.log(accounts[0]);
      console.log(this.state.user2);
      console.log(this.state.value3);
      await loan.methods.Lend(this.state.user2).send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value3, 'ether')
      });
      console.log("sender_db: "+this.state.sender_db[0]);
      this.setState({message12: 'Transaction successful!'});
      this.setState({message11: 'Your account '+accounts[0]+' successfully sent '+
      this.state.value3+' ether to '+this.state.user2+'.'});
    //   for(var m=0;m<this.state.loan_db.length;m++){
    //     if((Number(this.state.loan_no))-1===m){
    //       this.state.loan_db[m]=this.state.loan_db+" - repaid!";
    //     }
    //   }
    // this.setState({message13: this.state.loan_db});
    }
  };

    onSubmit8 = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      c2=0;
      console.log(accounts[0]);
      for(var j=0;j<this.state.user_db.length;j++){
        if(accounts[0]===this.state.user_db[j]){
          c2=1;
          console.log("successful login");
          break;
        } else {
          console.log("login failed");
        }
      }
      if (c2!==1){
        this.setState({message13: ["You do not have permission to view the database!"]});
      } else {
      // console.log("sender_db length: "+this.state.sender_db.length);
      // console.log(this.state.receiver_db.length);
      // console.log(this.state.value1.length);
      for(var k=0;k<this.state.loan_db.length;k++){
        loans[k] = (k+1)+": "+this.state.loan_db[k]+" requested "+web3.utils.fromWei(this.state.value2[k], 'ether')+" ether";
        console.log(loans[k]);
      }
      this.setState({message13: loans});
    }
    };
  render(){
  console.log(web3.version);
  web3.eth.getAccounts().then(console.log);
  return (
    <div>
      <h2>Agri Loan Contract</h2>
      <p>There are currently {this.state.user_db.length} users in the database.</p>
      <hr />
      <form onSubmit={this.onSubmit}>
      <h4>First time user? Would you like to register?</h4>
      <button>Register</button>
      </form>
      <p>{this.state.message}</p>
      <p>{this.state.message6}</p>
      <hr />
      <form onSubmit={this.onSubmit5}>
      <h4>If you have registered, please login to view your account address.</h4>
      <button>Login</button>
      </form>
      <p>{this.state.message7}</p>
      <hr />
      <form onSubmit={this.onSubmit3}>
      <h4>Would you like to lend ether to an account?</h4>
      <div>
      <p>
      <label>{"Enter the borrower's account address:"}</label>
      <input
        user={this.state.value}
        onChange={event => this.setState({user: event.target.value})}
      />
      </p>
      <label>Enter the amount:</label>
      <input
        value={this.state.value}
        onChange={event => this.setState({value: event.target.value})}
      />
      </div>
      <p><button>Lend</button></p>
      </form>
      <p>{this.state.message9}</p>
      <p>{this.state.message4}</p>
      <hr />
      <form onSubmit={this.onSubmit4}>
      <h4>Would you like to borrow some ether?</h4>
      <div>
      <p>
      <label>Enter the amount:</label></p>
      <input
        value_2={this.state.value}
        onChange={event => this.setState({value_2: event.target.value})}
      />
      </div>
      <p><button>Send Borrow Request</button></p>
      </form>
      <p>{this.state.message14}</p>
      <p>{this.state.message3}</p>
      <hr />
      <form onSubmit={this.onSubmit2}>
      <h4>{"Registered Users Database"}</h4>
      <button>View</button>
      </form>
      <p><div style={divStyle}>
      {this.state.message2.join(', ')}
      </div></p>
      <hr />
      <form onSubmit={this.onSubmit6}>
      <h4>{"Transaction Records Database (Ledger)"}</h4>
      <button>View</button>
      </form>
      <p><div style={divStyle}>
      {this.state.message10.join(', ')}
      </div></p>
      <hr />
      <form onSubmit={this.onSubmit7}>
      <h4>Would you like to repay a loan?</h4>
      <div>
      <p>
      <label>{"Enter the receiver's account address:"}</label>
      <input
        user2={this.state.value}
        onChange={event => this.setState({user2: event.target.value})}
      />
      </p>
      <p>
      <label>{"Enter the loan index number:"}</label>
      <input
        loan_no={this.state.value}
        onChange={event => this.setState({loan_no: event.target.value})}
      />
      </p>
      <label>Enter the amount:</label>
      <input
        value3={this.state.value}
        onChange={event => this.setState({value3: event.target.value})}
      />
      </div>
      <p><button>Repay</button></p>
      </form>
      <p>{this.state.message12}</p>
      <p>{this.state.message11}</p>
      <hr />
      <form onSubmit={this.onSubmit8}>
      <h4>View Loan Requests</h4>
      <p>{"Please cross-check with the ledger to see loan status."}</p>
      <button>View</button>
      </form>
      <p><div style={divStyle}>
      {this.state.message13.join(', ')}
      </div></p>
    </div>
  );
}
}
export default App;
