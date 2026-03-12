"use client"
import BackBtn from '@/components/BackBtn'
import styles from './page.module.css'

const page = () => {
  return (
    <>
      <BackBtn />
      <div className={styles.mainContainer}>
        <article className={styles.content}>
          <h1 className={styles.h1}>Return Policy</h1>
          <section className={styles.section}>
            <h2>Refunds and exchanges</h2>
            <p>
              All purchases of the courses and products are subject to the
              following refund and exchange policies.
            </p>
            <h2>Distance learning course or digital product refund policy</h2>
            <p>
              There are no refunds for the online courses/programs. All sales
              are final. Individuals who purchase digital products or enroll in
              the courses sold by us and subsequently decide not to proceed with
              the course(s) do so with the awareness that they will not be
              eligible to return the digital materials for a refund, even if
              they have not accessed or viewed it. While a course may be
              purchased on behalf of another individual, online courses are not
              transferrable once they have been accessed.
            </p>
            <h2>Tangible product exchange policy</h2>
            <p>
              Your satisfaction is our number one priority. All tangible
              products sold by us are guaranteed to reach you in excellent
              condition. In the unlikely event that you receive a product that
              is damaged or defective, and you purchased your item(s) directly
              through physiolution.co website, you may request a replacement of
              the same item at no additional cost. All requests for replacements
              must be made within 5 days from the date of the original purchase
              date and you may be responsible for shipping the damaged item back
              prior to a replacement being sent. No exchanges can be made for
              any reason more than 5 calendar days after your original date of
              purchase. There are no refunds for tangible products. All sales
              are final.
            </p>
          </section>
          <div className={styles.lastUpdated}>
            <p>Last Updated: {new Date().getFullYear()}</p>
          </div>
        </article>
      </div>
    </>
  );
}

export default page
