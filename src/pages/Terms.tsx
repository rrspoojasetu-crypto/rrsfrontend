import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-4xl font-serif">Terms of Service</CardTitle>
              <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using Pooja Setu, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">2. Service Description</h2>
              <p className="text-muted-foreground mb-4">
                Pooja Setu provides a platform connecting seekers with qualified priests for remote performance of Hindu rituals and ceremonies via video conferencing.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">3. User Responsibilities</h2>
              <p className="text-muted-foreground mb-2">As a user, you agree to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use the service in accordance with all applicable laws</li>
                <li>Treat all users with respect and dignity</li>
              </ul>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">4. Priest Qualifications</h2>
              <p className="text-muted-foreground mb-4">
                All priests are verified for their qualifications and experience. However, Pooja Setu does not guarantee specific outcomes from rituals performed.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">5. Payment Terms</h2>
              <p className="text-muted-foreground mb-4">
                Payment terms will be clearly communicated before booking. All payments are processed securely through our integrated payment gateway.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">6. Cancellation & Refunds</h2>
              <p className="text-muted-foreground mb-4">
                Cancellation and refund policies vary by service. Please review the specific terms before booking. Generally, cancellations made 24 hours before the scheduled ritual are eligible for full refunds.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">7. Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                Ritual outcomes are based on spiritual beliefs and faith. Pooja Setu does not make any guarantees regarding specific results from rituals performed through our platform.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                Pooja Setu shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-serif font-bold mt-6 mb-4">10. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these terms, please contact us at <a href="mailto:contact@poojasetu.com" className="text-primary hover:underline">contact@poojasetu.com</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
