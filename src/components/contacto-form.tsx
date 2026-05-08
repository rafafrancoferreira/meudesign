'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Send } from 'lucide-react';

const schema = z.object({
  nome: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  assunto: z.string().min(3, 'Assunto obrigatório'),
  mensagem: z.string().min(10, 'Mensagem demasiado curta (mínimo 10 caracteres)'),
});

type FormData = z.infer<typeof schema>;

const inputClass = (hasError?: boolean) =>
  `w-full bg-background border rounded-xl px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted/40 outline-none transition-colors focus:border-accent/60 resize-none ${
    hasError ? 'border-destructive' : 'border-border hover:border-border-strong'
  }`;

export function ContactoForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSent(true);
    setLoading(false);
    reset();
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
        <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
          <Check className="w-7 h-7 text-accent" />
        </div>
        <div>
          <p className="text-sm font-mono uppercase tracking-wider text-foreground mb-2">
            Mensagem recebida
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            Responderemos em breve para o teu email.
          </p>
        </div>
        <button
          onClick={() => setSent(false)}
          className="text-xs font-mono uppercase tracking-wide text-accent hover:underline underline-offset-4"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
            Nome *
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
      </div>

      <div>
        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
          Assunto *
        </label>
        <input
          {...register('assunto')}
          placeholder="Ex: Dúvida sobre encomenda, Problema com design…"
          className={inputClass(!!errors.assunto)}
        />
        {errors.assunto && (
          <p className="text-[11px] text-destructive mt-1 font-mono">{errors.assunto.message}</p>
        )}
      </div>

      <div>
        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1.5">
          Mensagem *
        </label>
        <textarea
          {...register('mensagem')}
          rows={6}
          placeholder="Descreve a tua questão com o maior detalhe possível…"
          className={inputClass(!!errors.mensagem)}
        />
        {errors.mensagem && (
          <p className="text-[11px] text-destructive mt-1 font-mono">{errors.mensagem.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full sm:w-auto bg-accent text-accent-foreground font-mono font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-60"
      >
        {loading ? (
          <span>A enviar…</span>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Enviar mensagem
          </>
        )}
      </button>

      <p className="text-[10px] font-mono text-muted/50">
        Demo: nenhuma mensagem é efetivamente enviada.
      </p>
    </form>
  );
}
