#!/bin/bash

echo ""
echo "  ███████╗██╗  ██╗██╗   ██╗    ███████╗██╗  ██╗██████╗  ██████╗ "
echo "  ██╔════╝██║ ██╔╝╚██╗ ██╔╝    ██╔════╝╚██╗██╔╝██╔══██╗██╔═══██╗"
echo "  ███████╗█████╔╝  ╚████╔╝     █████╗   ╚███╔╝ ██████╔╝██║   ██║"
echo "  ╚════██║██╔═██╗   ╚██╔╝      ██╔══╝   ██╔██╗ ██╔═══╝ ██║   ██║"
echo "  ███████║██║  ██╗   ██║       ███████╗██╔╝ ██╗██║     ╚██████╔╝"
echo "  ╚══════╝╚═╝  ╚═╝   ╚═╝       ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ "
echo ""
echo "  Where moments become legacy — حيث تتحول اللحظات إلى إرث"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check Node.js
if ! command -v node &> /dev/null; then
  echo "  ❌  Node.js غير مثبت — حمّله من https://nodejs.org"
  exit 1
fi

NODE_VER=$(node -v)
echo "  ✅  Node.js $NODE_VER"

# Install dependencies if node_modules missing
if [ ! -d "node_modules" ]; then
  echo ""
  echo "  📦  تثبيت المكتبات..."
  npm install
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  🚀  تشغيل السيرفر..."
echo ""
echo "  افتح المتصفح على:  http://localhost:3000"
echo ""
echo "  الصفحات:"
echo "    /                → Home       (الإنترو)"
echo "    /our-story       → قصتنا     (#FED172)"
echo "    /capabilities    → قدراتنا   (#F3742B) — cursor lens"
echo "    /work            → أعمالنا   (#B83A14) — horizontal scroll"
echo "    /contact         → تواصل     (#612E37)"
echo "    /join            → انضم      (#231650)"
echo ""
echo "  لإيقاف السيرفر: Ctrl + C"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run dev
