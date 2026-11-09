@echo off
REM SK Softech - PostgreSQL Database Backup Script (Fix 16 from 20 Fixes Checklist)
set PGPASSWORD=root
set PG_BIN=C:\Program Files\PostgreSQL\18\bin
set BACKUP_DIR=%~dp0..\backups

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set TIMESTAMP=%datetime:~0,8%_%datetime:~8,6%

echo Starting backup of sksoftech_db...
"%PG_BIN%\pg_dump.exe" -U postgres -h localhost -p 5432 -F c -b -v -f "%BACKUP_DIR%\sksoftech_backup_%TIMESTAMP%.dump" sksoftech_db

if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Backup completed: %BACKUP_DIR%\sksoftech_backup_%TIMESTAMP%.dump
) else (
    echo [ERROR] Backup failed with code %ERRORLEVEL%
)
