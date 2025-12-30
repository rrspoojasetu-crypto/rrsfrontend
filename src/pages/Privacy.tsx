import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-4xl font-serif">Privacy Policy</CardTitle>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-2">We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Name, email address, phone number</li>
                <li>Date of birth, nationality, religious details</li>
                <li>Ritual preferences and requirements</li>
                <li>Payment information (processed securely through third-party providers)</li>
              </ul>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-2">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Provide and maintain our services</li>
                <li>Match seekers with appropriate priests</li>
                <li>Process payments and send transaction notifications</li>
                <li>Communicate with you about services and updates</li>
                <li>Improve our platform and user experience</li>
              </ul>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information. We share information only with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Priests assigned to your ritual requests (only necessary details)</li>
                <li>Service providers who assist in platform operations</li>
                <li>Law enforcement when required by law</li>
              </ul>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">5. Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We retain your personal information for as long as necessary to provide services and comply with legal obligations. You may request deletion of your account at any time.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-2">You have the right to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our service is not intended for users under 18 years of age. We do not knowingly collect information from children.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">9. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this privacy policy from time to time. We will notify you of significant changes via email or platform notification.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For privacy-related questions or to exercise your rights, contact us at <a href="mailto:contact@poojasetu.com" className="text-primary hover:underline">contact@poojasetu.com</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
