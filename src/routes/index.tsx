import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import rawHtml from "../legacy/big-context.html?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Big Context & Company — Make enterprise data work at AI-scale" },
      { name: "description", content: "Big Context & Company — the pragmatic context layer that makes enterprise data legible to AI." },
      { property: "og:title", content: "Big Context & Company — Make enterprise data work at AI-scale" },
      { property: "og:description", content: "The pragmatic context layer that makes enterprise data legible to AI." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLDivElement>(null);

  // Extract <style> + body markup + <script> blocks from the raw HTML once.
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
    // Execute the original page scripts in order, in global scope.
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
