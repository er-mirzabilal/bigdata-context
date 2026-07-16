import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import rawHtml from "../legacy/pragmatics.html?raw";

export const Route = createFileRoute("/pragmatics")({
  head: () => ({
    meta: [
      { title: "The Open Pragmatics Standard — Big Context & Company" },
      {
        name: "description",
        content:
          "A shared vocabulary and infrastructure layer for enterprise data context — the kind of meaning that makes AI systems actually trustworthy and reliable at scale.",
      },
    ],
  }),
  component: PragmaticsPage,
});

function PragmaticsPage() {
  const ref = useRef<HTMLDivElement>(null);

  const { styleCss, bodyHtml, scripts } = (() => {
    const styleMatch = rawHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const styleCss = styleMatch ? styleMatch[1] : "";
    const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let body = bodyMatch ? bodyMatch[1] : rawHtml;
    const scripts: string[] = [];
    body = body.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (_m, code) => {
      scripts.push(code);
      return "";
    });
    return { styleCss, bodyHtml: body, scripts };
  })();

  useEffect(() => {
    if (!ref.current) return;
    const tags: HTMLScriptElement[] = [];
    for (const code of scripts) {
      const s = document.createElement("script");
      s.text = code;
      document.body.appendChild(s);
      tags.push(s);
    }
    return () => {
      tags.forEach((t) => t.remove());
    };
  }, [scripts]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleCss }} />
      <div ref={ref} dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
