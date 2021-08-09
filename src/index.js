import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CustomersComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      deleteMessage: '',
      updateMessage: '',
      customers: []
    };
  }

  componentDidMount() {
    this.CustomersRetrieve();
  }

  CustomersRetrieve=()=>{
    fetch("http://192.168.0.104:8080/areebaServices/customerList")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          customers: result.list
        });
      }
    );
    }

    
  onCreateCustomer=()=>{
    let custInfo={
      "name":this.refs.name.value,
      "address":this.refs.address.value,
      "mobileNumber"  :this.refs.mobile.value
        };


      fetch('http://localhost:8080/areebaServices/createCust/',{
      method: 'POST',
      headers:{'Content-type':'application/json'},
        body: JSON.stringify({
         "name":custInfo.name,
         "address":custInfo.address,
         "mobileNumber":custInfo.mobileNumber
           })
    }).then(r=>r.json()).then(res=>{
      if(null != res){
        this.setState({message:res.outputDesc})
        this.CustomersRetrieve();
      }
      else { this.setState({message:'Customer is not updated'})}
    });
    }

    onUpdateCustomer=()=>{
      let updateInfo={
        "customerId":this.refs.idUpdate.value,
        "name":this.refs.name.value,
        "address":this.refs.address.value,
        "mobileNumber"  :this.refs.mobile.value
  
      };

  
  
        fetch('http://localhost:8080/areebaServices/updateCust',{
        method: 'PUT',
        headers:{'Content-type':'application/json'},
          body: JSON.stringify({
         "customerId":updateInfo.customerId,
        "name":updateInfo.name,
        "address":updateInfo.address,
        "mobileNumber"  :updateInfo.mobileNumber
          })
      }).then(r=>r.json()).then(result=>{
        if(null != result){
          this.setState({updateMessage:result.outputDesc})
          this.CustomersRetrieve();
        }
        else { this.setState({updateMessage:'Customer is not updated'})}
      });
      }

      onDeleteCustomer=()=>{
        let deleteInfo={
              customerId:this.refs.id.value
        
            };
    
          fetch('http://localhost:8080/areebaServices/deleteCustById',{
          method: 'DELETE',
          headers:{'Content-type':'application/json'},
            body: 
            JSON.stringify({
              "customerId": deleteInfo.customerId 
         })
        }).then(r=>r.json()).then(result=>{
          if(null != result && result.outputCode == 0){
            this.setState({deleteMessage:result.outputDesc})
            this.CustomersRetrieve();
          }
          else { this.setState({deleteMessage:'Customer is not deleted'})}
        });
        }

  render() {
    return (
      <div>
        <h2>Customers Data...</h2>
        <table>
          <thead>
            <tr>
              <th>Customer Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>  
          {this.state.customers.map(cust => (
            <tr key={cust.customerId}>
              <td>{cust.customerId}</td>
              <td>{cust.name}</td>
              <td>{cust.address}</td>
              <td>{cust.mobileNumber}</td>
              </tr>
             ))}       
          </tbody>
        </table>

        <button onClick={this.CustomersRetrieve}>Refresh</button>

        <h2>Please Enter Customer Details...</h2>
        <p>
          <label>Customer ID : <input type="text" ref="idUpdate"></input></label>
        </p>
        <p>
          <label>Customer Name : <input type="text" ref="name"></input></label>
        </p>
        <p>
          <label>Customer Address : <input type="text" ref="address"></input></label>
        </p>
        <p>
          <label>Mobile Number : <input type="text" ref="mobile"></input></label>
        </p>
       
        <button onClick={this.onCreateCustomer} >Create </button>
        {this.state.message}
        <p>
        <button onClick={this.onUpdateCustomer} >Update </button>
        
        {this.state.updateMessage}
        </p>
        

        <h2>Delete</h2>
        <p>
          <label>Customer ID : <input type="text" ref="id"></input></label>
        </p>
        
        <button onClick={this.onDeleteCustomer} >Delete </button>
        {this.state.deleteMessage}
      </div>

      
      );
    }
}




const element=<CustomersComponent></CustomersComponent>

ReactDOM.render(element,document.getElementById("root"));