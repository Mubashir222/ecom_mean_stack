const { createTransport } = require('nodemailer');

const smtpConfig = {
	service: 'gmail',
    port: 8000,
    secure: false, // use SSL
    auth: {
        user: '34827@gcslahore.edu.pk',
        pass: 'lggvcessgxsydbok'
    }
    // auth: {
    //     user: 'info@livex.tech',
    //     pass: 'Umt@7788'
    // }
};
// export const transport = nodemailer.createTransport(smtpConfig);
const transport = createTransport(smtpConfig);

module.exports = transport;