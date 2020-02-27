const jsforce = require('jsforce');
const username = 'salesforce username';
const password = 'salesforce password'+ 'security token';
//loginurl: depends on sandbox or production we are connecting to.
const conn = new jsforce.Connection(
    {loginUrl:'https://test.salesforce.com'}
);
conn.login(username, password, function(err, res) {
    if (err) {
        return console.error(err);
    }
    console.log('Authenticated');
    conn.streaming.topic("NewAccounts").subscribe(function(message) {
        console.log('Event Type : ' + message.event.type);
        console.log('Event Created : ' + message.event.createdDate);
        console.log('Object Id : ' + message.sobject.Id);
        console.log('Event : ' + JSON.stringify(message));
    });
});