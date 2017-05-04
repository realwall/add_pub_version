
var md5 = require('md5');
var request = require('request');
request = request.defaults({jar: true});
var config = require('../config').config;

var pub_request = function(desc, file_list, hg_project){

    var hg_mod = hg_project.hg_mod;
    var hg_module_id = hg_project.hg_module_id;
   
    var params = {
        url: 'http://oa.xxx.com/user/submit.json',
        form: {
            min: config.oa_user,
            passwd: md5(config.oa_passwd),
            action: 'user_login'
        }
    };

    request.post(params, function(err, httpResponse, body){
        var cookie = httpResponse.headers['set-cookie'];
        var version_name = '[' + hg_mod + ']' + desc;

        // 创建一个版本
        request.post({
            'url': 'http://pub.oa.xxx.com/version/add.json',
            'headers': {
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'request',
                'Cookie':  JSON.stringify(cookie)
            },
            form: {
                name: version_name
            },
        }, function(err, httpResponse, body){
            var cookie = JSON.stringify(httpResponse.headers['set-cookie']);
            var add_res_body = JSON.parse(httpResponse.body || '{}');
            var project_id = add_res_body.insert_id;  //版本id

            // console.log(file_list);
            for(var i = 0; i < file_list.length; i++){
                file_list[i] = '/home/product/' + hg_mod + file_list[i];
            }
            //给某个版本添加一个模块
            request.post({
                'url': 'http://pub.oa.xxx.com/version/edit_module.json',
                'headers': {
                    'X-Requested-With': 'XMLHttpRequest',
                    'User-Agent': 'request',
                    'Cookie':  JSON.stringify(cookie)
                },
                form: {
                    path: file_list,
                    module: hg_module_id,  //模块id
                    project_id: project_id,  //insert_id
                    desc: '[' + hg_mod + ':' + hg_module_id + ']' + version_name,  //
                    remark: ''
                },
            }, function(err, httpResponse, body){
                console.log('*****************************');
                var add_res_body = JSON.parse(httpResponse.body || '{}');
                if(add_res_body.retcode == 0){
                    console.log('新建版本成功！');
                }else{
                    console.log(add_res_body.retmsg);
                }
                console.log('*****************************');
                console.log('');
            });
        });

    });
}

module.exports = {
    'pub_request': pub_request
}
    




