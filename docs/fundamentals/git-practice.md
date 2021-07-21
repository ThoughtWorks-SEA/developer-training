# Lab: Git practice

### Create a local repository

Create a new directory from the terminal

```sh
mkdir my-first-repo
cd my-first-repo
```

### Initialize your git repository

```sh
git init
```

This creates a new `.git` folder.

### Git configuration

Set your user name and email

```
git config --global user.name "Sabrina Sulong"
git config --global user.email "sabrina@email.com"
```

### Create a remote repository

You've created a local Git repository, but if anything was to happen to your computer, you would lose all your data. Now we want to create a remote repository and push our changes there so that we have a backup.

You can use any Git SaaS service provider, such as GitLab, GitHub, Bitbucket, or even roll out your own. We will be using GitHub.

Create a new repository on GitHub and copy the Git repository URL:

```sh
git remote add origin <your-git-repo-url>
```

Now check that you have added it correctly:

```sh
git remote --verbose
```

You can also do `git remote -v`.

### Add new files

Check the status of your files:

```sh
git status
```

Since you have not yet added any files, you should see:

```
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

Create a `README.md` file and add some content to it.

Some ways you can do this:

1. `vi README.md` -> `i` to enter insert mode and add your content -> `esc` -> `:wq` or `:x` to exit and save the file
2. `touch README.md` to create the file -> `code .` to open the current directory in VS Code -> add content to file and save

Now check the status again with `git status`

You should see that `README.md` is now an **untracked** file.

### Track a file

To tell Git to track your `README.md` file, run:

```sh
git add -N README.md
git status
```

What do you notice about `README.md` now? The file is now **tracked**, but not staged for commit.

### Git diff

View changes you have made to your tracked files:

```sh
git diff
```

### Stage a file

To include a file in your commit, it is not enough to track the file - you will need to stage the file for commit:

```sh
git add README.md
git status
```

The file is now staged to be committed.

If you have several tracked files and want to stage all of them for commit, you can do:

```sh
git add .
```

### Git commit

Commit your changes:

```sh
git commit -m "Initial commit"
```

or `git commit` and edit the commit message in vim.

### Git log

Check your git history:

```sh
git log
```

The commit you just made should be there!

### Git push

Finally, we want to push our local commits to the remote repository.

For your first push, you will need to:

```sh
git push -u origin main
```

Subsequently, any new commits made locally can be pushed to your remote repository with:

```sh
git push
```

### Git pull

If you are collaborating with other people on the same project, you will need to fetch new changes from the remote repository:

```sh
git pull
```

For a cleaner git history, it is better to do `git pull --rebase` - we will explore this in future during group projects.

### Git checkout <file>

If you make subsequent changes to a file locally and want to abandon the changes, you can do:

```sh
git checkout README.md
```

To abandon all the changes to files made locally, you can do:

```sh
git checkout .
```

## Learn Git Branching

Build your Git skills further with [this game](https://learngitbranching.js.org/).
