import React from 'react';
// import PropTypes from 'prop-types';
// import Finance from 'tvm-financejs';
import TvmCalculator from 'tvm-calculator';

class Variable extends React.Component {

    compute = () => {
     
        this.props.compute(this.props.name);
    }

    render() {

        return (

            <div>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                
                <input id={this.props.name} 
                    type='number'
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
            nper: '',
            pmt: 0,
            cf: 1,
            pf: 1
        }
    }


    compute = (name) => {

        let value = '';

        switch(name) {

            case 'pv': 
                value = TvmCalculator.calcPV(this.state.variables);
                break;

            case 'fv': 
                value = TvmCalculator.calcFV(this.state.variables);
                break;

            case 'rate': 
                value = TvmCalculator.calcInterestRate(this.state.variables);
                break;
            
            case 'nper':
                value = TvmCalculator.calcNPer(this.state.variables);
                break;
        }

        let variables = Object.assign({}, this.state.variables);

        variables[name] = value;

        this.setState({variables: variables});
    }

    onChange = (evt) => {

        let variables = Object.assign({}, this.state.variables);

        let value = parseFloat(evt.target.value);


        variables[evt.target.name] = value;

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