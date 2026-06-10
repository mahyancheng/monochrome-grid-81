import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation(); // 获取当前网址的 hash
  const navigationType = useNavigationType();

  useEffect(() => {
    // 如果网址里带有 #hash (例如 #projects)，则不执行回到顶部，
    // 把滚动权交还给锚点或者我们自己在 ProjectGrid 写的滚动逻辑。
    if (hash) {
      return; 
    }

    // Only scroll to top on PUSH (new navigation), not on POP (back/forward)
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, navigationType]);

  return null;
};

export default ScrollToTop;