import React from 'react';
//you could skip "import" and use "require" if the reference is not being used:
require('./styles/main.less');

const Hello = React.createClass({
    render () {
        return <div>Hello, {this.props.name}</div>;
    }
});

React.render(<Hello name="Roy"/>, document.body);