'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/lib/i18n';

type FlowKey = 'welcome' | 'ai' | 'delivery' | 'returns' | 'create' | 'shippingCost' | 'support' | 'fallback';

type ChatT = {
  headerTitle: string;
  inputPlaceholder: string;
  sendLabel: string;
  openLabel: string;
  closeLabel: string;
  welcomeMsg: string;
  aiMsg: string;
  deliveryMsg: string;
  returnsMsg: string;
  createMsg: string;
  shippingCostMsg: string;
  supportMsg: string;
  fallbackMsg: string;
  btnAi: string;
  btnDelivery: string;
  btnReturns: string;
  btnCreate: string;
  btnShippingCost: string;
  btnSupport: string;
  btnTryNow: string;
  btnMoreQuestions: string;
  btnGoToCreate: string;
  btnUseGenerator: string;
  btnViewProducts: string;
  btnGoToContact: string;
};

type QuickReply = { label: string; flowKey?: FlowKey; href?: string };
type ChatMessage = { role: 'bot' | 'user'; content: string; quickReplies?: QuickReply[] };

function getFlow(key: FlowKey, ct: ChatT): { text: string; replies: QuickReply[] } {
  const welcomeReplies: QuickReply[] = [
    { label: ct.btnAi, flowKey: 'ai' },
    { label: ct.btnDelivery, flowKey: 'delivery' },
    { label: ct.btnReturns, flowKey: 'returns' },
    { label: ct.btnCreate, flowKey: 'create' },
  ];
  switch (key) {
    case 'ai':
      return {
        text: ct.aiMsg,
        replies: [
          { label: ct.btnTryNow, href: '/criar' },
          { label: ct.btnMoreQuestions, flowKey: 'welcome' },
        ],
      };
    case 'delivery':
      return {
        text: ct.deliveryMsg,
        replies: [
          { label: ct.btnShippingCost, flowKey: 'shippingCost' },
          { label: ct.btnMoreQuestions, flowKey: 'welcome' },
        ],
      };
    case 'returns':
      return {
        text: ct.returnsMsg,
        replies: [
          { label: ct.btnSupport, flowKey: 'support' },
          { label: ct.btnMoreQuestions, flowKey: 'welcome' },
        ],
      };
    case 'create':
      return {
        text: ct.createMsg,
        replies: [
          { label: ct.btnGoToCreate, href: '/criar' },
          { label: ct.btnUseGenerator, href: '/criar' },
        ],
      };
    case 'shippingCost':
      return {
        text: ct.shippingCostMsg,
        replies: [
          { label: ct.btnViewProducts, href: '/loja' },
          { label: ct.btnMoreQuestions, flowKey: 'welcome' },
        ],
      };
    case 'support':
      return {
        text: ct.supportMsg,
        replies: [{ label: ct.btnGoToContact, href: '/contactos' }],
      };
    case 'fallback':
      return { text: ct.fallbackMsg, replies: welcomeReplies };
    case 'welcome':
    default:
      return { text: ct.welcomeMsg, replies: welcomeReplies };
  }
}

function matchInput(input: string): FlowKey {
  const s = input.toLowerCase();
  if (/intelig|funciona.{0,6}ia|how.{0,6}ai|ai.{0,6}work/.test(s)) return 'ai';
  if (/entrega|demora|prazo|delivery|how.{0,6}long|ship/.test(s)) return 'delivery';
  if (/devol|troca|return|refund/.test(s)) return 'returns';
  if (/criar|design|como.{0,4}cr|how.{0,4}cr|prompt/.test(s)) return 'create';
  if (/custo|preco|frete|cost|price/.test(s)) return 'shippingCost';
  if (/suporte|contacto|support|contact|ajuda\b|help/.test(s)) return 'support';
  return 'fallback';
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/40"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function SupportChat() {
  const { t, lang } = useLang();
  const ct = (t as unknown as { chat: ChatT }).chat;
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset chat state when language changes so messages appear in the new language
  useEffect(() => {
    setInitialized(false);
    setMessages([]);
    setIsTyping(false);
    setOpen(false);
    setUnread(1);
  }, [lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function openChat() {
    setOpen(true);
    setUnread(0);
    if (!initialized) {
      setInitialized(true);
      const flow = getFlow('welcome', ct);
      setMessages([{ role: 'bot', content: flow.text, quickReplies: flow.replies }]);
    }
  }

  function closeChat() {
    setOpen(false);
  }

  function postBotReply(flowKey: FlowKey) {
    const flow = getFlow(flowKey, ct);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: flow.text, quickReplies: flow.replies },
      ]);
    }, 800);
  }

  function handleQuickReply(reply: QuickReply) {
    if (reply.href) {
      router.push(reply.href);
      setOpen(false);
      return;
    }
    if (reply.flowKey) {
      setMessages((prev) => [...prev, { role: 'user', content: reply.label }]);
      postBotReply(reply.flowKey);
    }
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    postBotReply(matchInput(trimmed));
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: 'min(380px, calc(100vw - 2rem))',
              height: 500,
              background: '#0f0f0f',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: '#dafe22' }}
              >
                <Bot className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm font-mono font-bold text-foreground flex-1">
                {ct.headerTitle}
              </span>
              <button
                onClick={closeChat}
                aria-label={ct.closeLabel}
                className="text-muted hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className="max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed"
                    style={
                      msg.role === 'bot'
                        ? { background: '#1a1a1a', color: '#fafafa' }
                        : { background: '#dafe22', color: '#0a0a0a' }
                    }
                  >
                    {msg.content}
                  </div>
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 max-w-full">
                      {msg.quickReplies.map((reply, j) => (
                        <QuickReplyButton key={j} reply={reply} onClick={handleQuickReply} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start">
                  <div className="rounded-xl" style={{ background: '#1a1a1a' }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-4 py-3 shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={ct.inputPlaceholder}
                className="flex-1 bg-transparent text-sm font-mono text-foreground placeholder:text-muted/40 outline-none"
              />
              <button
                onClick={handleSend}
                aria-label={ct.sendLabel}
                disabled={!input.trim()}
                className="shrink-0 transition-opacity disabled:opacity-30"
                style={{ color: '#dafe22' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        onClick={open ? closeChat : openChat}
        aria-label={ct.openLabel}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ background: '#dafe22' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6 text-black" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6 text-black" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && unread > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-white"
            style={{ background: '#ff4d2e' }}
          >
            {unread}
          </span>
        )}
      </button>
    </div>
  );
}

function QuickReplyButton({
  reply,
  onClick,
}: {
  reply: QuickReply;
  onClick: (r: QuickReply) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onClick(reply)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-xs font-mono px-3 py-1.5 rounded-lg transition-colors"
      style={{
        border: '1px solid #dafe22',
        background: hovered ? '#dafe22' : 'transparent',
        color: hovered ? '#0a0a0a' : '#dafe22',
      }}
    >
      {reply.label}
    </button>
  );
}
