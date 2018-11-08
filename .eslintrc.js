module.exports = {
    // required to lint *.vue files
    rules: {
        'no-console': 'off',
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': 'off'
    },
    parserOptions: {
        "sourceType": "module"
    },
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:vue/essential'
    ],
};