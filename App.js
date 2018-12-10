import React, { Component } from 'react';
import Contacts from './src/components/contacts'

class App extends Component{
   render(){
      return(
         <div>
            {/* <h1>Hello World</h1> */}
            <Contacts />
         </div>
      );
   }
}
export default App;