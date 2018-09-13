import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
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
    getIcon(description) {
        switch (description) {
            case "01d":
            case "01n":
            default:
                return "Sunny.png";
            case "02d":
            case "02n":
            case "03d":
            case "03n":
                return "PartlyCloudy.png";
            case "04d":
            case "04n":
            case "50d":
            case "50n":
                return "Cloudy.png";
            case "09d":
            case "09n":
            case "10d":
            case "10n":
            case "11d":
            case "11n":
                return "Rainy.png";
            case "13d":
            case "13n":
                return "Snowy.png";
        }
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
                    <h1>{ items.name }</h1>
                    <h3>{ items.weather[0].description }</h3>

                    <img src={ this.getIcon( items.weather[0].icon ) } alt="Weather Icon"></img>
                    <h3>{ items.main.temp }</h3>

                    <h2>Details</h2>
                    <p>Wind: { items.wind.speed }mph</p>
                    <p>Humidity: { items.main.humidity }%</p>
                </div>
            );
        }
    }
}

class XKCD extends React.Component {
    constructor(props) {
        super(props);
        this.state  ={
            error: null,
            isLoaded: false,
            items: {}
        };
    }
    componentDidMount() {
        fetch("")
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
}

class Dashboard extends React.Component {
    render() {
        return(
            <div className="row">
                <Weather/>
                <XKCD/>
            </div>
        );
    }
}

ReactDOM.render(
    <Dashboard/>,
    document.getElementById("root")
);