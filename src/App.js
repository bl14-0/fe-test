import React, { Component } from 'react';
import Axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1.00,
            base: '',
            date: '',
            rates: [],
            descriptions: [],
            lists: ['IDR', 'EUR', 'GBP', 'SGD'],
            hidden: true,
            addCurrency: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        Axios.get('https://exchangeratesapi.io/api/latest?base=USD')
            .then(result => {
                this.setState({
                    base: result.data.base,
                    date: result.data.date,
                    rates: result.data.rates,
                    descriptions: this.currenciesLongDescription()
                });
            })
            .catch(error => {
                alert(error);
            });
    }

    // Handler function
    handleInputChange(event) {
        let reg = /^[0-9.]+$/;

        if(reg.test(event.target.value))
        {
            this.setState({
                value: event.target.value
            });
        }
    }

    handleButtonClick(event) {
        this.setState({
            hidden: !this.state.hidden
        });
    }

    handleMinusClick(list) {
        let arr = this.state.lists.filter(item => item !== list);
        this.setState({
            lists: arr
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        let arr = this.state.lists;
        let newValue = this.addCurrency.value;

        if(arr.indexOf(newValue) >= 0)
        {
            alert('The currency already in the list.');
        }
        else if(isNaN(this.state.rates[`${newValue}`]))
        {
            alert('The currency not in API.');            
        }
        else
        {
            arr.push(newValue);
            this.setState({
                lists: arr,
                hidden: !this.state.hidden
            });
        }
    }

    // Helper function
    currenciesLongDescription() {
        let array = [];
        array['USD'] = 'United states dollar';
        array['EUR'] = 'Euro';
        array['JPY'] = 'Japanese yen';
        array['BGN'] = 'Bulgarian lev';
        array['CZK'] = 'Czech koruna';
        array['DKK'] = 'Danish krone';
        array['GBP'] = 'Pound sterling';
        array['HUF'] = 'Hungarian forint';
        array['PLN'] = 'Polish zloty';
        array['RON'] = 'Romanian leu';
        array['SEK'] = 'Swedish krona';
        array['CHF'] = 'Swiss franc';
        array['ISK'] = 'Icelandic krona';
        array['NOK'] = 'Norwegian krone';
        array['HRK'] = 'Croatian kuna';
        array['RUB'] = 'Russian rouble';
        array['TRY'] = 'Turkish lira';
        array['AUD'] = 'Australian dollar';
        array['BRL'] = 'Brazilian real';
        array['CAD'] = 'Canadian dollar';
        array['CNY'] = 'Chinese yuan renminbi';
        array['HKD'] = 'Hong Kong dollar';
        array['IDR'] = 'Indonesian rupiah';
        array['ILS'] = 'Israeli shekel';
        array['INR'] = 'Indian rupee';
        array['KRW'] = 'South Korean won';
        array['MXN'] = 'Mexican peso';
        array['MYR'] = 'Malaysian ringgit';
        array['NZD'] = 'New Zealand dollar';
        array['PHP'] = 'Philippine piso';
        array['SGD'] = 'Singapore dollar';
        array['THB'] = 'Thai baht';
        array['ZAR'] = 'South African rand';

        return array;
    }

    render() {
        const currencies = this.state.lists.map(
            list => {
                return (
                    <Row key={list} className="box mt-2">
                        <Col>
                            {list} {(this.state.rates[`${list}`] * this.state.value).toLocaleString()}<br/>
                            {list} - {this.state.descriptions[`${list}`]}<br/>
                            1 {this.state.base} = {list} {(this.state.rates[`${list}`]*1).toLocaleString()}
                        </Col>
                        <Col xs={2} className="center" onClick={(e) => this.handleMinusClick(`${list}`)}>
                            <span className="btn">(-)</span>
                        </Col>
                    </Row>
                );
            }
        );

        const add = (
            <span className="btn center" onClick={this.handleButtonClick}>(+) Add More Currencies</span>
        );

        const submit = (
            <span>
                <Form className="mt-2" onSubmit={this.handleSubmit}>
                    <FormGroup row>
                        <Col md={8}>
                            <Input type="text" name="addCurrency" id="addCurrency" placeholder="Add Currency" innerRef={(input) => this.addCurrency = input} autoComplete="off" autoFocus />
                        </Col>
                        <Col md={3}>
                            <Button type="submit" color="success">Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </span>
        );

        return (
            <Container className="mt-2">
                <Row>
                    <Col xs={10} sm={8} md={4} className="box">
                        <Row>
                            <Col className="first_title">{ this.state.base } - <span className="capitalizeEachWord">{ this.state.descriptions[this.state.base] }</span></Col>
                        </Row>
                        <Row>
                            <Col className="second_title">{ this.state.base }</Col>
                            <Col><input type="text" name="value" value={this.state.value} onChange={this.handleInputChange} autoFocus /></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Container>
                                    { currencies }
                                    <Row>
                                        <Col xs={12}>
                                            { this.state.hidden && add }
                                            { !this.state.hidden && submit }
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;