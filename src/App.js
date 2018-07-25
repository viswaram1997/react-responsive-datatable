import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sample from 'react-sample'
import ResponsiveDataTable from "./table.js"
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headers: [{
        title: "name",
        key: "data",
        editable: true,
        onChangeHandler: this.onChangeHandler.bind(this),
        type: "text",
        placeholder:"Placeholder"
      }, {
        title: "data",
        key: "name"
      }, {
        title: "last name",
        key: "last"
      },
      {
        title: "Address",
        key: "address"
      },
    {
      title:"action",
      type:"button",
      buttonData:[{
        label:"ok",
        onClickHandler:this.Alert.bind(this),
        className:"dsdsds"
      }]
    }],

      tableData: [{
        name: "viswa",
        data: "data",
        last: "ram",
        address: "asasa"
      }, {
        name: "zzz",
        data: "xx",
        last: "dfdf",
        address: "dsds"
      }]
    }
  this.Alert=this.Alert.bind(this)
    this.RenderCom=this.RenderCom.bind(this)
  }
  Alert(){
    alert()
  }
  onChangeHandler(data, fullData) {
    console.log(data, fullData)
  }
  RenderCom(){
    var reactElementUl = React.createElement(
      'ul', {
          className: 'myList'
      },
          React.createElement('li', {id: 'li1',onClick:this.Alert},'one'),
          React.createElement('li', {id: 'li2'},'two'),
          React.createElement('button', {id: 'li3'},'three')
  );
  return reactElementUl
  }
  render() {
    var { headers, tableData } = this.state

    return (
      <div className="App">
        <ResponsiveDataTable headers={headers} tableData={tableData} />
      </div>
    );
  }
}

export default App;
