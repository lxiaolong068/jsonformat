// 自动修复 ESLint 和 Prettier 格式问题的脚本
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 检查 package.json 中是否有 eslint 和 prettier 相关的命令
try {
  console.log('开始修复格式问题...');
  
  // 尝试运行 ESLint 自动修复
  console.log('运行 ESLint 自动修复...');
  execSync('npx eslint --fix "src/**/*.{js,jsx,ts,tsx}"', { stdio: 'inherit' });
  
  // 尝试运行 Prettier 自动修复
  console.log('运行 Prettier 自动修复...');
  execSync('npx prettier --write "src/**/*.{js,jsx,ts,tsx}"', { stdio: 'inherit' });
  
  console.log('格式问题修复完成！');
} catch (error) {
  console.error('修复过程中出错:', error.message);
  process.exit(1);
} 