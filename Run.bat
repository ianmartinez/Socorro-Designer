echo Setting path...
:: Path to electron
set electron="C:\%HOMEPATH%\node_modules\electron\dist\electron.exe"
:: Path to starting JavaScript
set js="D:\Socorro IDE\electron_init.js"

echo Launching Electron App...
%electron% %js%