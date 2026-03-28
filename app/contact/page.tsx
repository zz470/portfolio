import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Contact | Sound Designer Sao Paulo",
  description: copy.contactMeta.description,
  openGraph: {
    title: "Contact | Sound Designer Sao Paulo | Lorenzo Pardell",
    description: copy.contactMeta.description,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary",
    images: ["/og-image.png"],
  },
};
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getVisibleSocialLinks } from "@/lib/social-links";
import { contactInfo } from "@/lib/contact-info";

export default function ContactPage() {
  // Get visible social links
  const socialLinks = getVisibleSocialLinks();

  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 md:px-10 py-16">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{copy.contact.pageTitle}</h1>
        <div className="w-12 h-1 bg-orange-500 mb-8"></div>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl text-lg leading-relaxed">
          {copy.contact.intro}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{copy.contact.contactCardTitle}</h2>
          <div className="w-12 h-1 bg-orange-500 mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {copy.contact.contactCardText}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Email</h3>
              <a href={contactInfo.emailLink} className="text-gray-600 dark:text-gray-400 hover:text-orange-500">
                {contactInfo.email}
              </a>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Phone</h3>
              <a href={contactInfo.phoneLink} className="text-gray-600 dark:text-gray-400 hover:text-orange-500">
                {contactInfo.phone}
              </a>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">Location</h3>
              <p className="text-gray-600 dark:text-gray-400">São Paulo, Brazil</p>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Connect</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10 p-0 flex items-center justify-center hover:border-orange-500 group-hover:border-orange-500 transition-colors">
                      <span className="h-5 w-5 flex items-center justify-center group-hover:scale-110 group-hover:text-orange-500 transition-all">{link.icon}</span>
                      <span className="sr-only">{link.name}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{copy.contact.whatsappCardTitle}</h2>
          <div className="w-12 h-1 bg-orange-500 mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {copy.contact.whatsappCardText}
          </p>

          <a
            href={contactInfo.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 text-lg font-medium text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {copy.contact.whatsappButtonText}
          </a>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Pro tip:</strong> {copy.contact.proTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
