// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 6,
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    //  https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: [
        'eslint:recommended'
    ],
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    globals: {
        API_ORIGIN: false,
        ROUTER_MODE: false,
    },
    // add your custom rules here
    // "off" -> 0 关闭规则
    // "warn" -> 1 开启警告规则
    // "error" -> 2 开启错误规则
    'rules': {
        indent: ['warn', 4],
        semi: ['warn', 'always'],
        camelcase: 0,
        'comma-dangle': [
            'error', {
                arrays: 'only-multiline',
                objects: 'only-multiline',
                imports: 'only-multiline',
                exports: 'only-multiline',
                functions: 'ignore',
            }
        ],
        'no-unused-vars': ['warn'],
        'no-undef': 2,
        'arrow-parens': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
};
