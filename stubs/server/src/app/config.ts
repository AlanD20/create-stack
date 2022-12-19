import nconf from 'nconf'

nconf.env().argv().file('/config.json')

const config = {};

export default config;
