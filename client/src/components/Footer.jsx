import { CiStethoscope } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="pt-20 pb-5">
      <footer className="bg-background text-gray-600 border-t border-gray-200 pt-7">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Left Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CiStethoscope className="h-8 w-8 text-[var(--parimary)] font-bold" />
                <span className="text-2xl font-bold text-[var(--parimary)]">
                  MeetMyDoc
                </span>
              </div>
              <p className="w-full md:w-2/3 text-gray-600 leading-6">
                Providing quality healthcare services with compassion and
                excellence.
              </p>
            </div>
            {/* Center Section */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    General Medicine
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Cardiology
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pediatrics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Surgery
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="/about"
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/doctors"
                    className="hover:text-primary transition-colors"
                  >
                    Our Doctors
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-primary transition-colors"
                  >
                    Emergency
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Contact Info
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>📞 +918987675645</li>
                <li>✉️ info@meetmydoc.com</li>
                <li>📍 Faridabad Haryana</li>
                <li>🕒 24/7 Emergency Services</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-7 pt-7 text-center text-muted-foreground">
            <p>
              &copy; 2025 MeetMyDoc. All rights reserved. | Privacy Policy |
              Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
