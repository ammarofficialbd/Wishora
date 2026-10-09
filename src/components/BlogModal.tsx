import React, { useState } from 'react';
import { X, Clock, Calendar, Share2, Check, MessageCircle, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BlogPost, TemplateItem } from '../types';
import { TEMPLATES } from '../data/templates';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSelectTemplate?: (templateId: string) => void;
  onOpenInquiry?: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  post,
  onClose,
  onSelectTemplate,
  onOpenInquiry,
}) => {
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const relatedTemplate: TemplateItem | undefined = post.relatedTemplateId
    ? TEMPLATES.find((t) => t.id === post.relatedTemplateId)
    : undefined;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Check out this story on Wishora: "${post.title}" - ${window.location.origin}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E6DACB] flex flex-col max-h-[92vh] overflow-hidden z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-[#EAE3D6] bg-white/70 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7A0C38]">
              <BookOpen className="w-4 h-4" />
              <span>Wishora Inspiration &amp; Stories</span>
            </div>

            <div className="flex items-center gap-2">
              {/* WhatsApp Share */}
              <button
                onClick={handleWhatsAppShare}
                title="Share via WhatsApp"
                className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
                aria-label="Share to WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>

              {/* Copy Link */}
              <button
                onClick={handleShare}
                title="Copy link"
                className="p-2 rounded-full bg-white hover:bg-[#F2ECE2] text-[#2B1724] border border-[#E0D4C3] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                aria-label="Copy link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white hover:bg-[#F2ECE2] text-[#2B1724] border border-[#E0D4C3] transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Article Body */}
          <div className="overflow-y-auto px-5 sm:px-8 md:px-12 py-6 sm:py-8 space-y-6 sm:space-y-8 no-scrollbar">
            {/* Header Meta */}
            <div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#7A685D] mb-3">
                <span className="px-3 py-1 rounded-full bg-[#F2ECE2] text-[#7A0C38] font-bold tracking-wide uppercase">
                  {post.categoryLabel}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.publishedAt}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1724] font-serif-luxury leading-tight mb-2">
                {post.title}
              </h1>

              {post.titleBn && (
                <p className="text-base sm:text-lg text-[#7A0C38] font-medium mb-4">
                  {post.titleBn}
                </p>
              )}

              {/* Author badge */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#EAE3D6]/70">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E0D4C3]"
                />
                <div>
                  <p className="text-sm font-semibold text-[#2B1724]">{post.author.name}</p>
                  <p className="text-xs text-[#7A685D]">{post.author.role}</p>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-md border border-[#E6DACB]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Excerpt Lead */}
            <p className="text-base sm:text-lg text-[#3A2E28] leading-relaxed font-serif-luxury italic border-l-4 border-[#7A0C38] pl-4 sm:pl-5 bg-white/60 py-3 rounded-r-xl">
              {post.excerpt}
            </p>

            {/* Main Article Sections */}
            <div className="space-y-6 text-[#4A3B34] text-sm sm:text-base leading-relaxed">
              {post.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3.5">
                  {sec.heading && (
                    <h3 className="text-xl sm:text-2xl font-bold text-[#2B1724] font-serif-luxury pt-2">
                      {sec.heading}
                    </h3>
                  )}

                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {sec.quote && (
                    <div className="my-5 p-5 rounded-2xl bg-gradient-to-r from-[#FAF2E8] to-[#F5ECE0] border border-[#E4D5C3] text-[#7A0C38] font-serif-luxury italic text-base sm:text-lg shadow-2xs">
                      “{sec.quote}”
                    </div>
                  )}

                  {sec.tips && sec.tips.length > 0 && (
                    <div className="my-4 p-5 rounded-2xl bg-white border border-[#E5DACB] shadow-2xs space-y-2.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#7A0C38]">
                        Key Highlights &amp; Takeaways:
                      </p>
                      <ul className="space-y-2 text-sm text-[#3A2E28]">
                        {sec.tips.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#7A0C38]/10 text-[#7A0C38] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                              ✓
                            </span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="pt-4 border-t border-[#EAE3D6] flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#7A685D] uppercase tracking-wider">Tags:</span>
              {post.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E2D4C3] text-xs text-[#5D4A41]"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Related Template Promotion Card */}
            {relatedTemplate && (
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#7A0C38] via-[#8C1645] to-[#540826] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-medium text-rose-100">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Featured in this story</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold font-serif-luxury text-white">
                      {relatedTemplate.name}
                    </h4>
                    <p className="text-xs text-rose-100/90 max-w-md">
                      {relatedTemplate.aesthetic || relatedTemplate.description}
                    </p>
                    <p className="text-sm font-bold text-amber-300 pt-1">
                      From {relatedTemplate.currency}{relatedTemplate.discountPrice}{' '}
                      <span className="line-through text-xs font-normal text-rose-200/70">
                        {relatedTemplate.currency}{relatedTemplate.originalPrice}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                    {onSelectTemplate && (
                      <button
                        onClick={() => {
                          onClose();
                          onSelectTemplate(relatedTemplate.id);
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-[#7A0C38] text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                      >
                        Preview Live Demo
                      </button>
                    )}
                    <a
                      href={`https://wa.me/8801411390983?text=${encodeURIComponent(`Hi Wishora, I read your blog article "${post.title}" and would like to order or customize the "${relatedTemplate.name}" template!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wide transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A685D]">
              <p>Liked this article? Share it with family and friends planning a special celebration.</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#F2ECE2] text-[#2B1724] border border-[#E0D4C3] font-medium transition-colors cursor-pointer"
                >
                  Close Article
                </button>
                {onOpenInquiry && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenInquiry();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#7A0C38] hover:bg-[#911244] text-white font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Contact Our Team</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
