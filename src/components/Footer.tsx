import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full gradient-warm" />
              <span className="text-xl font-bold font-serif">Pooja Setu</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Bridging tradition and technology for authentic spiritual experiences
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Our Services
              </Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link to="/ritual/request" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Book a Ritual
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Get in Touch</h4>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Email:</span><br/>
                <a href="mailto:contact@poojasetu.com" className="hover:text-primary transition-colors">
                  contact@poojasetu.com
                </a>
              </p>
              <Link to="/contact" className="inline-block text-sm text-primary hover:underline">
                Contact Form →
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Pooja Setu. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground italic">
              Preserving tradition through technology 🙏
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
