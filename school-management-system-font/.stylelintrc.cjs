module.exports = {
  extends: [
    'stylelint-config-standard', // 配置 stylelint 拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置 stylelint scss 插件
    'stylelint-config-recommended-vue/scss' // 配置 vue 中 scss 样式格式化
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.cjs',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
    'node_modules/',
    'dist/',
    'public/',
    'docs/'
  ],
  plugins: [
    'stylelint-order' // 这个插件帮助我们排序CSS规则
  ],
  rules: {
    indentation: 2,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'media-feature-range-notation': null,
    'alpha-value-notation': ['number'],
    'color-function-notation': ['legacy'],
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-type-no-unknown': null,
    'at-rule-no-unknown': null,
    'no-duplicate-selectors': null,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'deep'] }],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind']
      }
    ]
    // 这里可以添加或修改其他规则
  }
}
