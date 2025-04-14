# create and work on a branch
git checkout -b feature/branch-name
# commit changes
git add . && git commit -m "done something"
# push branch to remote
git push origin feature/branch-name

# switch back to main
git checkout main
# merge the feature into main
git merge feature/branch-name
# push updated main to GitHub
git push origin main
