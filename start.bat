@echo off
chcp 65001 >nul
title DuoWatch - Vision & Xyltax
echo ========================================================
echo  🍿 DuoWatch - Vision & Xyltax
echo  Lancement du serveur avec sauvegarde automatique...
echo ========================================================
echo.
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Python n'a pas pu demarrer le serveur.
    echo Ouverture directe du fichier index.html dans votre navigateur...
    start "" "index.html"
    pause
)
