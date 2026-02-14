'use client'
import { useState } from 'react';
import { ChevronDown, FileText, Shield, RefreshCw, AlertTriangle, Clock, CreditCard } from 'lucide-react';

type SectionType = 'terms' | 'privacy' | 'refund' | null;

export default function TicketRefund() {
  const [expandedSection, setExpandedSection] = useState<SectionType>('refund');

  const toggle = (section: SectionType) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 mt-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Legal Information</h1>
          <p className="text-xl text-orange-100">Transparent policies to help you travel with confidence</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-6">

        {/* Terms of Service */}
        <div className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all duration-300 ${expandedSection === 'terms' ? 'border-orange-500 shadow-md' : 'border-transparent hover:border-orange-200'}`}>
          <button
            onClick={() => toggle('terms')}
            className="w-full px-8 py-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${expandedSection === 'terms' ? 'bg-orange-500' : 'bg-orange-100'}`}>
                <FileText className={`w-5 h-5 ${expandedSection === 'terms' ? 'text-white' : 'text-orange-500'}`} />
              </div>
              <h2 className={`text-xl font-bold transition-colors duration-300 ${expandedSection === 'terms' ? 'text-orange-500' : 'text-gray-900'}`}>
                Terms of Service
              </h2>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${expandedSection === 'terms' ? 'bg-orange-500 rotate-180' : 'bg-gray-100'}`}>
              <ChevronDown className={`w-5 h-5 ${expandedSection === 'terms' ? 'text-white' : 'text-gray-600'}`} />
            </div>
          </button>

          {expandedSection === 'terms' && (
            <div className="px-8 pb-8 border-t border-gray-100">
              <div className="mt-6 space-y-6 text-gray-700">
                <p>By using our services, you agree to comply with and be bound by the following terms and conditions of United Travel and Tours Limited.</p>

                <div className="bg-orange-50 rounded-xl p-5 border-l-4 border-orange-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Booking and Payment</h3>
                  <p>All bookings are subject to availability and confirmation. Full payment is required at the time of booking unless a payment plan has been agreed in advance with our team.</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-5 border-l-4 border-orange-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Customer Responsibilities</h3>
                  <p>Customers are responsible for ensuring all travel documents — including passports, visas, and health certificates — are valid, up to date, and meet the requirements of their destination country.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Privacy Policy */}
        <div className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all duration-300 ${expandedSection === 'privacy' ? 'border-orange-500 shadow-md' : 'border-transparent hover:border-orange-200'}`}>
          <button
            onClick={() => toggle('privacy')}
            className="w-full px-8 py-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${expandedSection === 'privacy' ? 'bg-orange-500' : 'bg-orange-100'}`}>
                <Shield className={`w-5 h-5 ${expandedSection === 'privacy' ? 'text-white' : 'text-orange-500'}`} />
              </div>
              <h2 className={`text-xl font-bold transition-colors duration-300 ${expandedSection === 'privacy' ? 'text-orange-500' : 'text-gray-900'}`}>
                Privacy Policy
              </h2>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${expandedSection === 'privacy' ? 'bg-orange-500 rotate-180' : 'bg-gray-100'}`}>
              <ChevronDown className={`w-5 h-5 ${expandedSection === 'privacy' ? 'text-white' : 'text-gray-600'}`} />
            </div>
          </button>

          {expandedSection === 'privacy' && (
            <div className="px-8 pb-8 border-t border-gray-100">
              <div className="mt-6 space-y-6 text-gray-700">
                <p>United Travel and Tours Limited is committed to protecting your privacy and personal information in accordance with applicable UK data protection laws.</p>

                <div className="bg-orange-50 rounded-xl p-5 border-l-4 border-orange-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Information We Collect</h3>
                  <p>We collect personal information necessary for booking and travel arrangements, including your name, contact details, passport information, and payment details.</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-5 border-l-4 border-orange-500">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How We Use Your Information</h3>
                  <p>Your information is used solely for processing bookings, providing customer service, and sending important travel updates. We do not sell or share your data with third parties outside of travel arrangements.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Refund Policy */}
        <div className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all duration-300 ${expandedSection === 'refund' ? 'border-orange-500 shadow-md' : 'border-transparent hover:border-orange-200'}`}>
          <button
            onClick={() => toggle('refund')}
            className="w-full px-8 py-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${expandedSection === 'refund' ? 'bg-orange-500' : 'bg-orange-100'}`}>
                <RefreshCw className={`w-5 h-5 ${expandedSection === 'refund' ? 'text-white' : 'text-orange-500'}`} />
              </div>
              <h2 className={`text-xl font-bold transition-colors duration-300 ${expandedSection === 'refund' ? 'text-orange-500' : 'text-gray-900'}`}>
                Ticket Refund, Cancellation & Date Change Policy
              </h2>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${expandedSection === 'refund' ? 'bg-orange-500 rotate-180' : 'bg-gray-100'}`}>
              <ChevronDown className={`w-5 h-5 ${expandedSection === 'refund' ? 'text-white' : 'text-gray-600'}`} />
            </div>
          </button>

          {expandedSection === 'refund' && (
            <div className="px-8 pb-8 border-t border-gray-100">
              <p className="text-sm text-gray-500 mt-6 mb-8">For United Travel and Tours Limited</p>

              {/* Section 1 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">1. Cancellation and Refund</h3>
                </div>

                <ul className="space-y-3 mb-6">
                  {[
                    "Ticket cancellation and refunds depend on the airline's fare rules and approval.",
                    "Some tickets are non-refundable. If refundable, the airline may apply cancellation or refund charges.",
                    "If the ticket is partly used, the refund (if allowed) will be lower and based on airline rules.",
                    "Refunds are returned only to the original payment method — the same card or bank account used to pay."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Refund Processing */}
                <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-500">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <h4 className="font-bold text-gray-900">Refund Processing Time</h4>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Refunds usually take 6 to 8 weeks after the airline approves and processes the refund.",
                      "Timing can vary depending on the airline and your bank or card processing."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-100 my-8" />

              {/* Section 2 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">2. Date Change (Reissue / Reschedule)</h3>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span className="text-gray-700">Date changes are subject to seat availability and airline rules.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <div className="text-gray-700">
                      <span>Date change usually includes:</span>
                      <ul className="mt-2 space-y-2 ml-4">
                        {[
                          "Airline date change fee (if applicable), and",
                          "Fare difference (if the new date is more expensive)."
                        ].map((sub, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-orange-300 mt-2 flex-shrink-0" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span className="text-gray-700">If the new fare is cheaper, airlines often do not refund the difference (depends on fare rules).</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-100 my-8" />

              {/* Section 3 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">3. Important Notes</h3>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500 space-y-3">
                  {[
                    '"No-show" (missing the flight) may result in no refund and higher change fees — airline rules apply.',
                    "Service fees may apply for changes or cancellations, depending on the booking type and airline policy."
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <p className="text-gray-600 text-sm">
                  For any questions regarding our refund and cancellation policy, please{' '}
                  <a href="/contact" className="text-orange-500 font-semibold hover:underline">contact our team</a>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-400 pt-4">Last updated: February 2026</p>
      </div>
    </div>
  );
}