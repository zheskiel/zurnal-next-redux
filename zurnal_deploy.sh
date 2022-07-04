#zero downtime deployment

echo "Deploy starting..."

git pull

yarn install || exit

yarn build

if [ ! -d "temp" ]; then
  echo '\033[31m temp Directory not exists!\033[0m'
  exit 1;
fi

rm -rf temp

if [ ! -d "temp" ]; then
  mkdir temp
fi

mv temp/* temp



rm -rf .next

if [ ! -d ".next" ]; then
 mkdir .next
fi

mv temp/* .next

yarn reload

echo "Deploy done."

#make sure `next.config.js` it set `distDir: process.env.BUILD_DIR`