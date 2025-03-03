// 修复 React Hooks 规则问题的脚本
const fs = require('fs');
const path = require('path');

// 修复 LanguageContext.tsx 中的 Hooks 规则问题
function fixLanguageContextHooks() {
  const filePath = path.join(process.cwd(), 'src', 'contexts', 'LanguageContext.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.error('LanguageContext.tsx 文件不存在!');
    return false;
  }
  
  console.log('修复 LanguageContext.tsx 中的 Hooks 规则问题...');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 修复条件调用 useRouter 的问题
  // 将 router 的初始化移到条件外部
  const newContent = content.replace(
    /const context = useContext\(LanguageContext\);[\s\S]*?if \(typeof window !== ['"]undefined['"]\) {[\s\S]*?const router = useRouter\(\);/m,
    `const context = useContext(LanguageContext);
  
  // 确保 useRouter 不在条件语句中调用
  const router = typeof window !== "undefined" ? useRouter() : null;
  
  if (typeof window !== "undefined") {`
  );
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('成功修复 LanguageContext.tsx 中的 Hooks 规则问题!');
    return true;
  }
  
  console.log('LanguageContext.tsx 中没有发现需要修复的 Hooks 规则问题。');
  return false;
}

// 主函数
function main() {
  console.log('开始修复 React Hooks 规则问题...');
  
  const fixed = fixLanguageContextHooks();
  
  if (fixed) {
    console.log('完成! 成功修复了 React Hooks 规则问题。');
  } else {
    console.log('没有发现需要修复的 React Hooks 规则问题，或者修复失败。');
  }
}

main(); 