export function debounce(func: () => void, debounceTime: number) {
  var timer: number;
  return function (event: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, debounceTime, event);
  };
}
