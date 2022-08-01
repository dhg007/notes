# eslint config in react project

[参考文章](https://javascript.plainenglish.io/setting-eslint-and-prettier-on-a-react-typescript-project-2021-22993565edf9)

1. step 1

```
npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-airbnb eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks prettier
```

- 执行时 会冲突
  
```
  npx eslint src/App.tsx --quiet --fix
  npx prettier --write src/App.tsx 
```

2. set the ESLint to use only Prettier for the formatting rules and avoid those conflicting rules upon each other

``` 
npm install --save-dev eslint-config-prettier
```

3. Make ESLint use Prettier rules

```
npm install --save-dev eslint-plugin-prettier
```

### Now running just the ESLint command:

```
npx eslint src/App.tsx --quiet --fix
```

### ESLint used the Prettier configuration as the formatting rules!

- .eslintrc.json

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint", "react-hooks"],
  "rules": {
    // 0=off 1=warning 2=error
    "react/jsx-filename-extension": [
      2,
      {
        "extensions": [".tsx"]
      }
    ],
    "import/extensions": [
      2,
      "always",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "no-unused-vars": 2
    // "no-use-before-define": "off",
    // "@typescript-eslint/no-use-before-define": ["error"],
    // "no-shadow": "off",
    // "@typescript-eslint/no-shadow": ["error"],
    // "@typescript-eslint/explicit-function-return-type": [
    //   "error",
    //   {
    //     "allowExpressions": true
    //   }
    // ],
    // "max-len": [
    //   "warn",
    //   {
    //     "code": 80
    //   }
    // ],
    // "react-hooks/rules-of-hooks": "error",
    // "react-hooks/exhaustive-deps": "warn",
    // "import/prefer-default-export": "off",
    // "react/prop-types": "off"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}
```


- .prettierrc
```json
{
  "semi": true,
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "trailingComma": "all"
}
```

- .editorconfig
  
```
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab

```

- .vscode settings.json

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
}
```
