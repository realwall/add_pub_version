@echo off
set project_input=0
set version_input=0
set /p project_input="Please input project index(default 0): "
set project_input=%project_input% 
set /p version_input="Please input version index(default 0): "
set version_input=%version_input% 

if "%project_input%" == "" set project_input=0
if "%version_input%" == "" set version_input=0

set params=%project_input%%version_input%

call node files.js %params%

pause