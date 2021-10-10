import React from 'react';
import TvmCalculator from 'tvm-calculator';

class Variable extends React.Component {


    compute = () => {
     
        this.props.compute(this.props.name);
    }

    render() {

        return (

            <div className="flex my-4 px-2 py-4">

                <label htmlFor={this.props.name} 
                    className='text-right flex-initial w-1/4 p-2'>
                    {this.props.label}
                </label>
                
                <input id={this.props.name} 
                    type='number'
                    name={this.props.name} 
                    value={this.props.variables[this.props.name]}
                    onChange={this.props.onChange} 
                    className='focus:bg-yellow-100 rounded-md flex-auto border-2 border-solid p-2' />
                
                <button onClick={this.compute} 
                    className='bg-purple-200 shadow rounded-md w-28 mx-2 border-indigo-100 border-solid border-2'>
                    Compute
                </button>

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

        if(name == 'pv') {
            value = TvmCalculator.calcPV(this.state.variables);
        }
        else if (name == 'fv') {
            value = TvmCalculator.calcFV(this.state.variables);
        }
        else if (name == 'rate') {
            value = TvmCalculator.calcInterestRate(this.state.variables);
        }
        else if(name == 'nper') {
            value = TvmCalculator.calcNPer(this.state.variables);
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

            <div className="bg-gradient-to-r from-white to-gray-100 border-solid border-4 px-6 py-4 rounded-lg">

                <h1 className="font-bold text-4xl my-4 text-center">
                    Time Value Of Money <small className="text-lg font-light text-gray-500 block">Calculator</small>
                </h1>

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