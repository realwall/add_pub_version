##安装使用文档

### 安装步骤

1.在当前目录运行npm install

2.在`C:\Windows\System32\drivers\etc`中添加host配置

		58.67.214.173 pub.oa.fenqile.com
		58.67.214.173 oa.fenqile.com

3.在config.js中添加配置

		oa_user: 'realwallliu',  //oa用户名
    	oa_passwd: '',  //oa密码
    	hg_user: 'relwall',  //hg用户名
    	hg_project: [
    		{
    			hg_dir: 'E:/product/work_loan_mobile',  //工程目录路径
			    hg_mod: 'work_loan_mobile',  //工程名
			    hg_module_id: '63'  //工程id
    		}, {
                hg_dir: 'E:/product/work_loan_sale',  //工程目录路径
                hg_mod: 'work_loan_sale',  //工程名
                hg_module_id: '78'  //工程id
            }
    	]
		
		
### 使用步骤

1.双击./bin/add_pub_version.bat，输入hg工程和版本索引，默认都是0，即取hg_project配置中的第一项和该工程最新提交的版本
