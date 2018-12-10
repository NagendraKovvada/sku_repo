import React, { Component } from 'react'
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import { Table, Icon, Button, Tooltip   } from 'antd';
import axios from 'axios';
import  ContactForm from './model'
import './../styles/style.css'



class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.state  = { 
            contacts : [],
            columns: [],
            isOpen: false
        }
        this.rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };

          this.handleClick = this.handleClick.bind(this);
          this.addContact = this.addContact.bind(this);
          this.deleteContact = this.deleteContact.bind(this);
       
    }


    componentDidMount() {
        axios
        .get('http://127.0.0.1:8000/users/')
        .then(({ data })=> {
          console.log(data);
          const columns =[{
            title: 'SKU',
            dataIndex: 'SKU',
          }, {
            title: 'NAME',
            dataIndex: 'NAME',
          },
          {
            title: 'LOCATION',
            dataIndex: 'LOCATION',
          },
          {
            title: 'DEPARTMENT',
            dataIndex: 'DEPARTMENT',
          },
          {
            title: 'CATEGORY',
            dataIndex: 'CATEGORY',
          },
          {
            title: 'SUBCATEGORY',
            dataIndex: 'SUBCATEGORY',
          },
          {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <Tooltip title="Delete a Contact">
              <span>
                <a><Icon type="delete" className="font_25"  className="delete_contact" onClick={()=>{this.deleteContact(record)}}/></a>
              </span>
              </Tooltip>
            ),
          }
        ]
          this.setState({
              contacts: data,
              columns: columns
          });
        })
        .catch((err)=> {})
    }

    handleClick() {
        this.setState({ isOpen: !this.state.isOpen });
    }


    addContact(props, cb) {
      let { contacts } = this.state;
      props['Id'] = this.state.contacts.length;
      contacts.push(props);
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/users/',
        data: contacts,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    this.setState({contacts: contacts}, function() {
        cb();
      });
    }

    deleteContact(record) {
      let { contacts, details, } = this.state;
      axios({
        method: 'delete',
        url: 'http://127.0.0.1:8000/del/record.Id',
        data: contacts,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      this.setState(contacts);
    }

    render() {
      console.log(this.state.isOpen,"isOpennnnnn");
        return(
            <div>
                {this.state.isOpen ?  <ContactForm addContact={this.addContact} isOpen={this.state.isOpen} handleClick={this.handleClick}/> : '' }

                <Button className="add_contact" type="primary" onClick={this.handleClick}>Add SKU</Button>
                <Table  columns={this.state.columns} dataSource={this.state.contacts} />
            </div>
            
        );
    }

}

export default Contacts