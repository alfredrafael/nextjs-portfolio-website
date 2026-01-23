// Craft Imports
import { Container } from "@/components/craft";
import { ContactForm } from "@/components/contactForm";
import ContactInfo from "@/components/contactInfo";
import PageHeader from "@/components/pageHeader";

export default function Contact() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        subtitle="I'm available for freelance projects and other opportunities. Reach out to discuss how we can collaborate!"
        imgSrc="http://www.alfredorafael.com/wp-content/uploads/2026/01/pexels-nimlo-4509131-scaled.jpg"
      />

      <Container>
        <div className="flex flex-col md:flex-row md:gap-8 lg:gap-10 py-4">
          <div className="order-2 md:order-1">
            <ContactForm />
          </div>
          <div className="order-1 md:order-2 mb-5 md:mb-0 md:w-1/2 lg:w-2/5">
            <ContactInfo />
          </div>
        </div>
      </Container>
    </>
  );
}
