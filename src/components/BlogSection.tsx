import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogPost, BlogCategory } from '../types';
import { BlogModal } from './BlogModal';

interface BlogSectionProps {
  onChooseTemplate?: () => void;
  onSelectTemplate?: (templateId: string) => void;
  onOpenInquiry?: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onChooseTemplate,
  onSelectTemplate,
  onOpenInquiry,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories: { key: BlogCategory; label: string }[] = [
    { key: 'all', label: 'All Stories' },
    { key: 'wedding', label: 'Wedding Trends' },
    { key: 'birthday', label: 'Birthday Surprises' },
    { key: 'guide', label: 'Guides & Tips' },
    { key: 'inspiration', label: 'Romantic Ideas' },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const featuredPost = filteredPosts.find((p) => p.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <section id="blog-section" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EAE3D6] relative">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header matching site consistency */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-[#8C5D2E] text-[11px] font-bold tracking-widest uppercase mb-3 font-display">
          <span>✦</span>
          <span>STORIES, GUIDES &amp; INSPIRATION</span>
          <span>✦</span>
        </div>

        <h2 className="text-[24px] sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2B1724] leading-[34.4px] sm:leading-[1.15] mb-4 font-serif-luxury">
          Celebration Stories &amp; Guides<br />
          <span className="italic font-serif-accent font-semibold text-[#7A0C38]">
            Ideas to Make Moments Unforgettable
          </span>
        </h2>

        <p className="text-sm sm:text-base text-[#6B574E] max-w-2xl mx-auto leading-relaxed">
          Expert advice on modern digital invitations, creative birthday surprises, etiquette guidelines, and smart celebration planning for your loved ones.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 no-scrollbar px-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#7A0C38] text-white shadow-md shadow-rose-900/15 scale-105'
                  : 'bg-white hover:bg-[#F2ECE2] text-[#4A3B34] border border-[#E4D7C6]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Blog Content */}
      <div className="space-y-8 sm:space-y-12">
        {/* Featured Card */}
        {featuredPost && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActivePost(featuredPost)}
            className="group cursor-pointer rounded-2xl sm:rounded-3xl bg-white border border-[#E5DACB] overflow-hidden shadow-md hover:shadow-xl hover:border-[#7A0C38]/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image Column */}
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#7A0C38] text-white text-[11px] font-bold tracking-wider uppercase shadow-sm">
                  ★ Featured Story
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium">
                  {featuredPost.categoryLabel}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-gradient-to-b from-white to-[#FAF6F0]">
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-xs text-[#7A685D]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredPost.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2B1724] font-serif-luxury group-hover:text-[#7A0C38] transition-colors leading-snug">
                  {featuredPost.title}
                </h3>

                {featuredPost.titleBn && (
                  <p className="text-xs sm:text-sm font-semibold text-[#8C1645]">
                    {featuredPost.titleBn}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-[#5D4A41] line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#EAE3D6] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#E0D4C3]"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#2B1724]">{featuredPost.author.name}</p>
                    <p className="text-[11px] text-[#7A685D]">{featuredPost.author.role}</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A0C38] group-hover:translate-x-1 transition-transform">
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Articles Grid */}
        {regularPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularPosts.map((post) => (
              <motion.article
                layout
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setActivePost(post)}
                className="group cursor-pointer rounded-2xl bg-white border border-[#E5DACB] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#7A0C38]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#F2ECE2]">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#7A0C38] text-[11px] font-bold shadow-2xs">
                        {post.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-[#7A685D]">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#2B1724] font-serif-luxury group-hover:text-[#7A0C38] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    {post.titleBn && (
                      <p className="text-xs font-medium text-[#8C1645] line-clamp-1">
                        {post.titleBn}
                      </p>
                    )}

                    <p className="text-xs text-[#5D4A41] line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#F0E6D8] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-[#E0D4C3]"
                    />
                    <span className="text-xs text-[#4A3B34] font-medium">{post.author.name}</span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#7A0C38] group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Inspiration CTA Callout */}
      <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FAF4EC] via-[#F4EBE0] to-[#EFE1D2] border border-[#E4D4C0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A0C38] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Create Your Own Story?</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-[#2B1724] font-serif-luxury">
            Turn your special moment into a personalized digital experience
          </h4>
          <p className="text-xs sm:text-sm text-[#6B574E]">
            Delivered directly on WhatsApp within 24–48 hours with customized music, countdown, and RSVP.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full md:w-auto">
          {onChooseTemplate && (
            <button
              onClick={onChooseTemplate}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#7A0C38] via-[#A81B5B] to-[#C7246D] hover:brightness-110 text-white text-xs sm:text-sm font-semibold active:scale-95 transition-all shadow-md cursor-pointer border border-rose-300/20"
            >
              Browse All Templates
            </button>
          )}
          <a
            href="https://wa.me/8801411390983?text=Hello%20Wishora!%20I%20read%20your%20blog%20and%20want%20to%20order%20a%20custom%20invite."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF4EC] text-[#2B1724] text-xs sm:text-sm font-semibold active:scale-95 transition-all border border-[#D5C2AF] shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {activePost && (
          <BlogModal
            post={activePost}
            onClose={() => setActivePost(null)}
            onSelectTemplate={onSelectTemplate}
            onOpenInquiry={onOpenInquiry}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
