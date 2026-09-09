/**
 * 复制文本到剪贴板。
 *
 * navigator.clipboard 只在安全上下文（https 或 localhost）里可用，
 * 用 file:// 直接打开构建产物时拿不到，所以保留 execCommand 回退分支。
 * execCommand 已废弃但仍被各浏览器支持，这里只作为兜底。
 */
export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  // 移出视口，避免插入瞬间触发聚焦滚动或页面跳动
  area.style.position = 'fixed';
  area.style.top = '-9999px';
  document.body.appendChild(area);
  area.select();

  try {
    if (!document.execCommand('copy')) {
      throw new Error('execCommand("copy") 被拒绝');
    }
  } finally {
    document.body.removeChild(area);
  }
}
