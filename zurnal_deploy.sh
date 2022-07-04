#zero downtime deployment

echo "Deploy starting..."

yarn pull

yarn install || exit

yarn build

rm -rf temp

if [ ! -d "temp" ]; then
  mkdir temp
fi

mv .next/* temp


rm -rf .next

if [ ! -d ".next" ]; then
 mkdir .next
fi

mv temp/* .next

yarn reload

echo "Deploy done."

#make sure `next.config.js` it set `distDir: process.env.BUILD_DIR`