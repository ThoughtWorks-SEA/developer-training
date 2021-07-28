# Machine setup

Follow the instructions with the specific operating system for your machine.

Once that's done, follow instructions in the [General](#general) section.

# Windows

### Git for Windows

Download and install [Git for Windows](https://gitforwindows.org/) (LTS version). Select all default values.

### Install Node.js and npm

Download nodejs and npm from the [official website](https://nodejs.org/en/).

### Additional resources

The following is **NOT REQUIRED**, and is meant for your personal exploration outside of this training.

1. You can also use [Chocolatey](https://chocolatey.org/install) to install and manage your packages. For example, you would be able to install [nodejs](https://chocolatey.org/packages/nodejs) with `choco install nodejs`. Note that you will need to run all installation commands on [PowerShell with administrator privilege](https://www.thewindowsclub.com/how-to-open-an-elevated-powershell-prompt-in-windows-10).

# Mac

### Install Homebrew package manager

Open Terminal app and run the following command.

```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Next, check that Homebrew was installed properly. Fix any issues when prompted.

```sh
brew doctor
```

### Install Git

Install Git

```sh
brew install git
```

### Install Node.js and npm

Install Node.js via Homebrew. npm will be installed together with Node.js.

```sh
brew install node
```

### Upgrading outdated packages

If you already have these packages previously installed on your computer, then you would want to make sure they are up to date. If you previously installed them via `brew` then run the following command to upgrade your packages.

```sh
brew upgrade <package-name>
```

# Linux

### Package manager

Check which distribution of Linux you are using

```sh
lsb_release -a
```

Your package manager will differ depending on your Linux distribution.

For Debian based distributions (e.g. Ubuntu) you will use `apt`.

For Fedora based distributions (e.g. RHEL, CentOS) you will use `dnf`. Note that `dnf` is the next-generation version of `yum`. To install `dnf` run `yum install dnf`.

### Install Git

For Debian based distributions

```sh
sudo apt install git-all
```

For Fedora based distributions

```sh
sudo dnf install git-all
```

### Install Node.js

Official Node.js [binary distributions](https://github.com/nodesource/distributions) for various Linux distributions are provided by NodeSource.

Refer to installation instructions for [Fedora based distributions](https://github.com/nodesource/distributions/blob/master/README.md#rpminstall).

Refer to installation instructions for [Debian based distributions](https://github.com/nodesource/distributions/blob/master/README.md#debinstall).

### Upgrading outdated packages

Run the following command to upgrade outdated packages for your respective Linux distro.

```sh
sudo apt install --only-upgrade <package-name>
```

```sh
sudo dnf upgrade <package-name>
```

# General

Follow these instructions for all operating systems:

### Install Visual Studio Code

Install VS Code [here](https://code.visualstudio.com/download).

#### Install VS Code `code` command in PATH (optional)

For Windows, this should already enabled by default, so you can skip this step.

- Open the command palette (Mac: Cmd+Shift+P; Windows: Ctrl+Shift+P or just press F1.)
- Type `shell` and select `Shell Command: Install 'code' command in PATH`.

![code](_media/code.png)

You can now use the `code` command to open Visual Studio Code.

To open the entire folder / directory:

```
code .
```

#### Install VS Code extensions (optional)

Here are some useful Visual Studio Code [extensions](/miscellaneous/resources?id=vs-code-extensions). For now, install **GitLens**. Throughout the training, you can explore the other extensions and install the ones you find useful.

### Install Node version manager (optional)

We often need to use different versions of Node on different projects. The easiest way to manage different versions of Node for multiple projects on your computer, is to use a version manager like [`n`](https://github.com/tj/n) or [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating).

For Windows, install [`nvm-windows`](https://github.com/coreybutler/nvm-windows) instead.

To install `n`:

```
npm install --global n
```

Verify `n` was installed.

```
n --version
```

<!-- ### Install MongoDB

Find the instructions for your specific OS and version for the [Community Edition](https://docs.mongodb.com/manual/administration/install-community/).

If you're running Windows, please add the MongoDB bin folder to your System PATH (e.g. C:\Program Files\MongoDB\Server\4.0\bin) so that the `mongo` command will be able to work in the terminal.

### Install client to view data in MongoDB

[MongoDB Compass](https://www.mongodb.com/products/compass). -->

### Configuring Git

To attach your full name to every commit you make, simply add this line:

```sh
git config --global user.name "<your name>"
```

For example, `git config --global user.name "Jane Doe"`.

And your email:

```sh
git config --global user.email "<your email>"
```

### Verify installations

Verify your packages have been installed correctly

```sh
git --version
which node
node --version
which npm
npm --version
code --version
```

<!-- mongod --version -->
