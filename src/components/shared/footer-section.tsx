'use client';

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const footerSections = {
  contactUs: {
    title: 'CONTACT US',
    content: {
      address: {
        line1: 'ThemesGround, 789 Main rd,',
        line2: 'Anytown, CA 12345 USA',
      },
      phones: ['+(888) 123-4567', '+(888) 456-7890'],
      email: 'flipmart@themesground.com',
    },
  },
  customerService: {
    title: 'CUSTOMER SERVICE',
    links: [
      { name: 'My Account', href: '/account' },
      { name: 'Order History', href: '/orders' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Specials', href: '/specials' },
      { name: 'Help Center', href: '/help' },
    ],
  },
  corporation: {
    title: 'CORPORATION',
    links: [
      { name: 'About us', href: '/about' },
      { name: 'Customer Service', href: '/customer-service' },
      { name: 'Company', href: '/company' },
      { name: 'Investor Relations', href: '/investors' },
      { name: 'Advanced Search', href: '/search' },
    ],
  },
  whyChooseUs: {
    title: 'WHY CHOOSE US',
    links: [
      { name: 'Shopping Guide', href: '/shopping-guide' },
      { name: 'Blog', href: '/blog' },
      { name: 'Company', href: '/company' },
      { name: 'Investor Relations', href: '/investors' },
      { name: 'Contact Us', href: '/contact' },
    ],
  },
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'Youtube', icon: Youtube, href: 'https://youtube.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
];

const paymentMethods = [
  { name: 'Visa', logo: '/placeholder.svg?height=30&width=50' },
  { name: 'Mastercard', logo: '/placeholder.svg?height=30&width=50' },
  { name: 'PayPal', logo: '/placeholder.svg?height=30&width=50' },
  { name: 'American Express', logo: '/placeholder.svg?height=30&width=50' },
];

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-blue-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-blue-100">
                Get the latest updates on new products and upcoming sales
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white border-0 text-gray-900 placeholder:text-gray-500 min-w-[300px]"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Us */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white uppercase tracking-wide">
              {footerSections.contactUs.title}
            </h4>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-sm leading-relaxed">
                  <p>{footerSections.contactUs.content.address.line1}</p>
                  <p>{footerSections.contactUs.content.address.line2}</p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div className="text-sm space-y-1">
                  {footerSections.contactUs.content.phones.map(
                    (phone, index) => (
                      <p key={index}>
                        <Link
                          href={`tel:${phone}`}
                          className="hover:text-blue-400 transition-colors"
                        >
                          {phone}
                        </Link>
                      </p>
                    )
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <Link
                  href={`mailto:${footerSections.contactUs.content.email}`}
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  {footerSections.contactUs.content.email}
                </Link>
              </div>

              {/* Contact Us Button */}
              <div className="pt-2">
                <Button
                  variant="outline"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors"
                >
                  Contact us
                </Button>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white uppercase tracking-wide">
              {footerSections.customerService.title}
            </h4>
            <ul className="space-y-3">
              {footerSections.customerService.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporation */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white uppercase tracking-wide">
              {footerSections.corporation.title}
            </h4>
            <ul className="space-y-3">
              {footerSections.corporation.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white uppercase tracking-wide">
              {footerSections.whyChooseUs.title}
            </h4>
            <ul className="space-y-3">
              {footerSections.whyChooseUs.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors duration-200 block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-white">Follow Us:</span>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-white">We Accept:</span>
            <div className="flex space-x-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="w-12 h-8 bg-white rounded flex items-center justify-center p-1"
                >
                  <span className="text-xs text-gray-600 font-medium">
                    {method.name.slice(0, 4)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center lg:text-right">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Flipmart. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-end space-x-4 mt-2">
              <Link
                href="/privacy"
                className="text-xs text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-gray-400 hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-xs text-gray-400 hover:text-blue-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
