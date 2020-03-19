const express = require('express');
const { apps, keystone } = require('./index');

keystone
    .prepare({
        apps,
        dev: process.env.NODE_ENV !== 'production',
    })
    .then(async ({ middlewares }) => {
        await keystone.connect();
        const app = express();
        app.use('/files', express.static('files'));
        app.use(middlewares);
        app.listen(process.env.PORT || 3000);
    });