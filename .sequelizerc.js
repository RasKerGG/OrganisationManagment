const path = require("path");

module.exports = {
    'config': path.resolve('src/config', 'config.json'),
    'models-path': path.resolve('src', 'models'),
    'seeders-path': path.resolve('src', 'seeders'),
    'migrations-path': path.resolve('src', 'migrations'),
}