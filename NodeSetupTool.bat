@echo off
setlocal enabledelayedexpansion

REM Run the git command and capture its output into a variable
for /f "delims=" %%i in ('git config --get remote.origin.url') do set "repo_url=%%i"

REM Display the captured value
echo Updating project from: %repo_url%

REM Get repo name from repo_url
FOR %%a in (!repo_url!) do set "repo_name=%%~na"
echo %repo_name%
call git pull origin
set "root_path=%cd%"

echo Searching %root_path%...

set "found=false"
rem Loop through all directories
for /r %%x in (*package.json) do (
	set "str1=%%x"
	if "!str1:node_modules=!" == "!str1!" (
		rem go to directory and run npm install
		set "dirPath=%%~dpx"
		echo Found package.json at !dirPath!...
		pushd "!dirPath!"
		call npm install
		popd
		set "found=true"
	)
)

if "%found%" == "false"  (
    echo No package.json files found.
)else echo Packages installed successfully

echo Done.
pause