'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { FaFacebookF, FaTwitter, FaShareAlt, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import CustomLink from '@/components/manual-ui/CustomLink';

const ContactPage = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Add current date to the form data
    const formData = new FormData(form.current!);
    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // You'll need to add a hidden input for received_date in your form
    // or modify your EmailJS template to handle it

    emailjs
      .sendForm(
        'service_unitedtravels',
        'template_mz4e7hk', // Make sure this template matches your contact form template
        form.current!,
        'CvvGr0snxHNqeez6V'
      )
      .then(
        () => {
          toast.success('Message sent successfully!', {
            description: 'We\'ll get back to you as soon as possible.',
          });
          form.current?.reset();
        },
        (error) => {
          toast.error('Failed to send message', {
            description: 'Please try again later or contact us directly.',
          });
          console.error('EmailJS error:', error);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-orange-400 to-purple-400">
      {/* Header Section */}
      <div className="bg-primary/10 py-16 ">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mt-16">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto px-4">
          Get in touch with us for any inquiries about our travel services
        </p>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send us a Message
            </h2>
            
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="user_email"
                  id="user_email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="user_phone"
                  id="user_phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition"
                  placeholder="+44 7366 234 404"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              {/* Hidden field for received date - you can add this if your template needs it */}
              <input 
                type="hidden" 
                name="received_date" 
                value={new Date().toLocaleString('en-GB')} 
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right Column - Contact Details */}
          <div className="space-y-8">
            {/* Contact Information Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaPhone className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Phone / WhatsApp</h3>
                    <CustomLink
                      href="https://wa.me/447366234404"
                      title="+44 20 3725 3460 / +44 7366 234 404"
                      className="text-gray-600 hover:text-primary transition"
                      target="_blank"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaEnvelope className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Email</h3>
                    <CustomLink
                      href="mailto:info@unitedtravels.co.uk"
                      title="info@unitedtravels.co.uk"
                      className="text-gray-600 hover:text-primary transition"
                      target="_blank"
                    />
                  </div>
                </div>

                {/* Office Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Office</h3>
                    <CustomLink
                      href="/offices"
                      title="2 High Street, Bracknell, RG12 1AA"
                      className="text-gray-600 hover:text-primary transition"
                      target="_blank"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Connect With Us
              </h2>
              <p className="text-gray-600 mb-6">
                Follow us on social media for updates and travel inspiration
              </p>
              
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="bg-gray-100 p-3 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition group"
                >
                  <FaFacebookF className="text-gray-600 group-hover:text-blue-600 text-xl" />
                </a>

                <a
                  href="#"
                  aria-label="Twitter"
                  className="bg-gray-100 p-3 rounded-lg hover:bg-sky-100 hover:text-sky-400 transition group"
                >
                  <FaTwitter className="text-gray-600 group-hover:text-sky-400 text-xl" />
                </a>

                <button
                  aria-label="Share"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'United Travel & Tours',
                        text: 'Check out United Travel & Tours for amazing travel experiences!',
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success('Link copied to clipboard!');
                    }
                  }}
                  className="bg-gray-100 p-3 rounded-lg hover:bg-green-100 hover:text-green-600 transition group"
                >
                  <FaShareAlt className="text-gray-600 group-hover:text-green-600 text-xl" />
                </button>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Office Hours
              </h2>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;