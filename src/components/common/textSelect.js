"use strict";

var React = require('react');

var Select = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string 
    },

    render: function() {
        var createOption = function(option) {
            return (
                <option value={option.value}>{option.firstName} {option.lastName}</option>
            );
        };

        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " " + 'has-error';
        }

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <select 
                        name={this.props.name}
                        className="form-control"
                        ref={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}>
                        {this.props.options.map(createOption, this)}
                    </select>
                    <div className="input">{this.props.error}</div>
                </div>
            </div>
        );
    }
});

module.exports = Select;