var sprintf = require('sprintf-js').sprintf;
var iconv = require('iconv-lite');
var encoding = 'cp936';
var binaryEncoding = 'binary';
var pub_request = require('./pub_request').pub_request;
var config = require('./config').config;

var qs = {
    user: config.hg_user,
    dir: config.hg_dir,
    mod: config.hg_mod,
    desc: ''
};

var arguments = process.argv;
var version_index = parseInt(arguments[2] || 0);
console.log(version_index);


var vd = {
    "code": "0",
    "message": "success"
};
var user = qs.user || '',
    dir = qs.dir || '',
    mod = qs.mod || '',
    desc = qs.desc || '';

var exec = require('child_process').exec;
var cmd = sprintf('cd /d "%s" && hg log -u "%s" -d "-31" -M --template "{desc|firstline}\\n" ', dir, user);
// var shell = exec(cmd);
exec(cmd, { encoding: binaryEncoding }, function(err, stdout, stderr){
    var content = iconv.decode(new Buffer(stdout, binaryEncoding), encoding);
    if ('' != content) {
            var obj = {},
                result = [],
                arr = content.split('\n');
            for (var i = 0, len = arr.length; i < len; i++) {
                if (!obj[arr[i]] && arr[i]) {
                    result.push(arr[i]);
                    obj[arr[i]] = true;
                }
            }

            vd.data = result;
            console.log(result);
            get_latest_submit(dir, user, mod, result[version_index] || '');
        } else {
            vd.data = [];
        }

});


function get_latest_submit(dir, user, mod, desc){
    if (!user || !mod || !desc) {
        vd.code = '1';
        vd.message = 'missing field';
    } else {
        var exec = require('child_process').exec;
        var cmd = sprintf('cd /d "%s" && hg log -u "%s" -d "-31" -M --template "{files %% \'\/{file}\\n\'}" -k "%s" ', dir, user, desc);
        var shell = exec(cmd);
        var content = '';

        shell.stdout.on('data', function(data) {
            content += data;
        });

        shell.stderr.on('data', function(data) {
            content += data;
        });

        shell.on('exit', function(code) {
            if (0 == code) {
                if ('' != content) {
                    var obj = {},
                        result = [],
                        arr = content.split('\n');
                    for (var i = 0, len = arr.length; i < len; i++) {
                        if (!obj[arr[i]] && arr[i] && !(/^\/origin\//.test(arr[i]))) {
                            result.push(arr[i]);
                            obj[arr[i]] = true;
                        }
                    }

                    result.sort();
                    console.log('***************** files list ***************');
                    console.log(result);
                    vd.data = result;
                    pub_request(desc, result);
                } else {
                    vd.data = [];
                }
            } else {
                vd.code = '2';
                vd.message = 'runtime error [' + code + ']';
                console.error('cmd:' + cmd);
                console.error('error:' + content);
            }
            
        });
    }
}






