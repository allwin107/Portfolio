@echo off
echo ========================================
echo   Removing .kiro from Git Tracking
echo ========================================
echo.

REM Set Git path
set GIT="C:\Program Files\Git\bin\git.exe"

REM Check if Git exists
if not exist %GIT% (
    echo ERROR: Git not found. Please run these commands manually in Git Bash:
    echo.
    echo git rm -r --cached .kiro
    echo git commit -m "chore: remove .kiro folder from git tracking"
    echo.
    pause
    exit /b 1
)

echo Removing .kiro folder from Git tracking...
echo (The folder will stay on your computer, just won't be pushed to GitHub)
echo.

%GIT% rm -r --cached .kiro

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Failed to remove .kiro from Git tracking.
    echo.
    echo Please run this command manually in Git Bash:
    echo   git rm -r --cached .kiro
    echo.
    pause
    exit /b 1
)

echo.
echo SUCCESS! .kiro folder removed from Git tracking.
echo.
echo The folder is still on your computer, but won't be pushed to GitHub anymore.
echo.
echo Next steps:
echo 1. Commit this change: git commit -m "chore: remove .kiro from git tracking"
echo 2. Push to GitHub: git push origin main
echo.
pause
