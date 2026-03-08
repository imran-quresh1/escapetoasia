import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MessageBubble from './MessageBubble';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isBusinessHours, setIsBusinessHours] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if within business hours (Mon-Fri 9am-6pm, Sat 10am-4pm GMT)
    const checkBusinessHours = () => {
      const now = new Date();
      const day = now.getUTCDay(); // 0 = Sunday, 6 = Saturday
      const hour = now.getUTCHours();
      
      if (day >= 1 && day <= 5) { // Monday-Friday
        setIsBusinessHours(hour >= 9 && hour < 18);
      } else if (day === 6) { // Saturday
        setIsBusinessHours(hour >= 10 && hour < 16);
      } else {
        setIsBusinessHours(false);
      }
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (conversation) {
      const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
        setMessages(data.messages);
      });
      return unsubscribe;
    }
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOpen = async () => {
    setIsOpen(true);
    if (!conversation) {
      const newConversation = await base44.agents.createConversation({
        agent_name: 'customer_support',
        metadata: { source: 'website_chat' }
      });
      setConversation(newConversation);
      setMessages(newConversation.messages || []);
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isSending || !conversation) return;

    setIsSending(true);
    const messageText = inputMessage;
    setInputMessage('');

    try {
      await base44.agents.addMessage(conversation, {
        role: 'user',
        content: messageText
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const requestHumanAgent = () => {
    if (isBusinessHours) {
      setInputMessage('I would like to speak with a human agent please.');
    } else {
      setInputMessage('I would like to speak with a human agent. Please contact me at...');
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#D4A574] hover:bg-[#C49464] text-white rounded-full shadow-2xl flex items-center justify-center transition-colors group"
          >
            <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0F4C5C] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4A574] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Customer Support</h3>
                  <p className="text-xs text-white/70">
                    {isBusinessHours ? '🟢 Online' : '🌙 Offline'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F1EB]">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#D4A574]/20 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-[#D4A574]" />
                  </div>
                  <h4 className="font-semibold text-[#0F4C5C] mb-2">Welcome to GoEastAsia Holidays!</h4>
                  <p className="text-sm text-[#5C4033]/70">
                    How can we help you plan your perfect Asian adventure today?
                  </p>
                </div>
              )}
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Escalation Banner */}
            {isBusinessHours && (
              <div className="px-4 py-2 bg-[#D4A574]/10 border-t border-[#D4A574]/20">
                <button
                  onClick={requestHumanAgent}
                  className="text-xs text-[#0F4C5C] hover:text-[#D4A574] transition-colors flex items-center gap-2 mx-auto"
                >
                  <User className="w-3 h-3" />
                  Need more help? Speak with a human agent
                </button>
              </div>
            )}

            {!isBusinessHours && (
              <div className="px-4 py-2 bg-[#5C4033]/10 border-t border-[#5C4033]/20">
                <p className="text-xs text-[#5C4033]/70 flex items-center gap-2 justify-center">
                  <Clock className="w-3 h-3" />
                  Outside business hours. We'll respond via email.
                </p>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isSending}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isSending || !inputMessage.trim()}
                  className="bg-[#D4A574] hover:bg-[#C49464] px-4"
                >
                  {isSending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}