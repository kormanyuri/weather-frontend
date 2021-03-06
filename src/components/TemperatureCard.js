/**
 * Created by korman on 06.09.18.
 */
import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

import Config from '../Config';


export default class TemperatureCard extends Component {
    constructor(props) {
        super(props);
        const config = new Config();

        this.state = {
            temperature: '',
            progress: {
                display: 'none'
            },
            config: config
        };

        this.getTemperature = this.getTemperature.bind(this);

        console.log('constructor: ', props);
    }

    getTemperature(e, cityId){

        this.setState({
            progress: {
                display: 'block'
            }
        });

        axios.get(this.state.config.backendUrl + 'weather/temperature', {
            params: {
                city_id: cityId
            }
        })
            .then(response => {
                this.setState({
                    temperature: (response.data.weather_data.list[cityId].main.temp - 273.15).toFixed(2),
                    progress: {
                        display: 'none'
                    }
                });
            })
            .catch(error => {
                //TODO: show error
            });
    }

    render() {

        const {cityId, city} = this.props;

        return (
            <div>
                <Button
                    variant="outlined"
                    color="primary"
                    style={{width: '200px', marginBottom: '20px', marginTop: '20px'}}
                    onClick={(e, id) => this.getTemperature(e, cityId)}
                >
                    {city}
                    <CircularProgress size={20} style={this.state.progress}/>
                </Button>


                <Chip label={this.state.temperature ? this.state.temperature + ` C°` : ``} style={{marginLeft: '10px'}} variant="outlined" />

                <Divider/>
            </div>
        );
    }
}