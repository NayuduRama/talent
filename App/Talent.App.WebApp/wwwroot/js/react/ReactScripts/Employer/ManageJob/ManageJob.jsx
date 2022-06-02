import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, Card } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
     
    constructor(props) {
        super(props);
        let loader = loaderData; 
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = { 
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
       
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this); 
        this.updateWithoutSave = this.updateWithoutSave.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        this.loadData(() =>
           this.setState({ loaderData })
        )
        
        console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
    };

    loadData(callback) { 
        var cookies = Cookies.get('talentAuthToken'); 
       // your ajax call and other logic goes here
        $.ajax({
            url: 'http://localhost:51689/listing/listing/getEmployerJobs',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let myjobsdata = [];

                if (res.myJobs) {
                    myjobsdata = res.myJobs;
                    console.log("myjobsdata", myjobsdata);
                    this.setState({ loadJobs: res.myJobs });
                    console.log(this.state.loadJobs);
                } else {
                    console.log("error")
                }
                //this.updateWithoutSave(myjobsdata)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        //this.init()
    }

    //updates component's state without saving data
    updateWithoutSave(newData) {
        let newSD = Object.assign({}, this.state.loadJobs, newData)
        this.setState({
            loadJobs: newSD
        })
        console.log("updated jobs", this.state.loadJobs );
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <h2>List of Jobs </h2>
                    <div style={{ 'display': 'flex' }, {'flexDirection': 'column' }}>


                    {(this.state.loadJobs.length) ?


                        (this.state.loadJobs.map((job) => (
                            <JobSummaryCard
                                key={job.id}
                                title={job.title}
                                summary={job.summary}
                                location={job.location}

                            />
                        ))

                        )
                        :
                        <h2> No Active Jobs</h2>}

                   </div>
                    
                </div>
            </BodyWrapper>
        )
    }
}