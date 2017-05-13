module.exports = {
    port: 9001,
    host: '127.0.0.1',
    stats: {
        colors: true,
        chunks: false
    },
    proxy: {
        '/api': `http://${process.env.API_HOST}:${process.env.API_PORT}`
    },
    historyApiFallback: true
};
