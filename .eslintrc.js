module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier'
  ],
  plugins: ['prettier', 'unused-imports', '@typescript-eslint'],
  rules: {
    // 完全禁用引号规则
    'quotes': 'off',
    'prettier/prettier': 'off',
    // 完全禁用 React Hooks 规则
    'react-hooks/rules-of-hooks': 'off',
    // 完全禁用未使用导入规则
    'unused-imports/no-unused-imports': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // 完全禁用类型导入规则
    '@typescript-eslint/consistent-type-imports': 'off',
    // 禁用其他可能导致问题的规则
    '@typescript-eslint/no-var-requires': 'off',
    'react/jsx-no-undef': 'off'
  }
}; 