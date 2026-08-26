#!/usr/bin/env bash
# ============================================================
#  ElectricShop — servidor local
#  Uso:  bash rodar-mac-linux.sh
# ============================================================
cd "$(dirname "$0")" || exit 1

PORTA=8000

echo ""
echo " ============================================"
echo "  ElectricShop — iniciando servidor local"
echo " ============================================"
echo ""

if ! command -v python3 >/dev/null 2>&1; then
  echo " [!] Python 3 não encontrado."
  echo ""
  echo "     Instale com:"
  echo "       macOS:  brew install python3"
  echo "       Ubuntu: sudo apt install python3"
  echo ""
  echo "     Ou abra o arquivo index.html direto no navegador"
  echo "     (o site abre, mas os vídeos podem não tocar)."
  exit 1
fi

# se a porta estiver ocupada, procura a próxima livre
while lsof -i :$PORTA >/dev/null 2>&1; do
  PORTA=$((PORTA + 1))
done

URL="http://localhost:$PORTA"
echo " Abrindo $URL no navegador..."

# abre o navegador em segundo plano
( sleep 1
  if command -v open >/dev/null 2>&1; then open "$URL"
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"
  fi
) &

echo ""
echo " Servidor rodando. Para PARAR, aperte Ctrl+C."
echo ""
python3 -m http.server "$PORTA"
