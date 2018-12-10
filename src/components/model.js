import { Modal, Form, Tooltip , Button, Input, Icon, Cascader    } from 'antd';
import React, { Component } from 'react'
import './../styles/model.css';


const FormItem = Form.Item;


class Model extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
        // this.showModal = this.showModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this); 
    }



    showModal() {
        this.setState({
            visible: true,
        });
    }

    closeModal() {
      debugger;
      this.setState({
        visible: false,
      },()=> {
        this.props.handleCancel();
      });
    }



    handleOk() {
        // console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel() {
        this.setState({
          visible: false,
        },()=> {
          this.props.handleClick();
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props, "this.propsthis.propsthis.propsthis.propsthis.props");
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.addContact(values, ()=>{
                  this.handleCancel();
                });
            }
        });
    }


  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

    return (
      <div>
        {/* <Button type="primary" onClick={value => this.showModal()}> */}
        <Modal
          title="Add SKU"
          visible={this.state.visible}
          onOk={value => this.handleOk()}
          onCancel={value => this.handleCancel()}
          className="model"
        >
          <Form onSubmit={this.handleSubmit}>
       
          <FormItem
          {...formItemLayout}
          label={(
            <span>
              SKU
            </span>
          )}
        >
          {getFieldDecorator('SKU', {
            rules: [{ required: true, message: 'Please input your sku!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
       
       
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Name
            </span>
          )}
        >
          {getFieldDecorator('NAME', {
            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Location
            </span>
          )}
        >
          {getFieldDecorator('LOCATION', {
            rules: [{ required: true, message: 'Please input your location!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
       
        <FormItem
          {...formItemLayout}
          label="Department"
        >
          {getFieldDecorator('DEPARTMENT', {
            rules: [{ required: true, message: 'Please input your department!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Category"
        >
          {getFieldDecorator('CATEGORY', {
            rules: [{ required: true, message: 'Please input your Category!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label="SubCategory"
        >
          {getFieldDecorator('SUBCATEGORY', {
            rules: [{ required: true, message: 'Please input your SubCategory!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </FormItem>
       
        <FormItem>
          <Button type="primary" htmlType="submit">Save</Button>
        </FormItem>
      </Form>
        </Modal>
      </div>
    );
  }
}


const ContactForm = Form.create()(Model);

export default ContactForm