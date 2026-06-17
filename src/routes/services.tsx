import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import rawHtml from "../legacy/services.html?raw";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Big Context & Company" },
      { name: "description", content: "AI-native data operations services from Big Context & Company." },
      { property: "og:title", content: "Services — Big Context & Company" },
      { property: "og:description", content: "AI-native data operations services from Big Context & Company." },
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
  component: ServicesPage,
});

function ServicesPage() {
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