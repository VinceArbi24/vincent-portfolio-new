"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Linkedin } from "lucide-react";
import SectionFrame from "@/components/ui/SectionFrame";
import MangaButton from "@/components/ui/MangaButton";
import Toast from "@/components/ui/Toast";
import { SITE } from "@/lib/data/site";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyWhatsApp = async () => {
    try {
      await navigator.clipboard.writeText(SITE.whatsapp);
    } catch {
      // Clipboard API unavailable — the number is still visible to copy manually.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2600);
  };

  return (
    <SectionFrame
      id="contact"
      frame="09"
      total="09"
      eyebrow="CHAPTER 09 — FINAL FRAME"
      title="Let's Work Together"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6"
        >
          <p className="font-hand text-3xl text-ink-950 sm:text-4xl">
            Have a project in mind?
          </p>
          <p className="mt-2 max-w-md font-sans text-lg text-fog-600 sm:text-xl">
            Let&apos;s create something worth stopping the scroll for.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <MangaButton
              href={SITE.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
              cursorLabel="MAIL"
              icon={<Mail size={14} />}
            >
              CONTACT ME ON GMAIL
            </MangaButton>

            <MangaButton
              onClick={copyWhatsApp}
              cursorLabel="COPY"
              icon={<Copy size={14} />}
            >
              COPY WHATSAPP NUMBER
            </MangaButton>

            <MangaButton
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              cursorLabel="IN"
              icon={<Linkedin size={14} />}
            >
              CONNECT ON LINKEDIN
            </MangaButton>
          </div>

          <p className="mt-4 font-sans text-xs text-fog-500">
            Prefer your own mail client?{" "}
            <a href={SITE.mailto} className="underline underline-offset-2 hover:text-ink-950">
              Use the mailto link instead.
            </a>
          </p>
        </motion.div>

        {/* Final credits panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="panel-corners relative flex flex-col justify-between border-2 border-ink-950 bg-ink-950 p-8 text-paper-100 lg:col-span-6"
        >
          <div className="screentone pointer-events-none absolute inset-0 opacity-[0.08]" />
          <div className="relative">
            <p className="font-sfx text-[10px] tracking-widest2 text-paper-100/60">
              END OF VOLUME 01
            </p>
            <h3 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-tight text-paper-0 sm:text-5xl">
              {SITE.name}
            </h3>
            <p className="mt-2 font-sfx text-xs tracking-widest2 text-paper-100/70">
              {SITE.role.toUpperCase()}
            </p>
          </div>

          <dl className="relative mt-10 flex flex-col gap-4 border-t border-paper-100/20 pt-6">
            <div className="flex items-center justify-between gap-4">
              <dt className="font-sans text-xs uppercase tracking-widest text-paper-100/50">
                Email
              </dt>
              <dd className="font-sans text-sm text-paper-0 sm:text-base">
                {SITE.email}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="font-sans text-xs uppercase tracking-widest text-paper-100/50">
                WhatsApp
              </dt>
              <dd className="font-sans text-sm text-paper-0 sm:text-base">
                {SITE.whatsapp}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="font-sans text-xs uppercase tracking-widest text-paper-100/50">
                LinkedIn
              </dt>
              <dd className="font-sans text-sm text-paper-0 sm:text-base">
                vincent-arbitrario
              </dd>
            </div>
          </dl>
        </motion.div>
      </div>

      <Toast
        show={copied}
        title="WHATSAPP NUMBER COPIED ✓"
        subtitle={SITE.whatsapp}
      />
    </SectionFrame>
  );
}
