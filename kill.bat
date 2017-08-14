FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8081') DO TaskKill.exe /PID %%P /F
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8082') DO TaskKill.exe /PID %%P /F
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8083') DO TaskKill.exe /PID %%P /F
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8080') DO TaskKill.exe /PID %%P /F
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :3000') DO TaskKill.exe /PID %%P /F
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8808') DO TaskKill.exe /PID %%P /F
