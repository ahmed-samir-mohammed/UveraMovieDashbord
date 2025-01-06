module.exports = function(config) {
    config.set({
        frameworks: ['mocha'],
        files: [
            'src/**/*.js',
            'test/**/*.spec.js'
        ],
        browsers: ['Chrome'],
        plugins: [
            'karma-mocha',
            'karma-chrome-launcher'
        ],
        singleRun: true
    });
};