import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Cpu, User, Settings, Plus, MessageSquare, ArrowLeft, Copy, Check, Trash2, Menu, X, Paperclip, FileText, Bot, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../utils/i18n';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const suggestions = [
  'Process all pending invoices',
  'Show ERP sync status',
  'Generate monthly report',
  'Analyze vendor performance',
];

const ChatPage: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...newFiles]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSend = (text?: string) => {
    const content = text || input;
    if (!content.trim() && attachedFiles.length === 0) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content + (attachedFiles.length > 0 ? `\n\n[Attached ${attachedFiles.length} file(s)]` : ''),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setAttachedFiles([]);
    setIsTyping(true);

    const textarea = document.getElementById('chat-input');
    if (textarea) textarea.style.height = 'auto';

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: t.chat.processing_msg.replace('{0}', content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-screen w-full bg-background text-foreground font-sans overflow-hidden selection:bg-primary/20 selection:text-primary">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://iili.io/q4wto4p.md.png" alt="INVODEX Logo" className="h-6 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-1">
            <button onClick={handleClearChat} className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded-lg hover:bg-muted/50" title={t.chat.clear_chat}>
              <Trash2 className="w-4 h-4" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted/50" title={t.chat.new_session}>
              <Plus className="w-4 h-4" />
            </button>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-muted/50">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-xs font-semibold text-muted-foreground/60 px-2 py-2 uppercase tracking-wider">{t.chat.recent_chats}</div>
          {['Invoice Processing', 'ERP Sync Status', 'Vendor Inquiry'].map((chat, i) => (
            <button key={i} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center gap-2.5 transition-colors ${
              i === 0
                ? 'bg-muted/50 text-foreground'
                : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
            }`}>
              <MessageSquare className={`w-4 h-4 shrink-0 ${i === 0 ? 'text-primary' : ''}`} />
              <span className="truncate">{chat}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <button className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-full p-2.5 rounded-lg hover:bg-muted/50">
            <Settings className="w-4 h-4" />
            <span>{t.chat.settings}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative w-full bg-background">
        <header className="h-14 border-b border-border flex items-center justify-between px-4 md:px-6 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-muted-foreground hover:text-foreground p-1.5 -ml-1 rounded-lg hover:bg-muted/50">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-medium text-sm text-foreground">{t.chat.active_session}</span>
            </div>
          </div>
          <Link
            to="/"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">{t.chat.return_home}</span>
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto scroll-smooth">
          {isEmpty ? (
            <div className="h-full flex flex-col items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-lg"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{t.chat.welcome}</h2>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                  Ask me anything about your invoices, ERP data, or workflow automation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {suggestions.map((suggestion, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      onClick={() => handleSend(suggestion)}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-primary/20 transition-all text-left text-sm text-muted-foreground hover:text-foreground group"
                    >
                      <Sparkles className="w-4 h-4 text-primary/60 group-hover:text-primary shrink-0 transition-colors" />
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="p-4 md:p-8 space-y-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`group flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role !== 'user' && (
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'system' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                          {msg.role === 'system' ? <Terminal className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                        </div>
                      )}

                      <div className={`relative max-w-[75%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : msg.role === 'system'
                            ? 'bg-transparent border border-border text-muted-foreground text-sm'
                            : 'bg-card border border-border text-foreground shadow-sm rounded-bl-md'
                      }`}>
                        {msg.role === 'assistant' || msg.role === 'system' ? (
                          <div className="text-sm leading-relaxed whitespace-pre-wrap prose prose-sm max-w-none prose-invert">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                          </div>
                        )}

                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className={`absolute -bottom-8 ${msg.role === 'user' ? 'right-0' : 'left-0'} p-1 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:text-foreground text-xs flex items-center gap-1`}
                          title="Copy message"
                        >
                          {copiedId === msg.id ? <><Check className="w-3 h-3 text-green-500" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                        </button>
                      </div>

                      {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 md:px-6 md:pb-6 bg-background border-t border-border">
          {attachedFiles.length > 0 && (
            <div className="max-w-4xl mx-auto mb-3 flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-1.5 text-xs text-foreground">
                  <FileText className="w-3 h-3 text-muted-foreground" />
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <button
                    onClick={() => setAttachedFiles(prev => prev.filter((_, i) => i !== index))}
                    className="hover:text-destructive transition-colors ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="max-w-4xl mx-auto relative">
            <textarea
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder={t.chat.placeholder}
              className="w-full bg-card border border-border rounded-2xl py-3.5 pl-4 pr-28 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none shadow-sm"
              rows={1}
              style={{ minHeight: '52px', maxHeight: '200px', overflowY: 'auto' }}
            />

            <div className="absolute right-2 bottom-2 flex items-center gap-1.5">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.csv,.xlsx"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                title={t.chat.upload_invoice}
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSend()}
                disabled={(!input.trim() && attachedFiles.length === 0) || isTyping}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-center mt-2.5 text-xs text-muted-foreground/60">
            {t.chat.disclaimer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
