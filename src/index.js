import React from 'react';
import ReactDOM from 'react-dom';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state  ={
            error: null,
            isLoaded: false,
            items: {}
        };
    }

    componentDidMount() {
        fetch("http://api.openweathermap.org/data/2.5/weather?q=minneapolis&units=imperial&appid=67975210d69828dd5fa681b6216543d0")
        //fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        }
        else if (!isLoaded) {
            return <div>Loading...</div>
        }
        else {
            return(
                //The real Weather block code
                <div className="col-md-6">
                    { items.main.temp }
                </div>
            );
        }
    }
}

ReactDOM.render(
    <Weather/>,
    document.getElementById("root")
);