// http://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 6,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
            modules: true
        }
    },
    env: {
        browser: true,
        commonjs: true,
        node: true,
        es6: true
    },
    extends: ['eslint:recommended'],
    // required to lint *.html files
    plugins: ['html'],
    settings: {
        'html/indent': '+4',
        'html/html-extensions': ['.html'],
        'html/javascript-mime-types': ['text/javascript']
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        ROUTER_MODE: false
    },
    // add your custom rules here
    // "off" -> 0 关闭规则
    // "warn" -> 1 开启警告规则
    // "error" -> 2 开启错误规则
    rules: {
        indent: ['warn', 4, { SwitchCase: 1 }],
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
