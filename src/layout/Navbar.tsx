import React from "react";
import Link from "next/link";

// 提供一个简单的占位组件
export const Navbar = () => {
  return (
    <div style={{ height: '60px', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eaeaea' }}>
      <div>JSON Crack</div>
      <div>
        <Link href="/editor" style={{ textDecoration: 'none', color: '#228be6' }}>
          Go to Editor
        </Link>
      </div>
    </div>
  );
}; 