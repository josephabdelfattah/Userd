import React from 'react';
import PageHeader from '../PageHeader';
import SearchBar from '../SearchBar';
import TableData from '../TableData';
import TableHeader from '../TableHeader';
import getEmployeeName from "../../util/API";



export default class TableArea extends React.Component {


    state = {
        search: "name",
        employees: []
    };
    // last search is staying on page
    componentDidMount = () => {
        this.loadEmployees();
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(
            {
                [name]: value
            }
        )
    }

    loadEmployees = () => [
        getEmployeeName()
            .then((response) => {
                console.log(response);
                this.setState(
                    {
                        // API returns "results" 
                        employees: response.data.results
                    }
                )

            })
            .catch((err) => {
                console.log(err);
            })
    ]


    // Working, but last search is not staying on page
    searchEmployee = () => [
        getEmployeeName()
            .then((response) => {

                console.log(response);

                let filter = this.state.search;

                let filteredList = response.data.results.filter(item => {
                    // merge data together, then see if user input is anywhere inside  
                    let values = Object.values(item.name.first)
                        .join("")
                        .toLowerCase();
                    return values.indexOf(filter.toLowerCase()) !== -1;
                });

                this.setState(
                    {
                        employees: filteredList
                    }
                )

            })
            .catch((err) => {
                console.log(err);
            })
    ]




    handleInputSubmit = (event) => {
        event.preventDefault();
        console.log("stuff");
        // const BASEURL = "https://randomuser.me/api/?results=200&nat=us";

        // const BASEURL = "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole";

        this.searchEmployee();

    }
    SortByName = (e) => {
        function handleClick(e) {
            e.preventDefault();
            console.log('The link was clicked!');
        }
    }
    render() {
        return (
            <div className="wrapper" >

                <PageHeader />

                <SearchBar
                    search={this.state.search}
                    handleInputChange={this.handleInputChange}
                    handleSubmit={this.handleInputSubmit}
                />

                {/* <TableHeader /> */}
                <TableHeader SortByName={this.SortByName} />
                <TableData
                    employees={this.state.employees}
                />

            </div>
        );
    }

}
