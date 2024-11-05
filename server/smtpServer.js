// smtpServer.js
import { SMTPServer } from 'smtp-server';

// Create the SMTP server
const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, cb) {
        console.log(`onConnect: ${session.id}`);
        cb(); // accpet the connection
    },
    onMailFrom(address, session, cb) {
        console.log(`onMailFrom: address - ${address.address}, session - ${session.id}`);
        cb(); // accept the email
    },
    onRcptTo(address, session, cb) {
        console.log(`onRcptTo: address - ${address.address}, session - ${session.id}`);
        cb(); // accept the recipient
    },
    onData(stream, session, cb) {
        stream.on('data', (data) => console.log(`onData: ${data.toString()}`));
        stream.on('end', cb)
    },
});

export default server;
