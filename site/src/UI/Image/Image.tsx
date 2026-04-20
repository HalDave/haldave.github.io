import styles from "./Image.module.css";

interface AppImageProps {
  isDarkTheme: boolean;
  src: string;
  alt: string;
  title: string;
}

const Image = ({ src, alt, title, isDarkTheme }: AppImageProps) => {
  return (
    <img
      alt={alt}
      src={src}
      title={title}
      className={`${styles.image}${!isDarkTheme ? ` ${styles.lightBackground}` : ""}`}
    />
  );
};

export default Image;
