##安装使用文档

### 安装步骤

1.在当前目录运行npm install

1.在config.js中添加配置

		oa_user: '',  //oa用户名
    	oa_passwd: '',  //oa密码
    	hg_user: '',  //hg用户名
    	hg_project: [
    		{
    			hg_dir: '',  //工程目录路径
			    hg_mod: '',  //工程名
			    hg_module_id: ''  //工程id
    		}, {
                hg_dir: '',  //工程目录路径
                hg_mod: '',  //工程名
                hg_module_id: ''  //工程id
            }
    	]
		
		
### 使用步骤

1.双击./bin/add_pub_version.bat，输入hg工程和版本索引，默认都是0，即取hg_project配置中的第一项和该工程最新提交的版本
