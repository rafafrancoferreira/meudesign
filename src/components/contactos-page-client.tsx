'use client';

import { contactInfo } from '@/lib/content';
import { ContactoForm } from '@/components/contacto-form';
import { Mail, MapPin, AtSign } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export function ContactosPageClient() {
  const { t } = useLang();

  return (
    <main className="px-4 py-16 min-h-[80vh]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14 border-b border-border pb-10">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-3">
            {t.contactos.tagline}
          </p>
          <h1
            className="font-display font-black uppercase leading-none text-foreground"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.025em' }}
          >
            {t.contactos.title}
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-14">
          {/* Form */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted mb-8">
              {t.contactos.sendMessage}
            </p>
            <ContactoForm />
          </div>

          {/* Info block */}
          <div className="space-y-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted">
              {t.contactos.contactInfoLabel}
            </p>

            {/* Email */}
            <div className="bg-surface border border-border rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-3">
                <Mail className="w-3.5 h-3.5" />
                {t.contactoForm.email}
              </div>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-sm font-mono text-foreground hover:text-accent transition-colors"
              >
                {contactInfo.email}
              </a>
              <p className="text-[11px] font-mono text-muted/60">{t.contactos.replyTime}</p>
            </div>

            {/* Social */}
            <div className="bg-surface border border-border rounded-xl p-5 space-y-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1">
                {t.contactos.socialMedia}
              </p>
              <a
                href={contactInfo.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <AtSign className="w-4 h-4 shrink-0" />
                {contactInfo.instagram.label}
              </a>
              <a
                href={contactInfo.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
                </svg>
                {contactInfo.tiktok.label}
              </a>
            </div>

            {/* Address */}
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-3">
                <MapPin className="w-3.5 h-3.5" />
                {t.contactos.location}
              </div>
              <address className="not-italic space-y-1">
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                  {contactInfo.address.institution}
                </p>
                <p className="text-xs font-mono text-muted-foreground">{contactInfo.address.street}</p>
                <p className="text-xs font-mono text-muted-foreground">{contactInfo.address.postalCode}</p>
                <p className="text-xs font-mono text-muted-foreground">{contactInfo.address.country}</p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
