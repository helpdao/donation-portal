import React from 'react'
import {TextField, Button} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { findSquad } from "../../requests"
import ReactMarkdown from 'react-markdown'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

const styles = makeStyles({
  fieldStyles: {    
    padding: '20px',   
  },
});

let inviteLinkRegex = RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?(t\.me\/|chat\.whatsapp\.com)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/, "i");
export default class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            inviteLink:'',
            description:'',
            nameError:'',
            descriptionError:'',
            inviteLinkError:'',
            requestError:'',
            open:false
                }    
            this.handleChange = this.handleChange.bind(this)
        }
    mdTutorial(){
        return ('# What is MD?\n'+
        '**Markdown** was initially created by *John Gruber*\n'+
        'as a simple way for non-programming types to write in an easy-to-read format that could be converted directly into HTML.\n' +
        '#### You can learn how to use it [here](https://www.markdowntutorial.com/)'
        )
    }
    handleChange(evt){
        this.setState({[evt.target.name]:evt.target.value})
    }
    openDialog() {
        this.setState({ open: true });
    }    
    closeDialog() {
        this.setState({ open: false });
    }    
    checkName(){
        return new Promise((resolve, reject) => {
            findSquad({name:this.state.name}).then((response) =>{
                console.log("Valid Name?")
                console.log(response)
                if(response.data.squads.length === 0){
                    Promise.resolve(this.setState({nameError:''})).then(() =>  resolve());
                }else{
                    let error = 'This name is in use, you need to choose a different Squad Name'
                    Promise.resolve(this.setState({nameError:error})).then(() =>  reject(error));
                }
            }).catch((err) => {
                let error = "Somenthing goes wrong. Try it again in a while"
                Promise.resolve(this.setState({requestError:error})).then(() => reject(error))
            })
        });
    }
    valideInviteLink(){
        return new Promise((resolve, reject) => {
            if(this.state.inviteLink.length === 0){
                let error = 'You need to provide an invitation link.'
                Promise.resolve(this.setState({inviteLinkError:error})).then(() =>  reject(error));
               
            }
            else if(!inviteLinkRegex.test(this.state.inviteLink)){
                let error = 'You need to provide a valid invitation link.'
                Promise.resolve(this.setState({inviteLinkError:error})).then(() =>  reject(error));
            }
            else
                Promise.resolve(this.setState({inviteLinkError:''})).then(() =>  resolve());
        });
    }
    validateName(){
        return new Promise((resolve, reject) => {
            if(this.state.name.length === 0){
                let error = 'You need to provide Squad name'
                Promise.resolve(this.setState({nameError:error})).then(() =>  reject(error));
            }
            else
                Promise.resolve(this.setState({nameError:''})).then(() =>  resolve());
        });        
    }
    validateDescription(){
        return new Promise((resolve, reject) => {
            if(this.state.description.length === 0){
                let error = 'You need to provided a description'
                Promise.resolve(this.setState({descriptionError:error})).then(() =>  reject(error));
            }
            else
                Promise.resolve(this.setState({descriptionError:''})).then(() =>  resolve());
        });        
    }
    sendData(){
        this.props.parentCallback(this.state)
    }
    validateAll = () => {
        this.validateName()
        .then((data) => {
            return this.checkName()
        }).then((data) => {
            return this.valideInviteLink()
        }).then((data) => {
            return this.validateDescription()
        }).then((data) => {
            return this.sendData()
        })
        .catch(err => console.log(err))

    }
    render(){

        return(
            <div>
            <div >
                {this.state.nameError.length === 0 ? '':<Alert severity="error"> {this.state.nameError} — check it out!</Alert>}
                {this.state.inviteLinkError.length === 0 ? '':<Alert severity="error">{this.state.inviteLinkError} — check it out!</Alert>}
                {this.state.descriptionError.length === 0 ? '':<Alert severity="error">{this.state.descriptionError} — check it out!</Alert>}
            <div className="form-group">
                <label className="zilla" for="squadName">Squad Name</label>
                <input  
                    name="name"
                    type="text"
                    className="form-control"
                    id="squadName"
                    aria-describedby="squadNameHelp"
                    onChange={evt => {this.handleChange(evt)}} 
                />
                <small id="squadNameHelp" className="form-text text-muted">Remember that the name must be unique.</small>
            </div>
            <div className="form-group">
                <label className="zilla" for="inviteLink">Invite Link</label>
                <input 
                type="text"
                className="form-control"
                id="inviteLink"
                aria-describedby="inviteLinkHelp"
                name="inviteLink"
                onChange={(evt) => this.handleChange(evt)}
                />
                <small id="inviteLinkHelp" className="form-text text-muted">Add the chat group link.</small>
            </div>
            <div className="form-group">
            <label className="zilla" for="descriptionHelp">Tell something about your squad, you can use <a className="red" href="https://www.markdowntutorial.com/" target="_blank">MarkDown!</a></label>
                <textarea
                rows="20"
                className="form-control"
                id="descriptionHelp"
                name="description"
                onChange={(evt) => this.handleChange(evt)}
                />
            </div>
            <div className="row">
                <div className="col-6">
                    <button  type="button" className="btn btn-lg hdaoBtnContrast"  data-toggle="modal" data-target="#exampleModalScrollable">Preview MD</button>                
                </div>
                <div className="col-6 text-right">
                    <button  onClick={this.validateAll} className="btn hdaoBtn btn-lg">Next</button>                
                </div>                
            </div>          
            </div>
            <div className="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                <div className="modal-body">
                    <ReactMarkdown source={this.state.description.length === 0 ? this.mdTutorial():this.state.description}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn hdaoBtnContrast" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>        
            </div>
        );
    }
}