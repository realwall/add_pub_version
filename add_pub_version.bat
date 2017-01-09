@echo off
set /p input="Please input version index: "
set version_index=%input% 
call node files.js %version_index%

pause