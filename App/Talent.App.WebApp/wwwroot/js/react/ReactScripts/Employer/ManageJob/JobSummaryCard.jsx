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
                <Card>  
                   <Card.Content>
                        <Card.Header>{this.props.title}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{this.props.location.country}, {this.props.location.city}</span>
                        </Card.Meta>
                        <Card.Description>
                            {this.props.summary}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            22 Friends
                       </a>
                    </Card.Content> 
                </Card>
            )
                
               
        
    }
}