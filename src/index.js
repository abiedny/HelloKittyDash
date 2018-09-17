import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './main.css'
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
        fetch("https://api.openweathermap.org/data/2.5/weather?q=minneapolis&units=imperial&appid=67975210d69828dd5fa681b6216543d0")
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
    getIcon(description, wind) {
        switch (description) {
            case "01d":
            case "01n":
            default:
                if (wind < 20) return "Sunny.png";
                else return "Windy.png";
            case "02d":
            case "02n":
            case "03d":
            case "03n":
                if (wind < 20) return "PartlyCloudy.png";
                else return "Windy.png";
            case "04d":
            case "04n":
            case "50d":
            case "50n":
                if (wind < 20) return "Cloudy.png";
                else return "Windy.png";
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

                    <div className="row" id="wicon">
                        <img src={ this.getIcon( items.weather[0].icon, items.wind.speed ) } alt="Weather Icon" id="weather_icon"></img>
                        <h3 id="temp">{ items.main.temp }° F</h3>
                    </div>

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
        fetch("https://xkcd.now.sh")
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
                <div className="col-md-6">
                    <h1 id="xkcd_title">{ items.title }</h1>
                    <img src={ items.img } alt="XKCD Comic" id="xkcd" />
                    <p>{ items.alt }</p>
                </div>
            );
        }
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