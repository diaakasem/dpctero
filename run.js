var pm2 = require('pm2');
var path = require('path');
pm2.connect(function() {

    // If developer's environment
    pm2.start({
        name	: "datasheild-django",
        script	: "datasheild/manage.py",
        args	: ["runserver"],
        watch	: "true",
        cwd		: process.env.SEVEN_PATH,  
        exec_interpreter: "python",
    }, function(err, apps) {
        if (err) {
            console.log("ERROR with DJANGO");
            console.log('PATH : ' + process.env.SEVEN_PATH);
            console.log('PORT : ' + process.env.SEVEN_PORT);
            console.log(err);
        }
        console.log("Done with django");
        pm2.disconnect();
    });

    pm2.start({
        name	: "celery-worker",
        script	: "setup/celery-worker.sh",
        watch	: "true",
        cwd		: process.env.SEVEN_PATH,  
        exec_interpreter: "bash",
    }, function(err, apps) {
        if (err) {
            console.log("ERROR with celery");
            console.log("PATH : " + process.env.SEVEN_PATH);
            console.log(err);
        }
        console.log("Done with celery");
        pm2.disconnect();
    });

});
