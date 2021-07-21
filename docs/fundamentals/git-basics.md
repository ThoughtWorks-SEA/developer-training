# Git

Git is a powerful distributed version control tool. With git, every developer's working copy of the code is also a repository that contains the full history of all changes. The content of the files are secured with a cryptographically secure hashing algorithm. This protects the code and the change history against both accidental and malicious change and ensures that the history is fully traceable.
While there are GUI tools to help you with git commands, we recommend learning git through the command line.

<img src="fundamentals/_media/git.png" alt="git" width="300"/>

Read more on git [here](https://www.atlassian.com/git/tutorials/what-is-git).

## Git lifecycle

There are two types of files in Git - tracked and untracked files. When you add a new file, it will be untracked. Once Git tracks a file, it falls under one of three states - unmodified, modified, and staged.

![Git lifecycle](https://git-scm.com/book/en/v2/images/lifecycle.png)

## Ignore files and folders

You can use .gitignore to ignore files and folders that we do not want inside the repository. A folder commonly ignored is `node_modules` and a file commonly ignored is `.env`.

## Basic git commands

```
git log
git status
git pull
git commit
git commit -m 'Your commit message'
git push
```

We will try these commands out later in a lab.

## Writing good commit messages

Adding a good commit message is very important in a project. Follow these [rules](https://chris.beams.io/posts/git-commit/) for good commit messages.

The seven rules of a great Git commit message

0. Separate subject from body with a blank line
1. Limit the subject line to 50 characters
1. Capitalize the subject line
1. Do not end the subject line with a period
1. Use the imperative mood in the subject line
1. Wrap the body at 72 characters
1. Use the body to explain what and why vs. how

When pairing (or mob pairing), it is often also good practice to include your names in the commit message:

```
Author: Sabrina Sulong <sabrina@email.com>
Date:   Mon Jul 12 14:10:32 2021 +0800

[Sabrina/Bernie] Remove deprecated methods
```

or

```
Author: Sabrina Sulong <sabrina@email.com>
Date:   Mon Jul 12 14:10:32 2021 +0800

Implement export function for reports

Co-authored by Bernie <bernie@email.com>
Co-authored by Spangle <spangle@email.com>
```

## Fork an existing repository

When you fork a repository, you are making a copy of that repository into your own GitHub account.

Head to an existing repository on GitHub and click on the `fork` button: https://github.com/thoughtworks-jumpstart/git-basics.git

## Clone an existing repository

Once you have forked someone's repository, you want to clone it into your own machine.

```sh
git clone https://github.com/<your-github-username>/git-basics.git
```
