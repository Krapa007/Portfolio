import { useState, useEffect } from "react";
import { ROLES } from "../data/constants";

export function useTypewriter({ disabled } = {}) {
  const [text, setText] = useState(disabled ? ROLES[0] : "");

  useEffect(() => {
    if (disabled) {
      setText(ROLES[0] || "");
      return;
    }

    let ri = 0, ci = 0, del = false;

    const id = setInterval(() => {
      const cur = ROLES[ri];
      if (!del) {
        setText(cur.slice(0, ci + 1));
        if (ci + 1 === cur.length) setTimeout(() => { del = true; }, 2000);
        else ci++;
      } else {
        setText(cur.slice(0, ci - 1));
        if (ci === 0) { del = false; ri = (ri + 1) % ROLES.length; }
        else ci--;
      }
    }, 72);

    return () => clearInterval(id);
  }, [disabled]);

  return text;
}
