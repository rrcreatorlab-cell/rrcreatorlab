import { Youtube, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold gradient-text mb-4">
              GrowthLab
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              Premium YouTube & Instagram growth services trusted by over 10,000 creators worldwide. 
              Transform your social presence with real, engaged followers.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">YouTube Subscribers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">YouTube Views</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Instagram Followers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Instagram Likes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Custom Packages</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 GrowthLab. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Secure payments powered by Stripe
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
