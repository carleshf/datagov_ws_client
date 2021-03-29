import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import AddIcon from '@material-ui/icons/Add'
import FormControl from '@material-ui/core/FormControl'

const autoBind = require('auto-bind')
class New extends Component {
    constructor( props ) {
		super( props )
		this.state = { section: props.section, validState: 0, validMsg: '',
            project_acronym : '', project_title: '', project_description: '', project_active: true,
            config_acronym: '', config_url: '', config_description: '',
            issue_acronym: '', issue_url: '', issue_comments: '', issue_completed: false, issue_completition: '', issue_project_options: [], issue_project: ''
        }
        autoBind( this )
    }

    componentDidMount = () => {
        let url = 'http://localhost:5000/api/project'
        var headers = new Headers()
        headers.append("Content-Type", "application/json")

        var format = JSON.stringify({
            "pageNum": 1,
            "pageSize": 1000
        })
        var options = { method: 'POST',
            headers: headers,
            body: format
        }
        fetch(url, options)
          .then(response => response.json())
          .then(result => {
            if(!result.data.error) {
                this.setState({ issue_project_options: result.data.rst })
            }
          })
          .catch(error => {
            this.setState({ issue_project_options: [] })
            console.log('error', error.toString())
          })
    }

    componentDidUpdate = ( prevProps ) => {
        if(this.props.section !== prevProps.section) {
            this.setState({ section: this.props.section })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        var url = ''
        var headers = new Headers()
        headers.append("Content-Type", "application/json")
        var body = {}
        var options = {}
        var word = ''
        
        // Prepare sending package
        if(this.state.section === 'project') {
            let acronym = this.state.project_acronym.trim()
            let title = this.state.project_title.trim()
            let descr = this.state.project_description.trim()
            word = 'project'
            
            if(acronym.length < 2) {
                this.setState({ validState: 2, validMsg: 'Acronym must have at last 2 characters'})
                return false
            }
    
            if(title.length < 5) {
                this.setState({ validState: 2, validMsg: 'Title must have at last 5 characters'})
                return false
            }
    
            body = JSON.stringify({
                "acronym": acronym,
                "title": title,
                "description": descr,
                "active": this.state.active
            })
            options = { method: 'PUT',
                headers: headers,
                body: body
            }
            url = 'http://localhost:5000/api/project'
        } else if(this.state.section === 'configuration') {
            let acronym = this.state.config_acronym.trim()
            let curl = this.state.config_url.trim()
            let descr = this.state.config_description.trim()
            word = 'configuration'
            
            if(acronym.length < 2) {
                this.setState({ validState: 2, validMsg: 'Acronym must have at last 2 characters'})
                return false
            }
    
            if(curl.length < 5) {
                this.setState({ validState: 2, validMsg: 'URL must have at last 5 characters'})
                return false
            }

            body = JSON.stringify({
                "acronym": acronym,
                "url": curl,
                "description": descr
            })
            options = { method: 'PUT',
                headers: headers,
                body: body
            }
            url = 'http://localhost:5000/api/configuration'
        }

        if(url === '') {
            return false
        }

        fetch(url, options)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                this.setState({ validState: 1, validMsg: 'The new ' + word + ' was added into the data base', project_acronym: '', prject_title: '', project_dscription: '', config_acronym: '', config_url: '', config_description: '' })
            })
            .catch(error => console.log('error', error.toString()));
        
        return false
    }

    handleClose = (event) => {
        this.setState({ validState: 0, validMsg: '' })
    }

    newProject = () => {
        return(
            <form onSubmit={ this.handleSubmit }>
                <Snackbar open={ this.state.validState > 0 } autoHideDuration={ 6000 } onClose={ this.handleClose }>
                    <Alert onClose= { this.handleClose } severity={ this.state.validState === 1 ? "success" : "error" }>
                        { this.state.validMsg }
                    </Alert>
                </Snackbar>
                <Grid container spacing={3} justify="flex-end">
                    <Grid item xs={12} sm={3}>
                        <TextField id="acronym-input" name="acronym" label="Acronym" type="text" style={{ width: "100%" }} onChange={ (event) => {this.setState({ project_acronym: event.target.value })} } />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TextField id="title-input" name="title" label="Title" type="text" style={{ width: "100%" }} onChange={ (event) => {this.setState({ project_title: event.target.value })} } />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField id="description-input" name="description" label="Description" multiline rows={4} style={{ width: "100%" }} onChange={ (event) => {this.setState({ project_description: event.target.value })} } />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ToggleButton value="check" selected={ this.state.project_active } onChange={() => { this.setState({ project_active: !this.state.project_active }) }}>{ this.state.project_active ? <CheckBoxIcon />: <CheckBoxOutlineBlankIcon /> }{ " " }Active</ToggleButton>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button variant="contained" color="primary" type="submit"><AddIcon /> Add new project</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }

    newConfiguration = () => {
        return(
            <form onSubmit={ this.handleSubmit }>
                <Snackbar open={ this.state.validState > 0 } autoHideDuration={ 6000 } onClose={ this.handleClose }>
                    <Alert onClose= { this.handleClose } severity={ this.state.validState === 1 ? "success" : "error" }>
                        { this.state.validMsg }
                    </Alert>
                </Snackbar>
                <Grid container spacing={3} justify="flex-end">
                    <Grid item xs={12} sm={3}>
                        <TextField id="acronym-input" name="acronym" label="Acronym" type="text" style={{ width: "100%" }} onChange={ (event) => {this.setState({ config_acronym: event.target.value })} } />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TextField id="url-input" name="url" label="URL" type="text" style={{ width: "100%" }} onChange={ (event) => {this.setState({ config_url: event.target.value })} } />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField id="description-input" name="description" label="Description" multiline rows={4} style={{ width: "100%" }} onChange={ (event) => {this.setState({ config_description: event.target.value })} } />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button variant="contained" color="primary" type="submit"><AddIcon /> Add new configuration</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }

    newIssue = () => {
        /*var projects = <Select value={ this.state.issue_project } onChange={ (event) => {this.setState({ issue_project: event.target.value })} } >
        <MenuItem value=""></MenuItem>

        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
    </Select>*/
        return(
            <form onSubmit={ this.handleSubmit }>
                <Snackbar open={ this.state.validState > 0 } autoHideDuration={ 6000 } onClose={ this.handleClose }>
                    <Alert onClose= { this.handleClose } severity={ this.state.validState === 1 ? "success" : "error" }>
                        { this.state.validMsg }
                    </Alert>
                </Snackbar>
                <Grid container spacing={3} justify="flex-end">
                    <Grid item xs={12} sm={3}>
                        <TextField id="acronym-input" name="acronym" label="Acronym" type="text" style={{ width: "100%" }} onChange={ (event) => {this.setState({ issue_acronym: event.target.value })} } />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TextField id="url-input" name="url" label="URL" type="text" style={{ width: "100%" }} onChange={ (event) => {this.setState({ issue_url: event.target.value })} } />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField id="comments-input" name="comments" label="Comments" multiline rows={4} style={{ width: "100%" }} onChange={ (event) => {this.setState({ issue_comments: event.target.value })} } />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ToggleButton value="check" selected={ this.state.issue_completed } onChange={() => { this.setState({ issue_completed: !this.state.issue_completed }) }}>{ this.state.issue_completed ? <CheckBoxIcon />: <CheckBoxOutlineBlankIcon /> }{ " " }Completed</ToggleButton>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField id="completition-input" label="Completition"  type="datetime-local" defaultValue="2015-10-21T04:29" style={{ width: "100%" }} onChange={ (event) => {this.setState({ issue_completition: event.target.value })} } />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl>
                            <InputLabel id="project-label">Project</InputLabel>
                            <Select value={ this.state.issue_project } onChange={ (event) => {this.setState({ issue_project: event.target.value })} } >
                                {this.state.issue_project_options.map((x) => {
                                    return <MenuItem value={ x.id }>{ x.acronym }</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button variant="contained" color="primary" type="submit"><AddIcon /> Add new configuration</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }

    render = () => {
        switch(this.state.section) {
            case 'project':
                return this.newProject()
            case 'configuration':
                return this.newConfiguration()
            case 'issue':
                return this.newIssue()
            default:
                return ''
        }
    }
}

export default New