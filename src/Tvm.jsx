import React from 'react';
import PropTypes from 'prop-types';
import Finance from 'tvm-financejs';

class Variable extends React.Component {

    compute = () => {
     
        this.props.compute(this.props.name);
    }

    render() {

        return (

            <div>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                
                <input id={this.props.name} 
                    type='text'
                    name={this.props.name} 
                    value={this.props.variables[this.props.name]}
                    onChange={this.props.onChange} />
                
                <button onClick={this.compute}>Compute</button>
            </div>
        );
    }
}

class Tvm extends React.Component {

    state = {
        variables: {
            pv: '',
            fv: '',
            rate: '',
            nper: ''
        }
    }

    roundOffNumber = (num) => {

        return Math.round(num * 100)/ 100;
    }

    compute = (name) => {

        let finance = new Finance();

        let value = '';


        switch(name) {

            case 'pv': 
                value = this.roundOffNumber(
                    finance.PV(this.state.variables.rate / 100 , this.state.variables.nper, null, this.state.variables.fv)
                );
                break;

            case 'fv': 
                value = this.roundOffNumber(
                    finance.FV(this.state.variables.rate / 100 , this.state.variables.nper, null, this.state.variables.pv)
                );
                break;

            case 'rate': 
                value = finance.RATE(this.state.variables.nper, null, this.state.variables.pv, this.state.variables.fv);

                let value2 = finance.RATE('10', 0, '100', '1000', null, null);
                
                console.log(value);
                console.log(value2);
                console.log(this.state.variables);
                break;
            
            case 'nper':

                value = finance.NPER(this.state.variables.rate / 100, null, this.state.variables.pv, this.state.variables.fv);
                
                break;
        }

        let variables = Object.assign({}, this.state.variables);

        variables[name] = value;

        this.setState({variables: variables});
    }

    onChange = (evt) => {

        let variables = Object.assign({}, this.state.variables);

        variables[evt.target.name] = evt.target.value;

        this.setState({variables: variables});
    }

    render() {

        return (

            <div>

                <h1>Time Value Of Money Calculator</h1>

                <Variable name='pv'
                    label='Present Value'
                    onChange={this.onChange}
                    compute={this.compute}
                    variables={this.state.variables} />
                
                <Variable name='fv'
                    label='Future Value'
                    onChange={this.onChange}
                    compute={this.compute}
                    variables={this.state.variables} />
                
                <Variable name='rate'
                    label='Annual Rate'
                    onChange={this.onChange}
                    compute={this.compute}
                    variables={this.state.variables} />

                <Variable name='nper'
                    label='No. of Years'
                    onChange={this.onChange}
                    compute={this.compute}
                    variables={this.state.variables} />

            </div>
        );
    }
}

    
export default Tvm;