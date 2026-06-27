'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react'
import { blogPosts } from '@/lib/data'

export function Blog() {
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1, 4)

  return (
    <section id="blog" className="relative py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-rosegold mb-4 font-sans-lux">
              <Sparkles className="h-3 w-3" />
              <span>The Journal</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
              Beauty wisdom, <span className="italic luxury-gradient-text">shared.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground font-light max-w-xs">
            Skincare, bridal, lash and brow care articles from our master artists — written for Nairobi skin, climate, and life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-2xl overflow-hidden border border-border hover-lift"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-rosegold text-white text-[10px] uppercase tracking-[0.2em] font-sans-lux">
                Featured · {featured.category}
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-sans-lux mb-3">
                <span>{featured.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{featured.readTime}</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-foreground leading-tight group-hover:text-rosegold transition-colors">
                {featured.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light line-clamp-3">{featured.excerpt}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-rosegold font-sans-lux">
                Read article
                <ArrowUpRight className="h-3 w-3 group-hover:rotate-45 transition-transform" />
              </div>
            </div>
          </motion.article>

          {/* Rest */}
          <div className="flex flex-col gap-5">
            {rest.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group grid grid-cols-3 gap-4 p-4 rounded-2xl border border-border hover:border-rosegold transition-colors"
              >
                <div className="col-span-1 aspect-square rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="col-span-2 flex flex-col justify-center">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-rosegold font-sans-lux mb-1">{post.category}</div>
                  <h3 className="font-serif-display text-base sm:text-lg text-foreground leading-tight group-hover:text-rosegold transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground font-sans-lux">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" />{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
