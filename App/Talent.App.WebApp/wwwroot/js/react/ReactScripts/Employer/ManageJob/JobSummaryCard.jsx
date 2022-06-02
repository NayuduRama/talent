import React from 'react';
import Cookies from 'js-cookie';
import { Popup, Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card } from 'semantic-ui-react';
import moment from 'moment';


export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props); 
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }

    render() {
        return (
            <div>
                <h3>{this.props.title}</h3>
                <p>{this.props.location.country}, {this.props.location.city}</p> 
                <p>{this.props.summary}</p>
            </div>
            )
        
    }
}