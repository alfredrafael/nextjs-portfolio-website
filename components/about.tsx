import { Section, Container, Prose } from "@/components/craft";
import Image from "next/image";

export default function About() {
  return (
    <Container className="mt-0 mb-4">
      <Prose className="pb-8">
        <h2>About Me</h2>
      </Prose>

      <Prose>
        <section className="about-section">
          <Image
            src="https://www.alfredorafael.com/wp-content/uploads/2023/12/Alfredo-picture.png"
            alt="Alfredo Rafael - Web Developer"
            width={200}
            height={200}
            className="circle-image w-38! h-38! sm:w-40! sm:h-40! md:w-48! md:h-48! lg:w-52! lg:h-52!"
          />
          <p>
            Hi! I'm a US Army veteran, educator and a front end developer. I
            create React.js and WordPress applications for your business or
            organization. My experience coding responsive and engaging user
            interfaces (from wireframe to deployment) and teamwork attitude are
            my greatest assets. I look forward to combining my software
            engineering skills with my teaching ability and experience. Welcome
            to my website! Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book.
          </p>
        </section>
      </Prose>

      {/* <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3"></div>

        <div className="flex gap-2 items-center">
          <Button size="lg" className="w-full sm:w-auto">
            Contact Us
          </Button>
        </div>
      </div> */}
    </Container>
  );
}
