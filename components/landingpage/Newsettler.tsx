'use client'

import React from "react"

import { Mail } from 'lucide-react'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section id="contact" className="py-20 bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Newsletter
          </h2>
          <p className="text-lg opacity-90">
            Subscribe to get exclusive travel tips, destination guides, and special offers
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition font-medium whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p className="text-center mt-4 text-accent font-medium">
              ✓ Thank you for subscribing!
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
