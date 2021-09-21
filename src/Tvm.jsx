import React from 'react';
import PropTypes from 'prop-types';
import Finance from 'tvm-financejs';

class Tvm extends React.Component {

    state = {
        pv: '',
        fv: '',
        nper: '',
        rate: ''
    }

    roundOffNumber = (num) => {

        return Math.round(num * 100)/ 100;
    }

    compute = () => {

        let finance = new Finance();

        let pv = finance.PV(this.state.rate/100 , this.state.nper, null, this.state.fv);

        this.setState({pv: this.roundOffNumber(pv)});
    }

    onChange = (evt) => {

        let name = evt.target.name;

        var pv = {};

        pv[name] = evt.target.value

        this.setState(pv);
    }

    render() {

        return (

            <div>

                <h1>Time Value Of Money Calculator</h1>

                <div>
                    <label htmlFor='pv'>Present Value</label>
                    
                    <input id='pv' 
                        type='number'
                        name='pv' 
                        value={this.state.pv}
                        onChange={this.onChange} />

                    <button onClick={this.compute}>Compute</button>
                </div>

                <div>
                    <label htmlFor='fv'>Future Value</label>
                    
                    <input id='fv' type='number' name='fv' value={this.state.fv} onChange={this.onChange} />

                    <button>Compute</button>
                </div>

                <div>
                    <label htmlFor='rate'>Annual Rate</label>
                    
                    <input id='rate' type='number' name='rate' value={this.state.rate} onChange={this.onChange} />

                    <button>Compute</button>
                </div>

                <div>
                    <label htmlFor='nper'>No. of Years</label>
                    
                    <input id='nper' type='number' name='nper' value={this.state.nper} onChange={this.onChange} />

                    <button>Compute</button>
                </div>

            </div>
        );
    }
}

    
export default Tvm;