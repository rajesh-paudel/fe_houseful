"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";

const ContactSection = ({ header }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form:", formData);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="mb-4 flex justify-center">
            <div className="h-44 w-44 overflow-hidden rounded-full border border-gray-200 ring-2 ring-white shadow-sm">
              <img
                src="/profile.png"
                alt="Jason Byun"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 mb-3 font-bold">
            {header}
          </h2>
          <div className="w-12 h-0.5 bg-yellow-500 mx-auto mb-4" />
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
          <a
            href="tel:+16475551234"
            className="flex items-center gap-2 text-gray-700 hover:text-yellow-500 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="text-xs">(647) 555-1234</span>
          </a>
          <a
            href="mailto:jason@jasonbyun.com"
            className="flex items-center gap-2 text-gray-700 hover:text-yellow-500 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-xs">jason@jasonbyun.com</span>
          </a>
          <span className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4" />
            <span className="text-xs">Toronto, Ontario</span>
          </span>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-300">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1.5">
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-10 text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-900 mb-1.5">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-10 text-sm bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Phone
                </label>
                <Input
                  type="tel"
                  placeholder="(647) 555-1234"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="h-10 text-sm bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Message
                </label>
                <Textarea
                  placeholder="Tell me about your needs..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="min-h-24 text-sm bg-gray-50 resize-none"
                />
              </div>
              <div className="flex justify-center items-center">
                <Button
                  size="lg"
                  type="submit"
                  className="w-auto px-6 rounded-full bg-blue-700 text-white hover:bg-blue-800 inline-flex items-center justify-center gap-2 font-semibold"
                >
                  Send Message
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
