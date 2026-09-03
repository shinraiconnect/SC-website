"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const subject = `Strategy session request from ${values.get("name")}`;
    const body = `Name: ${values.get("name")}\nEmail: ${values.get("email")}\nBusiness: ${values.get("business")}\n\nGoals:\n${values.get("message")}`;
    window.location.href = `mailto:shinraiconnect@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }
  return <form className="contact-form" onSubmit={submit}><div className="form-row"><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@company.com" /></label></div><label>Business / brand<input name="business" required placeholder="What are you building?" /></label><label>What should we grow?<textarea name="message" required rows={4} placeholder="Tell us where you want to go..." /></label><button className="dark-button" type="submit">{sent ? "Draft ready · send it ↗" : "Send your brief ↗"}</button></form>;
}
