// 运行所有修复脚本的主脚本
const { execSync } = require('child_process');

console.log('开始全面修复项目格式问题...');

try {
  // 1. 首先修复引号问题
  console.log('\n===== 步骤 1: 修复引号问题 =====');
  execSync('node fix-quotes.js', { stdio: 'inherit' });
  
  // 2. 修复 React Hooks 规则问题
  console.log('\n===== 步骤 2: 修复 React Hooks 规则问题 =====');
  execSync('node fix-hooks.js', { stdio: 'inherit' });
  
  // 3. 运行 ESLint 和 Prettier 修复剩余问题
  console.log('\n===== 步骤 3: 运行 ESLint 和 Prettier 修复剩余问题 =====');
  execSync('node fix-lint.js', { stdio: 'inherit' });
  
  console.log('\n✅ 所有修复脚本已成功运行!');
  console.log('现在可以尝试重新构建项目: pnpm run build');
} catch (error) {
  console.error('\n❌ 修复过程中出错:', error.message);
  console.log('您可能需要手动修复一些问题。');
  process.exit(1);
} 