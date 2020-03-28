import React from 'react'
import Header from './Header'
import Footer from './Footer'
export default class Layaout extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return(
           <div>
              <Header />
                 { this.props.children }
           </div>
        );
    }
}