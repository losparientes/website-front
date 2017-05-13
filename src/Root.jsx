import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

const Root = ({ store }) => (
    <Provider store={store}>
        <div>Hello, Los Parientes</div>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.shape({
        matchStreaming: PropTypes.shape(),
    }).isRequired,
};

export default Root;
