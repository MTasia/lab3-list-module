import style from "./Footer.module.css";

const Footer = () => (
    <div className={style.flex}>
        <div className={style.blackBgWhiteText}>
            <p className={style.footerTextLeft}>Created by</p>
            <div className={style.leftLine}/>
        </div>
        <div className={style.whiteBgBlackText}>
            <p className={style.footerTextRight}>Medvedeva Taya</p>
            <div className={style.rightLine}/>
            <div className={style.ellipse}/>
            <p className={style.footerTextEmail}>taya_medeved@mail.ru</p>

        </div>
    </div>
);

export default Footer;
