mkdir math-recall
cd math-recall

git init
git remote add origin -f https://github.com/jan25/sandbox-2020
echo "math-recall" >> .git/info/sparse-checkout
git pull origin master
