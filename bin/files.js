var sprintf = require('sprintf-js').sprintf;
var iconv = require('iconv-lite');
var encoding = 'cp936';
var binaryEncoding = 'binary';
var pub_request = require('./pub_request').pub_request;
var config = require('../config').config;


var arguments = process.argv;
console.log(arguments);
var project_index = parseInt(arguments[2] || 0);
var version_index = parseInt(arguments[3] || 0);

var hg_project = config.hg_project[project_index];
console.log(hg_project);

var vd = {
    "code": "0",
    "message": "success"
};
var user = config.hg_user || '',
    dir = hg_project.hg_dir || '',
    mod = hg_project.hg_mod || '',
    desc = '';

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
        print_version_list(result);
        console.log(result);
        get_latest_submit(dir, user, mod, result[version_index] || '');
    } else {
        console.log('获取该工程最新提交文件失败');
    }

});


function get_latest_submit(dir, user, mod, desc){
    if (!user || !mod || !desc) {
        console.log('获取该工程最新提交文件失败');
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
                    pub_request(desc, result, hg_project);
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

function print_version_list(version_list){
    var version_obj = {};
    for(var i = 0; i < version_list.length; i++){
        version_obj[i] = version_list[i];
    }
    console.log(version_obj);
}






