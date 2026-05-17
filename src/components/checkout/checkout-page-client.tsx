'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { AlertTriangle, Check, ChevronRight, CreditCard, Lock } from 'lucide-react';
import { useCartStore } from '@/lib/store-cart';
import { formatPrice } from '@/lib/products';
import { useLang } from '@/lib/i18n';

type FormData = {
  nome: string;
  email: string;
  telefone?: string;
  rua: string;
  codigoPostal: string;
  cidade: string;
  pais: string;
};

const STEP_FIELDS: Record<number, (keyof FormData)[]> = {
  1: ['nome', 'email'],
  2: ['rua', 'codigoPostal', 'cidade', 'pais'],
  3: [],
};

const inputClass = (hasError?: boolean) =>
  `w-full bg-surface border rounded-xl px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted/40 outline-none transition-colors focus:border-accent/60 ${
    hasError ? 'border-destructive' : 'border-border hover:border-border-strong'
  }`;

export function CheckoutPageClient() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useLang();

  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const shipping = useCartStore((s) => s.shipping);
  const total = useCartStore((s) => s.total);
  const clear = useCartStore((s) => s.clear);

  const schema = z.object({
    nome: z.string().min(2, t.checkout.errorName),
    email: z.string().email(t.checkout.errorEmail),
    telefone: z.string().optional(),
    rua: z.string().min(3, t.checkout.errorAddress),
    codigoPostal: z.string().min(4, t.checkout.errorPostalCode),
    cidade: z.string().min(2, t.checkout.errorCity),
    pais: z.string().min(2, t.checkout.errorCountry),
  });

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { pais: 'Portugal' },
  });

  const STEPS = [
    { id: 1, label: t.checkout.stepContact },
    { id: 2, label: t.checkout.stepAddress },
    { id: 3, label: t.checkout.stepPayment },
  ] as const;

  async function advance() {
    const fields = STEP_FIELDS[step];
    if (fields.length > 0) {
      const valid = await trigger(fields);
      if (!valid) return;
    }

    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }

    setLoading(true);
    const orderNum = 'MD-' + Math.floor(100000 + Math.random() * 900000);
    await new Promise((r) => setTimeout(r, 1400));
    clear();
    router.push(`/checkout/sucesso?order=${orderNum}`);
  }

  if (items.length === 0 && !loading) {
    return (
      <main className="px-4 py-16 min-h-[80vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-mono uppercase tracking-wider text-muted">{t.checkout.emptyCart}</p>
          <Link href="/loja" className="block text-accent hover:underline underline-offset-4 font-mono text-sm">
            {t.checkout.viewProducts} →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-16 min-h-[80vh]">
      <div className="max-w-4xl mx-auto">
        {/* Demo banner */}
        <div className="flex items-center gap-3 bg-surface border border-border rounded-xl px-5 py-3.5 mb-10">
          <AlertTriangle className="w-4 h-4 text-accent shrink-0" />
          <p className="text-sm font-mono text-muted-foreground">
            {t.checkout.demoBanner}
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center mb-14">
          {STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div
                className={`flex items-center gap-2.5 ${
                  step >= s.id ? 'text-foreground' : 'text-muted/30'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold border shrink-0 transition-colors ${
                    step > s.id
                      ? 'bg-accent border-accent text-accent-foreground'
                      : step === s.id
                      ? 'border-accent text-accent'
                      : 'border-border text-muted/40'
                  }`}
                >
                  {step > s.id ? <Check className="w-3 h-3" /> : s.id}
                </div>
                <span className="text-xs font-mono uppercase tracking-wide hidden sm:block">
                  {s.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`h-px flex-1 mx-3 transition-colors ${
                    step > s.id ? 'bg-accent/30' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Form steps */}
          <div>
            {/* Step 1 — Contact */}
            {step === 1 && (
              <div className="space-y-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted mb-6">
                  {t.checkout.contactSectionTitle}
                </p>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                    {t.checkout.fullName} *
                  </label>
                  <input
                    {...register('nome')}
                    placeholder="Rafael Ferreira"
                    autoComplete="name"
                    className={inputClass(!!errors.nome)}
                  />
                  {errors.nome && (
                    <p className="text-[11px] text-destructive mt-1 font-mono">{errors.nome.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="rafael@exemplo.com"
                    autoComplete="email"
                    className={inputClass(!!errors.email)}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-destructive mt-1 font-mono">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                    {t.checkout.phone}
                  </label>
                  <input
                    {...register('telefone')}
                    type="tel"
                    placeholder="+351 912 345 678"
                    autoComplete="tel"
                    className={inputClass()}
                  />
                </div>
              </div>
            )}

            {/* Step 2 — Address */}
            {step === 2 && (
              <div className="space-y-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted mb-6">
                  {t.checkout.addressSectionTitle}
                </p>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                    {t.checkout.streetAndNumber} *
                  </label>
                  <input
                    {...register('rua')}
                    placeholder="Rua das Flores, 42, 2.º Esq."
                    autoComplete="street-address"
                    className={inputClass(!!errors.rua)}
                  />
                  {errors.rua && (
                    <p className="text-[11px] text-destructive mt-1 font-mono">{errors.rua.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                      {t.checkout.postalCode} *
                    </label>
                    <input
                      {...register('codigoPostal')}
                      placeholder="1000-001"
                      autoComplete="postal-code"
                      className={inputClass(!!errors.codigoPostal)}
                    />
                    {errors.codigoPostal && (
                      <p className="text-[11px] text-destructive mt-1 font-mono">
                        {errors.codigoPostal.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                      {t.checkout.city} *
                    </label>
                    <input
                      {...register('cidade')}
                      placeholder="Lisboa"
                      autoComplete="address-level2"
                      className={inputClass(!!errors.cidade)}
                    />
                    {errors.cidade && (
                      <p className="text-[11px] text-destructive mt-1 font-mono">{errors.cidade.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                    {t.checkout.country} *
                  </label>
                  <input
                    {...register('pais')}
                    placeholder="Portugal"
                    autoComplete="country-name"
                    className={inputClass(!!errors.pais)}
                  />
                </div>
              </div>
            )}

            {/* Step 3 — Payment (mock) */}
            {step === 3 && (
              <div className="space-y-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted mb-6">
                  {t.checkout.paymentSectionTitle}
                </p>

                <div className="bg-surface border border-border rounded-2xl p-6 space-y-5">
                  <div className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-muted/50" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted/50">
                      {t.checkout.securePayment}
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                      {t.checkout.cardNumber}
                    </label>
                    <div className="flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3 opacity-50">
                      <CreditCard className="w-4 h-4 text-muted/60 shrink-0" />
                      <input
                        disabled
                        defaultValue="4242 4242 4242 4242"
                        className="bg-transparent text-sm font-mono text-muted-foreground w-full cursor-not-allowed outline-none tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                        {t.checkout.expiry}
                      </label>
                      <input
                        disabled
                        defaultValue="12 / 28"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-mono text-muted-foreground cursor-not-allowed outline-none opacity-50 tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
                        {t.checkout.cvv}
                      </label>
                      <input
                        disabled
                        defaultValue="•••"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-mono text-muted-foreground cursor-not-allowed outline-none opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[11px] font-mono text-muted/50 px-1">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 text-accent/50 shrink-0" />
                  {t.checkout.demoPaymentNote}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={loading}
                  className="flex-1 border border-border text-muted-foreground font-mono text-sm uppercase tracking-widest px-6 py-4 rounded-xl hover:border-border-strong hover:text-foreground transition-colors disabled:opacity-50"
                >
                  {t.checkout.back}
                </button>
              )}
              <button
                type="button"
                onClick={advance}
                disabled={loading}
                className="flex-1 bg-accent text-accent-foreground font-mono font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="font-mono tracking-widest">{t.checkout.processing}</span>
                ) : step < 3 ? (
                  <>
                    {t.checkout.continue}
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  t.checkout.confirmOrder
                )}
              </button>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-surface border border-border rounded-2xl p-5 space-y-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted">
                {t.checkout.summary}
              </p>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-muted-foreground">
                  <span>{t.checkout.subtotal}</span>
                  <span className="tabular-nums">{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t.checkout.shipping}</span>
                  <span className={shipping() === 0 ? 'text-accent' : 'tabular-nums'}>
                    {shipping() === 0 ? t.checkout.free : formatPrice(shipping())}
                  </span>
                </div>
                <div className="flex justify-between text-foreground font-bold text-sm pt-2.5 border-t border-border">
                  <span>{t.checkout.total}</span>
                  <span className="tabular-nums">{formatPrice(total())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
