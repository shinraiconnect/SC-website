import ContactForm from "../contact-form";

export default function ContactPage() {
  return <main className="standalone-page"><a className="back-link" href="/">← Back to Shinrai Connect</a><div className="standalone-grid"><div><p className="eyebrow">Let&apos;s connect. Let&apos;s grow.</p><h1>Tell us what<br /><em>you&apos;re building.</em></h1><p className="standalone-copy">Every plan starts with a free strategy session. Share your goals and we&apos;ll map the clearest route to growth.</p></div><ContactForm /></div></main>;
}
