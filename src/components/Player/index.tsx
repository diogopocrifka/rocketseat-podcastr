import styles from "./styles.module.scss";

export function Player() {
  return (
    <div className={styles.container}>
      <header>
        <img src="/playing.svg" alt="Now playing" />
        <strong>Now Playing</strong>
      </header>

      <div className={styles.emptyPlayer}>
        <strong>Choose one of our podcasts</strong>
      </div>

      <footer className={styles.emptyFooter}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="Shuffle" />
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="Play previous" />
          </button>
          <button type="button" className={styles.playButton}>
            <img src="/play.svg" alt="Play" />
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="Play next" />
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repeats" />
          </button>
        </div>
      </footer>
    </div>
  );
}
