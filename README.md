##安装使用文档

### 安装步骤

1.在当前目录运行npm install

2.在`C:\Windows\System32\drivers\etc`中添加host配置

		58.67.214.173 pub.oa.fenqile.com
		58.67.214.173 oa.fenqile.com

3.在config.js中添加配置

		oa_user: 'realwallliu',  //oa用户名
    	oa_passwd_md5: '',  //oa密码
    	hg_user: 'realwall',  //hg用户名
	    hg_dir: 'E:/product/work_loan_mobile',  //工程目录路径
	    hg_mod: 'work_loan_mobile'  //工程名
		
		
### 使用步骤

1.双击add_pub_version.bat，输入版本索引号，默认是最新的，即0，可以不输入，索引从0开始
