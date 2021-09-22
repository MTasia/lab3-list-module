import style from "./Header.module.css";

const Header = () => (
  <div className={style.wrapper}>
    <div className={style.blackBgWhiteText}>
      <p className={style.leftText}>Books</p>
      <div className={style.leftLine} />
    </div>
    <div className={style.whiteBgBlackText}>
      <p className={style.rightText}>Catalog</p>
      <p className={style.littleBlackText}>interesting books</p>
      <div className={style.rightLine} />
      <div className={style.ellipse} />
    </div>
  </div>
);

export default Header;
