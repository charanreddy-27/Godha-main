import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Sparkles,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-royal-900 via-royal-800 to-royal-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full border-2 border-gold-400 animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full border-2 border-lotus-400 animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-gold-400/10 to-royal-400/10 blur-3xl" />
      </div>

      {/* Premium Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 group">
              <div className="relative">
                <Sparkles className="h-6 w-6 text-gold-400 animate-pulse" />
                <div className="absolute inset-0 bg-gold-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              </div>
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-white via-gold-100 to-white bg-clip-text text-transparent">
                Godha Collections
              </span>
            </div>
            <p className="text-ivory-200 text-sm leading-relaxed mb-6 font-light">
              Celebrating the timeless beauty of Indian ethnic wear. Discover
              handcrafted sarees, elegant lehengas, and contemporary ethnic
              fashion for every occasion.
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="#"
                className="group/social w-11 h-11 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-gold-500 hover:to-gold-600 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-gold-lg hover:scale-110"
              >
                <Facebook className="h-4 w-4 text-ivory-200 group-hover/social:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="group/social w-11 h-11 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-lotus-500 hover:to-lotus-600 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-gold-lg hover:scale-110"
              >
                <Instagram className="h-4 w-4 text-ivory-200 group-hover/social:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="group/social w-11 h-11 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-teal-500 hover:to-teal-600 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-gold-lg hover:scale-110"
              >
                <Twitter className="h-4 w-4 text-ivory-200 group-hover/social:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
              Shop
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link
                  href="/ethnic-wear"
                  className="text-ivory-200 hover:text-gold-300 transition-all duration-300 flex items-center gap-2.5 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover/link:bg-gold-300 transition-all duration-300 group-hover/link:scale-150" />
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                    Ethnic Collection
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dresses"
                  className="text-ivory-200 hover:text-gold-300 transition-all duration-300 flex items-center gap-2.5 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover/link:bg-gold-300 transition-all duration-300 group-hover/link:scale-150" />
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                    Dresses
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sarees"
                  className="text-ivory-200 hover:text-gold-300 transition-all duration-300 flex items-center gap-2.5 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover/link:bg-gold-300 transition-all duration-300 group-hover/link:scale-150" />
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                    Sarees Collection
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sarees/kanchivaram"
                  className="text-ivory-200 hover:text-gold-300 transition-all duration-300 flex items-center gap-2.5 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover/link:bg-gold-300 transition-all duration-300 group-hover/link:scale-150" />
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                    Kanchivaram Sarees
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/ethnic-wear/kurtis"
                  className="text-ivory-200 hover:text-gold-300 transition-all duration-300 flex items-center gap-2.5 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover/link:bg-gold-300 transition-all duration-300 group-hover/link:scale-150" />
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                    Kurtis
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
              Support
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-ivory-200 hover:text-gold-300 transition-all duration-300 flex items-center gap-2.5 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-lotus-500/50 group-hover/link:bg-lotus-300 transition-all duration-300 group-hover/link:scale-150" />
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-ivory-200 hover:text-gold-300 transition-all duration-300 flex items-center gap-2.5 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-lotus-500/50 group-hover/link:bg-lotus-300 transition-all duration-300 group-hover/link:scale-150" />
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                    Shipping Info
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-ivory-200 hover:text-gold-300 transition-all duration-300 flex items-center gap-2.5 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-lotus-500/50 group-hover/link:bg-lotus-300 transition-all duration-300 group-hover/link:scale-150" />
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                    Returns & Exchange
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-ivory-200 hover:text-gold-300 transition-all duration-300 flex items-center gap-2.5 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-lotus-500/50 group-hover/link:bg-lotus-300 transition-all duration-300 group-hover/link:scale-150" />
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                    FAQs
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-ivory-200 hover:text-gold-300 transition-all duration-300 flex items-center gap-2.5 group/link"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-lotus-500/50 group-hover/link:bg-lotus-300 transition-all duration-300 group-hover/link:scale-150" />
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                    Admin Portal
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
              Get in Touch
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 backdrop-blur-sm border border-white/10 group-hover:border-gold-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gold-500/20">
                  <Phone className="h-4 w-4 text-gold-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-ivory-300/60 text-xs mb-1 font-medium">
                    Call Us
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-ivory-100 hover:text-gold-300 transition-colors font-medium"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 backdrop-blur-sm border border-white/10 group-hover:border-gold-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gold-500/20">
                  <Mail className="h-4 w-4 text-gold-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-ivory-300/60 text-xs mb-1 font-medium">
                    Email
                  </p>
                  <a
                    href="mailto:care@godhacollections.com"
                    className="text-ivory-100 hover:text-gold-300 transition-colors font-medium"
                  >
                    care@godhacollections.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 backdrop-blur-sm border border-white/10 group-hover:border-gold-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gold-500/20">
                  <MapPin className="h-4 w-4 text-gold-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-ivory-300/60 text-xs mb-1 font-medium">
                    Visit Us
                  </p>
                  <span className="text-ivory-100 font-medium">
                    Hyderabad, Telangana, India
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ivory-300/60 text-sm">
              © {new Date().getFullYear()} Godha Collections. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-ivory-300/60">
              <Link
                href="/privacy"
                className="hover:text-gold-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-gold-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
            <p className="text-ivory-300/40 text-xs flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-gold-500" />
              Crafted with elegance in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
