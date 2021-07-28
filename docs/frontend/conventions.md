# Conventions

## Folder structure

**For simple applications:**

- Keep all components under `./src/components`
- Create a directory for each component, and put all files for the component in that folder. For example, if you're creating `MyComponent.js`, it should be stored as such:

```text
src
  components/
    my-component/
      MyComponent.js
      MyComponent.test.js
      MyComponent.css
```

**For more complicated/bigger applications:**

- You can structure your directories according to features or routes
- Components which are shared across features can be pulled up to a common `utils/` folder

Example:

```text
src/
  common/
    Avatar.js
    Avatar.css
    APIUtils.js
    APIUtils.test.js
  feed/
    index.js
    Feed.js
    Feed.css
    FeedStory.js
    FeedStory.test.js
    FeedAPI.js
  profile/
    index.js
    Profile.js
    ProfileHeader.js
    ProfileHeader.css
    ProfileAPI.js
```

**Additional resources:**

- [Presentational/Container components](https://github.com/krasimir/react-in-patterns/blob/master/book/chapter-06/README.md)

## Naming

- directories should be kebab-case, e.g. `my-component`
- js/css files should be PascalCase, e.g. `MyComponent.js`

Further reading: [https://reactjs.org/docs/faq-structure.html](https://reactjs.org/docs/faq-structure.html)
