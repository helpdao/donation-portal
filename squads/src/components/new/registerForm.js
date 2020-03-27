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
    onSubmitHandler = () => {
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
            <form id="form">
                {this.state.nameError.length === 0 ? '':<Alert severity="error"> {this.state.nameError} — check it out!</Alert>}
                {this.state.inviteLinkError.length === 0 ? '':<Alert severity="error">{this.state.inviteLinkError} — check it out!</Alert>}
                {this.state.descriptionError.length === 0 ? '':<Alert severity="error">{this.state.descriptionError} — check it out!</Alert>}
                <TextField
                    required
                    className={styles.fieldStyles}
                    label="Squad name"
                    name="Squad name"
                    onChange={(evt) => this.setState({name:evt.target.value})}
                />
                <TextField
                    required
                    label="Invite Link"
                    name="Invite Link"
                    onChange={(evt) => this.setState({inviteLink:evt.target.value})}
                />
                <div class="textRight">
                <Button id="previewMD"variant="contained" size="small" color="primary" onClick={this.openDialog.bind(this)}>Preview MD</Button>                
                </div>                
                <TextField
                    required
                    label="Tell somenthing about your squad, you can use MarkDown!"
                    name="Description"
                    margin='normal'
                    multiline
                    rows={20}
                    variant="outlined"
                    onChange={(evt) => this.setState({description:evt.target.value})}
                /> 

                <Button
                    id='next'
                    variant='outlined'
                    color='secondary'

                    onClick={this.onSubmitHandler}
                >
                    Next
                </Button>                
            </form>
            <Dialog maxWidth='lg' fullWidth={true} open={this.state.open} onClose={this.closeDialog.bind(this)}>
                <DialogContent>
                    <div id="mdInterpreter">
                        <ReactMarkdown source={this.state.description} />
                    </div>
                </DialogContent>
            </Dialog>         
            </div>
        );
    }
}