/**
 * 把光标相对位置写成 --mx / --my，供卡片上的径向高光使用。
 * 不走 GSAP：这是每帧都在变的 CSS 变量，直接写 style 比补间更跟手。
 */
export function attachShine(element: HTMLElement): () => void {
  const onMove = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty('--mx', `${x}%`);
    element.style.setProperty('--my', `${y}%`);
  };

  element.addEventListener('mousemove', onMove);
  return () => element.removeEventListener('mousemove', onMove);
}
