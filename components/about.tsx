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
            Front-End Software Engineer with a strong foundation in modern
            JavaScript frameworks and a growing focus on application
            architecture and scalable systems. I design and implement robust UI
            layers using React, Next.js, and TypeScript within headless and
            API-driven ecosystems, emphasizing accessibility, performance, and
            long-term maintainability. My experience spans enterprise
            organizations such as Trane Technologies, MIT, and Merrill Lynch,
            where I collaborate cross-functionally to translate complex
            requirements into reliable digital products. Looking forward to new
            challenges, I am eager to contribute to innovative projects that
            prioritize user-centric design and cutting-edge web technologies.
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
