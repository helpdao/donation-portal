import React from 'react'
import TextField from '@material-ui/core/TextField';


export default class RegistrationForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
              name: '',
              description: '',
              inviteLink:'',
              errormessage: ''
            };
          }
          myChangeHandler = (event) => {
            let nam = event.target.name;
            let val = event.target.value;
            this.setState({[nam]: val});
          }
          mySubmitHandler = (event) => {
            console.log("Validating...")
            //event.preventDefault();
            let name = this.state.name;
            let inviteLink = this.state.inviteLink;
            let description = this.state.description;
            if (name.length === 0) {
              this.setState({['errormessage']:"The name is mandatory"});
            }
            if (inviteLink.length === 0) {
                this.setState({['errormessage']:"The inviteLink is mandatory"});
            }
              if (description.length < 100) {
                this.setState({['errormessage']:"You can do it better, use at least 100 chars to the Description"});
            }                          
            if(!RegExp(/^(chat\.whatsapp\.com\/invite\/|t\.me\/|http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/).test(inviteLink)){
                this.setState({['errormessage']:"Invalid Invite Link"});
            }
            if(this.state.errormessage.length === 0){
                this.props.callback({name:this.state.name, description:this.state.description, inviteLink:this.state.inviteLink})
            }else{
                this.props.callback(null)
            }
            console.log("iviteLink: " + inviteLink + ": " +  RegExp(/^(chat\.whatsapp\.com\/invite\/|t\.me\/|http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/).test(inviteLink))
          }
          render() {
            return (
                <form id='form' autoComplete='off'>
                <TextField
                    id='name'
                    label='Squad Name'
                    required
                    onChange={(evt) => this.myChangeHandler(evt)}
                />
                <TextField
                    id='inviteLink'
                    label='Chat Invite Link'
                    required
                    onChange={(evt) => this.myChangeHandler(evt)}

                />

                <TextField
                    id='description'
                    label="Write somenthing about your Squad, use at least 200 characters."
                    required
                    multiline
                    rows={20}
                    rowsMax={20}
                    onChange={(evt) => this.myChangeHandler(evt)}
                />
             <p >{this.state.errormessage}</p>
            </form>
            );
          }
  }