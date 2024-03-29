function setCookie(name: string, value: string): void {
  document.cookie = `${name}=${value || ''}; expires=0; path=/`;
}

const getCookie = (name: string): string => (
  document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`)?.pop() || ''
);

export { getCookie, setCookie };
