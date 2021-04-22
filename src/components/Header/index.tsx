import format from "date-fns/format";
import enUS from "date-fns/locale/en-US";

import styles from "./styles.module.scss";

export function Header() {
  const currentDate = format(new Date(), "EEE, MMMM d", { locale: enUS });

  return (
    <header className={styles.container}>
      <img src="/logo.svg" alt="Podcastr" />
      <p>The best for your ears, always</p>
      <span>{currentDate}</span>
    </header>
  );
}
