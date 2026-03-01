"use client"
import Footer from '@/components/Footer';
import styles from './page.module.css'
import BackBtn from '@/components/BackBtn';

const page = () => {
  return (
    <>
      <BackBtn />
      <div className={styles.mainCtn}>
        <h1>About Us</h1>

        <div className={styles.contentWrapper}>
          <h2>About Dr. Vandy's Lab & Physiolution</h2>
          <p>
            <span className={styles.specialStyling}>
              Dr. Vandy’s Lab is a health, wellness and education-focused
              organization. Dr. Vandy’s Lab, under the brand name Dr. Vandy’s,
              is actively engaged in the promotion of health and wellness
              products, with a focus on physiotherapy-led, evidence-based
              solutions that support pain management, recovery, mobility, and
              overall musculoskeletal well-being. <br />
              <br />
              Physiolution is the online education brand of Dr. Vandy’s Lab,
              created to deliver high-quality, globally aligned learning
              programs for physiotherapists, coaches, athletes, trainers and
              healthcare professionals etc. <br />
              <br />
              Dr. Vandy’s Lab is the authorized distributor and reseller in
              India for the courses of The Biomechanics Method, Belton, U.S. of
              Texas. Through its education brand Physiolution, the organization
              promotes, markets, and sells the online course of The BioMechanics
              Method Corrective Exercise Specialist (TBMM-CES) online
              certificate course in India, making internationally recognized
              biomechanics education accessible to Indian professionals. <br />
              <br />
              The organization is promoted by Dr. Vandana Tanwar, an
              International Sports Physiotherapist, with extensive experience in
              sports rehabilitation, clinical practice, and professional
              education. <br />
              <br />{" "}
            </span>
            <span className={styles.specialStyling}>Dr. Vandana Tanwar</span>,
            an outstanding Sports Physiotherapist and a name synonymous with
            excellence, dedication, and impact in sports rehabilitation. With
            over{" "}
            <span className={styles.specialStyling}>
              15 years of distinguished experience
            </span>
            , Dr. Vandana has worked relentlessly to support athletes at the
            highest level, including her remarkable contributions to the{" "}
            <span className={styles.specialStyling}>
              Indian Shooting Team during the 2012 London and 2016 Rio Olympic
              preparations
            </span>
            , as well as the{" "}
            <span className={styles.specialStyling}>
              Commonwealth Games and numerous national and international camps
              and world championships.
            </span>{" "}
            <br />
            <br />
            As the{" "}
            <span className={styles.specialStyling}>
              Founder of Physiolution
            </span>
            , she has built a centre of excellence that blends science,
            compassion, and innovation in physiotherapy and rehabilitation.
            Beyond elite sports, her work spans orthopaedics, neurology,
            pediatrics, cancer rehabilitation, and community healthcare, making
            quality physiotherapy accessible to all sections of society. <br />
            <br />A testament to her international recognition,{" "}
            <span className={styles.specialStyling}>
              Dr. Vandana was specially invited by the Bhutan Shooting
              Federation, with approval from the Bhutan Olympic Committee
            </span>
            , to conduct physiotherapy and psychological training programs for
            shooters—reflecting the global respect for her expertise. <br />
            <br />
            Her leadership roles in global events like the{" "}
            <span className={styles.specialStyling}>
              World Para Athletics Championship 2025
            </span>
            , her advisory positions in professional leagues, and her continuous
            efforts in education, workshops, and athlete welfare reflect her
            unwavering commitment to nation-building through healthcare and
            sports. <br />
            <br />
            Most recently, Dr. Vandana has been entrusted with a prestigious
            responsibility in the{" "}
            <span className={styles.specialStyling}>Hockey India League</span>,
            serving as the{" "}
            <span className={styles.specialStyling}>
              Physiotherapist for the women’s hockey team “Bengal Tigers”
            </span>
            , further reinforcing her standing among top professionals in elite
            sports.
          </p>
          <h2>About The BioMechanics Method</h2>
          <p>
            The BioMechanics Method® (TBMM) educational courses are the fitness,
            exercise and health industry’s preferred choice for corrective
            exercise education. The TBMM-CES course combines musculoskeletal
            assessments, functional anatomy information, corrective exercise
            techniques and life coaching strategies to create a simple system
            that makes it easy for professionals to help clients exercise
            effectively and move without pain and limitations. The BioMechanics
            Method Corrective Exercise Specialist (TBMM- CES) course is the
            highest-rated corrective exercise specialist certification based on
            independent reviews by verified professionals. It is the most
            comprehensive training program in the field of corrective exercise
            and related specialty areas such as orthopedic exercise, injury
            prevention, pain reduction and functional training. Personal
            trainers, fitness professionals, coaches, athletic trainers, Pilates
            instructors, yoga teachers, physical therapists, massage therapists,
            doctors, physiotherapists, chiropractors, professional sports teams,
            coaches and college and university professors in over 80 countries
            use The BioMechanics Method. By purchasing this course, you are
            agreeing to The BioMechanics Method Educational Programs{" "}
            <a href="https://www.thebiomechanicsmethod.com/terms-and-conditions/">
              Terms &amp; Conditions.
            </a>
          </p>
          <h2>Additional Information</h2>
          <p>
            The BioMechanics Method Corrective Exercise Specialist course
            contains online lessons, digital text material, step-by-step video
            instruction and demonstrations, client assessment forms, self-check
            activities, and online tests. When accessing the course, you’ll find
            a list of printable downloads with each lesson under the “course
            downloads” tab. Digital material not itemized in the downloads tab
            is not printable. Upon successful completion of the course, you will
            obtain a certificate signifying your competency as a Corrective
            Exercise Specialist in The BioMechanics Method ® (TBMM- CES). This
            credential does not expire. Purchase price of the Corrective
            Exercise Specialist course includes all online materials, unlimited
            test retakes if needed, and access to the course itself. Online
            courseware is non-refundable. By purchasing The BioMechanics Method
            courseware through PHYSIOLUTION (Brand under Dr. Vandy’s Lab), users
            agree to receiving email communications from The BioMechanics Method
            regarding their courseware purchase.
          </p>
        </div>
      </div>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Your Brand",
            url: "https://physiolution.co/about",
            description: "Learn about Your Brand Name and what we do.",
          }),
        }}
      />
    </>
  );
}

export default page
