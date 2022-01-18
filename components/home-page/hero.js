import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/background.jpg"
          alt="An image showing peaceful landscape with mountains and forest"
          width={1700}
          height={720}
        />
      </div>
      <h1>Hi friends,</h1>
      <p>
        This is a place for relaxation, reading some funny stories about
        everyday life occurrences. Here, in those blogs I'd like to share some
        tips and solutions for everyday life problems with a humorous flip. :)
      </p>
    </section>
  );
}
export default Hero;
