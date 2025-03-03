// 修复引号问题的脚本 - 将单引号替换为双引号
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 获取所有需要处理的文件
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      fileList = getAllFiles(filePath, fileList);
    } else if (
      stat.isFile() && 
      (filePath.endsWith('.js') || 
       filePath.endsWith('.jsx') || 
       filePath.endsWith('.ts') || 
       filePath.endsWith('.tsx'))
    ) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 修复单个文件中的引号问题
function fixQuotesInFile(filePath) {
  console.log(`处理文件: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 替换字符串中的单引号为双引号，但要避免修改JSX属性中的单引号
  // 这是一个简化的替换，可能需要根据实际情况调整
  let newContent = content
    // 替换导入语句中的单引号
    .replace(/from\s+'([^']+)'/g, 'from "$1"')
    // 替换字符串字面量中的单引号
    .replace(/(?<!=)'([^']*?)'/g, '"$1"');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }
  
  return false;
}

// 主函数
function main() {
  console.log('开始修复引号问题...');
  
  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) {
    console.error('src 目录不存在!');
    process.exit(1);
  }
  
  const files = getAllFiles(srcDir);
  let fixedCount = 0;
  
  files.forEach(file => {
    if (fixQuotesInFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`完成! 修复了 ${fixedCount} 个文件中的引号问题。`);
  
  // 尝试运行 ESLint 和 Prettier 修复剩余问题
  try {
    console.log('运行 ESLint 和 Prettier 修复剩余格式问题...');
    execSync('npx eslint --fix "src/**/*.{js,jsx,ts,tsx}"', { stdio: 'inherit' });
    execSync('npx prettier --write "src/**/*.{js,jsx,ts,tsx}"', { stdio: 'inherit' });
  } catch (error) {
    console.warn('自动修复工具运行出错，可能需要手动修复一些问题:', error.message);
  }
}

main(); 