#zero downtime deployment

echo "Deploy starting..."

git pull

yarn install || exit

BUILD_DIR=temp yarn build || exit

echo "$BUILD_DIR"
echo "$NEXT_BUILD_DIR"

yarn build

if [ ! -d "temp" ]; then
  echo '\033[31m temp Directory not exists!\033[0m'
  exit 1;
fi

rm -rf .next

if [ ! -d ".next" ]; then
  mkdir .next
fi
mv temp/* .next

BUILD_DIR=".next"
NEXT_BUILD_DIR=".next"

echo "$BUILD_DIR"
echo "$NEXT_BUILD_DIR"

# yarn reload
pm2 reload all --update-env
pm2 reset all

echo "Deploy done."

#make sure `next.config.js` it set `distDir: process.env.BUILD_DIR`