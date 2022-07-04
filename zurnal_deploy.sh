#zero downtime deployment

echo "Deploy starting..."

git pull

yarn install || exit

echo "Echo Build Dir 1...."

BUILD_DIR="temp"
NEXT_BUILD_DIR="temp"
echo "$BUILD_DIR"
echo "$NEXT_BUILD_DIR"

yarn build

echo "Echo Build Dir 2...."

echo "$BUILD_DIR"
echo "$NEXT_BUILD_DIR"

if [ ! -d "temp" ]; then
  echo '\033[31m temp Directory not exists!\033[0m'
  exit 1;
fi

rm -rf .next

if [ ! -d ".next" ]; then
  mkdir .next
fi
mv temp/* .next

echo "Echo Build Dir 3...."

BUILD_DIR=".next"
NEXT_BUILD_DIR=".next"

echo "$BUILD_DIR"
echo "$NEXT_BUILD_DIR"

echo "Echo Build Dir 4...."

yarn reload
# pm2 reload all --update-env
# pm2 reset all

echo "Deploy done."

#make sure `next.config.js` it set `distDir: process.env.BUILD_DIR`