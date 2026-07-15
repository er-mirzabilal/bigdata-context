import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: "Get Started — Big Context & Company" },
      { name: "description", content: "Tell us what you're looking for and we'll be in touch." },
      { property: "og:title", content: "Get Started — Big Context & Company" },
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
  component: GetStarted,
});

const INTERESTS = [
  { value: "whitepaper", label: "Whitepaper" },
  { value: "demo", label: "Demo" },
  { value: "expert-services", label: "Expert Services" },
  { value: "evaluation-tool", label: "Evaluation Tool" },
  { value: "beta", label: "Open Core Beta Invite" },
];

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .gs-root {
    --void: #0a0610;
    --void-2: #160c22;
    --aubergine: #6d2f91;
    --lavender: #c79df0;
    --lavender-hot: #f0e0ff;
    --paper: #efe9f2;
    --muted: #9a8aa8;
    --line: rgba(199,157,240,.14);
    --hair: rgba(199,157,240,.10);
    --serif: 'Fraunces', Georgia, serif;
    --sans: 'Hanken Grotesk', system-ui, sans-serif;
    --mono: 'JetBrains Mono', monospace;
    min-height: 100dvh;
    background: var(--void);
    color: var(--paper);
    font-family: var(--sans);
    display: flex;
    flex-direction: column;
  }

  /* Nav */
  .gs-nav {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    max-width: 900px;
    z-index: 100;
  }
  .gs-nav-in {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 22px;
    background: rgba(10,6,16,.72);
    backdrop-filter: blur(18px);
    border: 1px solid var(--line);
    border-radius: 999px;
    gap: 18px;
  }
  .gs-wordmark {
    font-family: var(--serif);
    font-size: 16px;
    font-weight: 500;
    color: var(--paper);
    text-decoration: none;
    letter-spacing: -.02em;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }
  .gs-wordmark sup { font-size: 10px; opacity: .7; }
  .gs-nav-links { display: flex; align-items: center; gap: 28px; }
  .gs-nav-links a {
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: .06em;
    color: var(--muted);
    text-decoration: none;
    transition: color .2s;
  }
  .gs-nav-links a:hover { color: var(--paper); }

  /* Main */
  .gs-main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 140px 24px 80px;
  }
  .gs-card {
    width: 100%;
    max-width: 520px;
  }
  .gs-eyebrow {
    font-family: var(--mono);
    font-size: 11.5px;
    letter-spacing: .32em;
    text-transform: uppercase;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }
  .gs-eyebrow .bar {
    display: block;
    width: 28px;
    height: 1px;
    background: var(--lavender);
    opacity: .6;
    flex-shrink: 0;
  }
  .gs-heading {
    font-family: var(--serif);
    font-size: clamp(2rem, 5vw, 2.8rem);
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -.02em;
    color: var(--paper);
    margin-bottom: 12px;
  }
  .gs-heading em { font-style: italic; color: var(--lavender); }
  .gs-sub {
    font-size: 1rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 44px;
  }

  /* Form */
  .gs-form { display: flex; flex-direction: column; gap: 20px; }
  .gs-field { display: flex; flex-direction: column; gap: 8px; }
  .gs-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .gs-input {
    background: rgba(20,12,30,.6);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 14px 18px;
    font-family: var(--sans);
    font-size: 15px;
    color: var(--paper);
    outline: none;
    transition: border-color .2s, background .2s;
    width: 100%;
  }
  .gs-input::placeholder { color: var(--muted); opacity: .6; }
  .gs-input:focus {
    border-color: rgba(199,157,240,.4);
    background: rgba(30,16,44,.7);
  }

  /* Checkbox group */
  .gs-checkbox-group { display: flex; flex-direction: column; gap: 10px; }
  .gs-checkbox-option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    background: rgba(20,12,30,.5);
    border: 1px solid var(--line);
    border-radius: 10px;
    cursor: pointer;
    transition: border-color .2s, background .2s;
    user-select: none;
  }
  .gs-checkbox-option:hover {
    border-color: rgba(199,157,240,.3);
    background: rgba(109,47,145,.08);
  }
  .gs-checkbox-option.selected {
    border-color: rgba(199,157,240,.5);
    background: rgba(109,47,145,.14);
  }
  .gs-checkbox-box {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1.5px solid var(--muted);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color .2s, background .2s;
  }
  .gs-checkbox-option.selected .gs-checkbox-box {
    border-color: var(--lavender);
    background: rgba(199,157,240,.15);
  }
  .gs-checkbox-tick {
    width: 10px;
    height: 10px;
    opacity: 0;
    transform: scale(0);
    transition: opacity .15s, transform .15s;
  }
  .gs-checkbox-option.selected .gs-checkbox-tick { opacity: 1; transform: scale(1); }
  .gs-checkbox-label { font-size: 14.5px; color: var(--paper); }

  /* Submit */
  .gs-submit {
    margin-top: 8px;
    padding: 15px 32px;
    background: var(--lavender);
    color: var(--void);
    border: none;
    border-radius: 999px;
    font-family: var(--mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: .08em;
    cursor: pointer;
    transition: opacity .2s, transform .15s;
    align-self: flex-start;
  }
  .gs-submit:hover { opacity: .88; transform: translateY(-1px); }
  .gs-submit:active { transform: translateY(0); }
  .gs-submit:disabled { opacity: .5; cursor: default; }

  /* Thank-you */
  .gs-thanks {
    text-align: center;
    padding: 60px 0;
    animation: gsUp .5s ease forwards;
  }
  .gs-thanks-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1.5px solid var(--lavender);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 28px;
    color: var(--lavender);
    font-size: 22px;
  }
  .gs-thanks h2 {
    font-family: var(--serif);
    font-size: 2rem;
    font-weight: 400;
    color: var(--paper);
    margin-bottom: 12px;
  }
  .gs-thanks p { color: var(--muted); line-height: 1.6; margin-bottom: 32px; }
  .gs-back {
    font-family: var(--mono);
    font-size: 12px;
    letter-spacing: .08em;
    color: var(--lavender);
    text-decoration: none;
    transition: opacity .2s;
  }
  .gs-back:hover { opacity: .7; }

  @keyframes gsUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 600px) {
    .gs-nav-links { gap: 16px; }
    .gs-main { padding-top: 120px; }
  }
`;

function GetStarted() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleInterest(value: string) {
    setInterests(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ firstName, email, interests });
    setSubmitted(true);
  }

  return (
    <div className="gs-root">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav className="gs-nav">
        <div className="gs-nav-in">
          <Link to="/" className="gs-wordmark">
            Big Context<sup>™</sup>
            <span style={{ color: "var(--muted)", fontWeight: 400 }}>&amp; Company</span>
          </Link>
          <div className="gs-nav-links">
            <Link to="/#pragmatics">Pragmatics</Link>
            <Link to="/#what">Platform</Link>
            <Link to="/services">Practice</Link>
          </div>
        </div>
      </nav>

      <main className="gs-main">
        <div className="gs-card">
          {submitted ? (
            <div className="gs-thanks">
              <div className="gs-thanks-icon">✓</div>
              <h2>You're on our radar.</h2>
              <p>We'll be in touch shortly. In the meantime, feel free to explore what we're building.</p>
              <Link to="/" className="gs-back">← Back to home</Link>
            </div>
          ) : (
            <>
              <div className="gs-eyebrow"><span className="bar" />Get Started</div>
              <h1 className="gs-heading">
                Let's make your data<br /><em>work at AI-scale.</em>
              </h1>
              <p className="gs-sub">Tell us what you're looking for and we'll be in touch.</p>

              <form className="gs-form" onSubmit={handleSubmit}>
                <div className="gs-field">
                  <label className="gs-label">First name</label>
                  <input
                    className="gs-input"
                    type="text"
                    placeholder="Jane"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="gs-field">
                  <label className="gs-label">Work email</label>
                  <input
                    className="gs-input"
                    type="email"
                    placeholder="jane@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="gs-field">
                  <label className="gs-label">I'm interested in</label>
                  <div className="gs-checkbox-group">
                    {INTERESTS.map(opt => (
                      <div
                        key={opt.value}
                        className={`gs-checkbox-option${interests.includes(opt.value) ? " selected" : ""}`}
                        onClick={() => toggleInterest(opt.value)}
                      >
                        <div className="gs-checkbox-box">
                          <svg className="gs-checkbox-tick" viewBox="0 0 10 10" fill="none">
                            <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="var(--lavender)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="gs-checkbox-label">{opt.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="gs-submit"
                  disabled={!firstName || !email || interests.length === 0}
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
