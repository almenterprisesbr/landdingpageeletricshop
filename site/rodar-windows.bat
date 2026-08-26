@echo off
REM ============================================================
REM  ElectricShop - servidor local
REM  Basta dar DOIS CLIQUES neste arquivo.
REM ============================================================
title ElectricShop - servidor local
cd /d "%~dp0"

echo.
echo  ============================================
echo   ElectricShop - iniciando servidor local
echo  ============================================
echo.

REM Procura o Python instalado
where python >nul 2>nul
if %errorlevel%==0 (
    echo  Abrindo http://localhost:8000 no navegador...
    start "" http://localhost:8000
    echo.
    echo  Servidor rodando. Para PARAR, feche esta janela.
    echo.
    python -m http.server 8000
    goto :eof
)

where py >nul 2>nul
if %errorlevel%==0 (
    echo  Abrindo http://localhost:8000 no navegador...
    start "" http://localhost:8000
    echo.
    echo  Servidor rodando. Para PARAR, feche esta janela.
    echo.
    py -m http.server 8000
    goto :eof
)

echo  [!] Python nao encontrado no seu computador.
echo.
echo  Voce tem duas opcoes:
echo.
echo   1) Instalar o Python: https://python.org/downloads
echo      (marque a caixa "Add Python to PATH" durante a instalacao)
echo.
echo   2) Ou simplesmente dar dois cliques no arquivo index.html
echo      (o site abre, mas os videos podem nao tocar)
echo.
pause
