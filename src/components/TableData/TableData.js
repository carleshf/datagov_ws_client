import React, { Component } from 'react'


import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const autoBind = require('auto-bind')

function preventDefault(event) {
  event.preventDefault();
}

class TableData extends Component {
    constructor( props ) {
      super( props )
      this.state = { section: props.section, options: [], page: 1, cnt: 20 }
      autoBind( this )
    }

    componentDidMount() {
      this.gatherTable(this.state.section)
    }

    componentDidUpdate( prevProps ) {
      if(this.props.section !== prevProps.section) {
        this.setState({ section: this.props.section })
        this.gatherTable(this.props.section)
      }
    }

    gatherTable = (table) => {
      var headers = new Headers()
      headers.append("Content-Type", "application/json")

      var format = JSON.stringify({
        "pageNum": this.state.page,
        "pageSize": this.state.cnt
      })

      var options = { method: 'POST',
        headers: headers,
        body: format
      }

      var url = ''
      switch(table) {
        case 'projects':
          url = 'http://localhost:5000/api/project'
          break
        case 'issues':
          url = 'http://localhost:5000/api/issue'
          break
        case 'samples':
          url = 'http://localhost:5000/api/sample'
          break
        case 'configurations':
          url = 'http://localhost:5000/api/configuration'
          break
        default:
            url = ''
            break
      }

      if(url === '') {
        this.setState({ options: [] })
      } else {
        fetch(url, options)
          .then(response => response.json())
          .then(result => {
            if(!result.data.error) {
              this.setState({ options: result.data.rst })
            }
          })
          .catch(error => {
            this.setState({ options: [] })
            console.log('error', error.toString())
          })
      }
    }

    mapTitle = (section) => {
      switch(section) {
        case 'projects':
          return 'Projects'
        case 'configurations':
          return 'Configurations'
        case 'issues':
          return 'Issues'
        default:
          return ''
      }
    }

    renderProjects = () => {
      return (
          <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
            { this.mapTitle(this.state.section) }
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Acronym</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.options.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.acronym}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.active}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div>
              <Link color="primary" href="#" onClick={ preventDefault }>
                See more orders
              </Link>
            </div>
        </React.Fragment>
      )
  }

  renderConfigurations = () => {
    return (
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
        { this.mapTitle(this.state.section) }
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Acronym</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.options.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.acronym}</TableCell>
                <TableCell>{row.url}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div>
          <Link color="primary" href="#" onClick={ preventDefault }>
            See more orders
          </Link>
        </div>
    </React.Fragment>
  )
  }

  renderIssues = () => {

  }

    render = () => {
      switch(this.state.section) {
        case 'projects':
          return this.renderProjects()
        case 'configurations':
            return this.renderConfigurations()
        case 'issues':
            return this.renderIssues()
        default:
            return ''
    }
      
    }
}

export default TableData